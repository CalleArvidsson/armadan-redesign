import { render, userEvent, waitFor } from 'common/testUtils';
import LoginForm from '.';

describe('<LoginForm>', () => {
  it('should call login with email and password', async () => {
    const login = jest.fn();
    const { getByRole, getByLabelText } = render(<LoginForm />, { auth: { login } });

    userEvent.type(getByLabelText(/email/i), 'test@test.se');
    userEvent.type(getByLabelText(/lösenord/i), 'password');
    userEvent.click(getByRole('button'));

    await waitFor(() =>
      expect(login).toBeCalledWith({
        email: 'test@test.se',
        password: 'password',
      })
    );
  });

  it('should render login error text if it exists', () => {
    const { getByText } = render(<LoginForm />, { auth: { loginError: 'Login error' } });

    expect(getByText(/login error/i)).toBeInTheDocument();
  });

  describe('input validation', () => {
    it('should show error message on empty inputs', async () => {
      const { getByRole, findByText } = render(<LoginForm />, { auth: { login: jest.fn() } });

      userEvent.click(getByRole('button'));

      const emailError = await findByText(/ange email/i);
      const passError = await findByText(/ange lösenord/i);

      expect(emailError).toBeInTheDocument();
      expect(passError).toBeInTheDocument();
    });

    it('should show error message on invalid email', async () => {
      const { getByRole, findByText, getByLabelText } = render(<LoginForm />, { auth: { login: jest.fn() } });

      userEvent.type(getByLabelText(/email/i), 'test');
      userEvent.type(getByLabelText(/lösenord/i), 'password');
      userEvent.click(getByRole('button'));

      const emailError = await findByText(/ogiltig email/i);

      expect(emailError).toBeInTheDocument();
    });
  });
});
