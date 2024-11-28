import "@testing-library/jest-dom/vitest";
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from './mocks/server';
import { PropsWithChildren, ReactNode } from "react";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeAll(() => { server.listen({onUnhandledRequest: 'error'}) })

afterAll(() => {server.close()})

afterEach(() => {server.resetHandlers()})

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

vi.mock('@auth0/auth0-react', () => {
  return {
    useAuth0: vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: undefined
    }),
    Auth0Provider: ({ children }: PropsWithChildren) => children,
    withAuthenticationRequired: (component: ReactNode) => component
  }
});
