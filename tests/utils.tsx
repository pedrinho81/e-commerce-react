import { User, useAuth0 } from "@auth0/auth0-react";
import { render } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import routes from "../src/routes";
type AuthState = { 
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | undefined;
}
export const mockAuthState = (authState: AuthState) => {
  vi.mocked(useAuth0).mockReturnValue({
    ...authState,
    getAccessTokenSilently: vi.fn().mockResolvedValue('a'),
    getAccessTokenWithPopup: vi.fn(),
    getIdTokenClaims: vi.fn(),
    loginWithRedirect: vi.fn(),
    loginWithPopup: vi.fn(),
    logout: vi.fn(),
    handleRedirectCallback: vi.fn()
  })}


export const navigateTo = (path: string) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [path]
  })
  render(<RouterProvider router={router} />);
}