import React, { useState, useEffect, useCallback } from 'react';
import { getStoredApiKey, saveStoredApiKey, getStoredModel, saveStoredModel } from '../services/geminiService';
import { SettingsHeader } from './Settings/SettingsHeader';
import { ZeroErrorGuaranteePill } from './Settings/ZeroErrorGuaranteePill';
import { SettingsApiKeyForm } from './Settings/SettingsApiKeyForm';
import { SettingsFormActions } from './Settings/SettingsFormActions';

interface EngineSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsUpdated: () => void;
}

type TestStatus = 'idle' | 'testing' | 'success' | 'error';

async function pingGeminiEndpoint(apiKey: string, model: string): Promise<{ success: boolean; message: string }> {
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Respond with JSON: {"status":"ACTIVE"}' }] }],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    });
    if (res.ok) {
      return { success: true, message: `Connected successfully to ${model}! Dual-mode is now running Live.` };
    }
    const err = await res.json().catch(() => ({}));
    return { success: false, message: `API connection error (${res.status}): ${err?.error?.message || 'Check key validity'}` };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Network ping error: ${msg || 'Unable to reach Google API endpoints'}` };
  }
}

/**
 * Modal to configure live Google Gemini API key or switch to Local Reasoning Engine
 */
export const EngineSettingsModal: React.FC<EngineSettingsModalProps> = ({ isOpen, onClose, onSettingsUpdated }) => {
  const [apiKey, setApiKey] = useState(() => getStoredApiKey());
  const [model, setModel] = useState(() => getStoredModel());
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSave = useCallback(() => {
    saveStoredApiKey(apiKey);
    saveStoredModel(model);
    onSettingsUpdated();
    onClose();
  }, [apiKey, model, onSettingsUpdated, onClose]);

  const handleClearKey = useCallback(() => {
    saveStoredApiKey('');
    setApiKey('');
    setTestStatus('idle');
    setTestMessage('Reverted to Local Contextual Reasoning Engine.');
    onSettingsUpdated();
  }, [onSettingsUpdated]);

  const handleTest = useCallback(async () => {
    if (!apiKey.trim()) {
      setTestStatus('error');
      setTestMessage('Please enter a valid Gemini API key first, or leave blank to use the Local Engine.');
      return;
    }
    setTestStatus('testing');
    setTestMessage('Pinging Google Gemini API...');
    const result = await pingGeminiEndpoint(apiKey, model);
    setTestStatus(result.success ? 'success' : 'error');
    setTestMessage(result.message);
  }, [apiKey, model]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="engine-settings-title">
      <div className="relative w-full max-w-lg bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <SettingsHeader onClose={onClose} />
        <ZeroErrorGuaranteePill apiKey={apiKey} />
        <SettingsApiKeyForm apiKey={apiKey} setApiKey={setApiKey} model={model} setModel={setModel} testStatus={testStatus} testMessage={testMessage} />
        <SettingsFormActions apiKey={apiKey} isTesting={testStatus === 'testing'} onTest={handleTest} onClear={handleClearKey} onClose={onClose} onSave={handleSave} />
      </div>
    </div>
  );
};
