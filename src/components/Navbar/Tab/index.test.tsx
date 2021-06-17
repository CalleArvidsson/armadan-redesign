import { render, userEvent } from 'common/testUtils';
import Tab from '.';

describe('<Tab>', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addListener: () => {},
      removeListener: () => {},
    });
  });
  test('renders correct link name', () => {
    const { getByText } = render(<Tab linkRef="/" name="Hem" onClick={jest.fn} />);

    expect(getByText(/hem/i)).toBeInTheDocument();
  });

  test('fires onClick prop on click', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Tab linkRef="/" name="Hem" onClick={onClick} />);

    userEvent.click(getByText('Hem'));

    expect(onClick).toBeCalled();
  });
});
