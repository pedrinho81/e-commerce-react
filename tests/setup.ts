import "@testing-library/jest-dom/vitest";
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { worker } from '../src/msw/worker';
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Start worker before all tests
beforeAll(() => { worker.listen({onUnhandledRequest: 'error'}) })

//  Close worker after all tests
afterAll(() => {worker.close()})

// Reset handlers after each test `important for test isolation`
afterEach(() => {worker.resetHandlers()})

// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock);