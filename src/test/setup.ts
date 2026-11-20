import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock canvas-confetti for JSDOM
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});
