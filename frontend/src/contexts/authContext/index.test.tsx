import { mocked } from 'ts-jest/utils';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import authService from 'services/newAuth';
import useAuth from 'hooks/useAuth';
import { AuthProvider } from '.';

jest.mock('../../services/newAuth', () => ({
  login: jest.fn(),
  renewSession: jest.fn(() => Promise.resolve()),
  logout: jest.fn(),
  isAdmin: {
    get: () => false,
  },
  isAuthenticated: {
    get: () => false,
  },
}));

const mockedAuthService = mocked(authService);

const Home = () => <div>Home</div>;
const Auth = () => {
  const { login, logout, isAdmin, isAuthenticated, loginError } = useAuth();

  return (
    <div>
      {isAuthenticated && 'user is authenticated'}
      {isAdmin && 'user is admin'}
      {loginError}
      <button type="button" onClick={() => login?.({ email: 'user@test.se', password: 'password' })}>
        login
      </button>
      <button type="button" onClick={() => logout?.()}>
        logout
      </button>
    </div>
  );
};

const setup = (route: string) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </AuthProvider>
    </MemoryRouter>
  );

describe('authContext', () => {
  it('should try and renew session on mount', async () => {
    Object.defineProperty(authService, 'isAuthenticated', {
      get: () => true,
    });
    Object.defineProperty(authService, 'isAdmin', {
      get: () => true,
    });

    const { findByText } = setup('/auth');

    expect(authService.renewSession).toHaveBeenCalled();
    expect(await findByText(/user is authenticated/i)).toBeInTheDocument();
    expect(await findByText(/user is admin/i)).toBeInTheDocument();
  });

  it('should call login and redirect to home if successful', async () => {
    mockedAuthService.login.mockResolvedValue();

    const { findByText } = setup('/auth');
    const loginBtn = await findByText(/login/i);

    userEvent.click(loginBtn);

    expect(authService.login).toHaveBeenCalledWith({ email: 'user@test.se', password: 'password' });
    expect(await findByText(/home/i)).toBeInTheDocument();
  });

  it('should set login error if login fails', async () => {
    mockedAuthService.login.mockRejectedValue({ message: 'login error' });

    const { findByText } = setup('/auth');
    const loginBtn = await findByText(/login/i);

    userEvent.click(loginBtn);

    expect(await findByText(/login error/i)).toBeInTheDocument();
  });

  it('should set login error if login fails', async () => {
    mockedAuthService.logout.mockResolvedValue();

    const { findByText } = setup('/auth');
    const logoutBtn = await findByText(/logout/i);

    userEvent.click(logoutBtn);

    expect(authService.logout).toHaveBeenCalled();
  });
});
