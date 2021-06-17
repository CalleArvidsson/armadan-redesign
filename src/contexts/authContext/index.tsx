import { FC, useState, useEffect, useContext, useCallback, createContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
// import authService from '../services/auth';
import authService, { IUser } from 'services/newAuth';

export interface AuthProviderData {
  login?(user: IUser): void;
  logout?(): void;
  isAdmin?: boolean;
  isAuthenticated?: boolean;
  loading?: boolean;
  loginError?: string | null;
}

const AuthContext = createContext<AuthProviderData>({
  login: () => {},
  logout: () => {},
  isAdmin: false,
  isAuthenticated: false,
  loading: true,
  loginError: null,
});
const useAuth = () => useContext(AuthContext);

const AuthProvider: FC = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);

  const setStatus = () => {
    setAuthenticated(authService.isAuthenticated);
    setAdmin(authService.isAdmin);
    setLoading(false);
    setLoginError(null);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        await authService.renewSession();
        history.push(location.pathname);
      } catch (e) {
        // Empty
      }

      setStatus();
    };

    checkSession();
  }, []);

  const login = useCallback(async (user: IUser) => {
    try {
      await authService.login(user);
      setStatus();
      history.push('/');
    } catch (e) {
      setLoginError(e.message);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        loginError,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, useAuth, AuthProvider };
