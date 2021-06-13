import { FC, ElementType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from 'contexts/authContext';

interface Props extends RouteProps {
  comp: ElementType;
  admin?: boolean;
}

const PrivateRoute: FC<Props> = ({ comp: Comp, path, admin = false, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  let allowNavigation = isAuthenticated;

  if (admin) {
    allowNavigation = isAuthenticated && isAdmin;
  }

  return (
    <Route
      path={path}
      {...rest}
      render={(routeProps) =>
        allowNavigation ? (
          <Comp {...routeProps} {...rest} />
        ) : (
          <Redirect to={admin && isAuthenticated ? '/' : '/login'} />
        )
      }
    />
  );
};

export default PrivateRoute;
