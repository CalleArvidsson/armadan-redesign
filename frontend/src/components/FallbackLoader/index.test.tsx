import { render } from 'common/testUtils';
import FallbackLoader from '.';

describe('<FallbackLoader>', () => {
  it('should render loading spinner', () => {
    const { getByRole } = render(<FallbackLoader />);
    expect(getByRole('status')).toBeInTheDocument();
  });
});
