import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { createMuiTheme, ThemeOptions, ThemeProvider } from '@material-ui/core';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ApolloCache } from '@apollo/client';
import { SnackbarProvider } from 'notistack';
import { AuthContext, AuthProviderData } from 'contexts/authContext';
import { ConfirmProvider } from 'contexts/confirmContext';

interface WrapperOptions {
  theme?: ThemeOptions;
  auth?: AuthProviderData;
  route?: string;
  apollo?: {
    mocks?: MockedResponse[];
    cache?: ApolloCache<Record<string, unknown>>;
  };
}

const ProvidersWrapper =
  ({ theme = {}, auth = {}, route = '/', apollo: { mocks = [], cache } = {} }: WrapperOptions): React.FC =>
  ({ children }) =>
    (
      <MemoryRouter initialEntries={[route]}>
        <MockedProvider mocks={mocks} cache={cache}>
          <SnackbarProvider maxSnack={3}>
            <ThemeProvider theme={createMuiTheme({ sizes: {}, ...theme })}>
              <ConfirmProvider>
                <AuthContext.Provider value={auth}>
                  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </AuthContext.Provider>
              </ConfirmProvider>
            </ThemeProvider>
          </SnackbarProvider>
        </MockedProvider>
      </MemoryRouter>
    );

const customRender = (ui: React.ReactElement, providerOptions: WrapperOptions = {}) =>
  render(ui, { wrapper: ProvidersWrapper(providerOptions) });

export * from '@testing-library/react';

export { customRender as render, userEvent };
