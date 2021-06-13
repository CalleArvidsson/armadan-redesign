import { render, userEvent } from 'common/testUtils';
import ConfirmDialog from '.';

describe('<ConfirmDialog>', () => {
  it('should not render anything as default', () => {
    const { queryByRole } = render(<ConfirmDialog onCancel={jest.fn()} onConfirm={jest.fn()} />);

    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render texts and buttons', () => {
    const { getByText, getAllByRole } = render(
      <ConfirmDialog
        open
        title="mock title"
        description="mock description"
        onCancel={jest.fn()}
        onConfirm={jest.fn()}
      />
    );

    expect(getByText(/mock title/i)).toBeInTheDocument();
    expect(getByText(/mock description/i)).toBeInTheDocument();
    expect(getAllByRole('button')).toHaveLength(2);
  });

  it('should call onClick handlers on button clicks', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    const { getByText } = render(<ConfirmDialog open onCancel={onCancel} onConfirm={onConfirm} />);

    // Cancel
    userEvent.click(getByText(/avbryt/i));
    expect(onCancel).toHaveBeenCalled();

    // Confirm
    userEvent.click(getByText(/ok/i));
    expect(onConfirm).toHaveBeenCalled();
  });
});
