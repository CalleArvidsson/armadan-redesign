import { FC, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from 'contexts/authContext';
import Navbar from 'components/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import ErrorBoundary from 'components/ErrorBoundary';
import FallbackLoader from 'components/FallbackLoader';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ 'views/Home'));
const Login = lazy(() => import(/* webpackChunkName: "Login" */ 'views/Login'));
const Result = lazy(() => import(/* webpackChunkName: "Result" */ 'views/Results'));
const Admin = lazy(() => import(/* webpackChunkName: "Admin" */ 'views/Admin'));
const Leaderboard = lazy(() => import(/* webpackChunkName: "Leaderboard" */ 'views/Leaderboard'));
const Schedule = lazy(() => import(/* webpackChunkName: "Schedule" */ 'views/Schedule'));

const Routes: FC = () => (
  <Suspense fallback={<FallbackLoader />}>
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/leaderboard" comp={Leaderboard} />
      <PrivateRoute path="/schedule" comp={Schedule} />
      <PrivateRoute path="/result" comp={Result} />
      <PrivateRoute path="/admin" admin comp={Admin} />
      <PrivateRoute path="/auth" comp={Home} />
      <PrivateRoute exact path="/" comp={Home} />
    </Switch>
  </Suspense>
);

const useStyles = makeStyles({
  app: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
});

const App: FC = () => {
  const { loading } = useAuth();
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Navbar />
      <ErrorBoundary>{loading ? <FallbackLoader /> : <Routes />}</ErrorBoundary>
    </div>
  );
};

export default App;
