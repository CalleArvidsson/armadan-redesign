import { render } from 'common/testUtils';
import Logo from '.';

describe('<Logo>', () => {
  test('renders logo img', () => {
    const { getByAltText } = render(<Logo />);

    expect(getByAltText('App logo')).toBeInTheDocument();
  });
});
