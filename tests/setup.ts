import "@testing-library/jest-dom/vitest";
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { worker } from '../src/msw/worker';
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeAll(() => { worker.listen({onUnhandledRequest: 'error'}) })

afterAll(() => {worker.close()})

afterEach(() => {worker.resetHandlers()})

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

vi.mock('@auth0/auth0-react');
