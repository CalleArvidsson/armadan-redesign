import { Switch, Route } from 'react-router-dom';
import { render } from 'common/testUtils';
import PrivateRoute from '.';

const Home = () => <div>Home page</div>;
const Login = () => <div>Login page</div>;
const Private = () => <div>Private page</div>;
const Admin = () => <div>Admin page</div>;

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/private" comp={Private} />
    <PrivateRoute admin path="/admin" comp={Admin} />
  </Switch>
);

describe('<PrivateRoute>', () => {
  test('redirects to login if user is not logged in', () => {
    const { getByText } = render(<Routes />, { route: '/private', auth: { isAuthenticated: false } });

    expect(getByText(/login page/i)).toBeInTheDocument();
  });

  test('renders page if user is logged in', () => {
    const { getByText } = render(<Routes />, { route: '/private', auth: { isAuthenticated: true } });

    expect(getByText(/private page/i)).toBeInTheDocument();
  });

  test('renders admin page if user is logged in and admin', () => {
    const { getByText } = render(<Routes />, { route: '/admin', auth: { isAuthenticated: true, isAdmin: true } });

    expect(getByText(/admin page/i)).toBeInTheDocument();
  });

  test('redirects to home page if user is logged in but not admin', () => {
    const { getByText } = render(<Routes />, { route: '/admin', auth: { isAuthenticated: true, isAdmin: false } });

    expect(getByText(/home page/i)).toBeInTheDocument();
  });
});
