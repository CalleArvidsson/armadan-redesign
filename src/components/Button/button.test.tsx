import { render, userEvent } from '#/common/testUtils';
import Button from '.';

describe('<Button>', () => {
  it('should render a button', () => {
    const { getByRole, getByText } = render(<Button onClick={jest.fn()}>Click me</Button>);

    expect(getByRole('button')).toBeInTheDocument();
    expect(getByText(/click me/i)).toBeInTheDocument();
  });

  it('should render disabled state correctly', () => {
    const { getByRole } = render(<Button onClick={jest.fn()} disabled />);

    expect(getByRole('button')).toBeDisabled();
  });

  it('should call onClick prop when clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick} />);

    userEvent.click(getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });

  it('should render icon prop', () => {
    const { getByText } = render(<Button onClick={jest.fn()} icon={<div>icon</div>} />);

    expect(getByText(/icon/i)).toBeInTheDocument();
  });
});
