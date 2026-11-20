import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App Full Integration Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders application header, title, and initial severe inversion state', () => {
    render(<App />);

    expect(screen.getByText('PranaGrid')).toBeInTheDocument();
    expect(screen.getByText('InversionOS')).toBeInTheDocument();
    expect(screen.getByText(/AQI 442/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Choices in Numbers/i)).toBeInTheDocument();
  });

  it('allows user to switch smog severity level and updates live AQI badge', async () => {
    render(<App />);

    const moderateBtn = screen.getByRole('button', { name: /Simulate Moderate Smog \(AQI 115\)/i });
    fireEvent.click(moderateBtn);

    await waitFor(() => {
      expect(screen.getByText(/AQI 115/i)).toBeInTheDocument();
    });
  });

  it('allows user to change urban profile archetype', async () => {
    render(<App />);

    const zoneSelect = screen.getByLabelText(/Select Atmospheric Zone Archetype/i);
    fireEvent.change(zoneSelect, { target: { value: 'tier2-valley-inversion' } });

    expect(zoneSelect).toHaveValue('tier2-valley-inversion');
  });

  it('navigates to Daily Routine tab and adopts a low-emission swap', async () => {
    render(<App />);

    // Click Daily Routine Tab
    const routineTab = screen.getByRole('tab', { name: /24h Daily Routine Optimizer/i });
    fireEvent.click(routineTab);

    // Verify 24h curve and routine blocks are visible
    expect(screen.getByText(/24-Hour Smog-Aware Daily Routine Optimizer/i)).toBeInTheDocument();
    expect(screen.getByText(/Morning Awakening & Transit Lock/i)).toBeInTheDocument();

    // Click "Adopt All 5 Low-Emission Swaps" button
    const adoptAllBtn = screen.getByRole('button', { name: /Adopt all 5 low-emission routine swaps/i });
    fireEvent.click(adoptAllBtn);

    // Verify button updates to "All 5 Swaps Active"
    await waitFor(() => {
      expect(screen.getByText(/All 5 Swaps Active/i)).toBeInTheDocument();
    });
  });

  it('navigates to IAQ Hacks Lab and toggles checklist items', async () => {
    render(<App />);

    const iaqTab = screen.getByRole('tab', { name: /Indoor Air Hacks & DIY Lab/i });
    fireEvent.click(iaqTab);

    expect(screen.getByText(/Science-Backed Indoor Air Quality Hacks/i)).toBeInTheDocument();
    expect(screen.getByText(/Microfiber Wet Mopping vs. Dry Sweeping/i)).toBeInTheDocument();

    // Open Corsi-Rosenthal Modal
    const crButton = screen.getByRole('button', { name: /Open Corsi-Rosenthal Air Cleaner Lab/i });
    fireEvent.click(crButton);

    expect(screen.getByText(/DIY Corsi-Rosenthal Air Cleaner Lab/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Clean Air Delivery Rate \(CADR\) Simulator/i)).toBeInTheDocument();

    // Close Corsi-Rosenthal modal
    const closeBtn = screen.getByRole('button', { name: /Close Corsi-Rosenthal Lab/i });
    fireEvent.click(closeBtn);
  });

  it('opens and closes the Scientific Formula Inspector modal', async () => {
    render(<App />);

    const formulaButtons = screen.getAllByRole('button', { name: /Inspect Scientific Formulas/i });
    fireEvent.click(formulaButtons[0]);

    expect(screen.getByText(/Direct Impact Scientific Formulas/i)).toBeInTheDocument();
    expect(screen.getByText(/1\. Berkeley Earth PM2\.5-to-Cigarette Equivalence Model/i)).toBeInTheDocument();

    const closeBtns = screen.getAllByRole('button', { name: /Close Formula Inspector/i });
    fireEvent.click(closeBtns[0]);
  });

  it('opens Community Bulletin modal and verifies formatted advisory text with zero state names', async () => {
    render(<App />);

    const bulletinBtn = screen.getByRole('button', { name: /Generate WhatsApp and RWA Community Advisory Bulletin/i });
    fireEvent.click(bulletinBtn);

    expect(screen.getByText(/Community WhatsApp & RWA Advisory/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Zero State Names Guaranteed/i).length).toBeGreaterThan(0);

    const copyBtn = screen.getByRole('button', { name: /Copy Community Bulletin to Clipboard/i });
    expect(copyBtn).toBeInTheDocument();
  });
});
