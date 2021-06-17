import { render } from 'common/testUtils';
import Errors from 'common/enums';
import Error from '.';

describe('<Error>', () => {
  it('should render general error as default', () => {
    const { getByText } = render(<Error />);
    expect(getByText(Errors.GENERAL)).toBeInTheDocument();
  });

  it('should render text prop if passed', () => {
    const { getByText } = render(<Error text="Test error" />);
    expect(getByText(/Test error/i)).toBeInTheDocument();
  });
});
