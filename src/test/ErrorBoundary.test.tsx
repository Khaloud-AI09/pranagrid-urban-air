import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from '../components/ErrorBoundary';

const ProblemChild: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test boundary crash');
  }
  return <div>Safe child content</div>;
};

describe('ErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe child content')).toBeInTheDocument();
  });

  it('catches runtime errors and renders graceful recovery UI', () => {
    // Suppress React error boundary console output in test log
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('PranaGrid Recovery Mode')).toBeInTheDocument();
    expect(screen.getByText('Test boundary crash')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reload Workspace/i })).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('resets error state when clicking Reload Workspace', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('PranaGrid Recovery Mode')).toBeInTheDocument();

    // Now re-render with safe child before clicking reload
    rerender(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    const reloadBtn = screen.getByRole('button', { name: /Reload Workspace/i });
    fireEvent.click(reloadBtn);

    expect(screen.getByText('Safe child content')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
