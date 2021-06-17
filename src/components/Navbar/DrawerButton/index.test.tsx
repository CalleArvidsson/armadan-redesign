import { render, userEvent } from 'common/testUtils';
import DrawerButton from '.';

describe('<DrawerButton>', () => {
  test('triggers onClick prop when clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<DrawerButton onClick={onClick} menuOpen />);

    userEvent.click(getByRole('button'));

    expect(onClick).toBeCalled();
  });
});
