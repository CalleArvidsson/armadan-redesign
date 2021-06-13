import { useState } from 'react';
import { render, userEvent, waitForElementToBeRemoved } from 'common/testUtils';
import useConfirm from 'hooks/useConfirm';

const MockComp = () => {
  const [status, setStatus] = useState('');
  const confirm = useConfirm();

  return (
    <>
      <div>{status}</div>
      <button
        type="button"
        onClick={() => {
          confirm({
            title: 'Confirm',
            description: 'Are you sure?',
            onCancel() {
              setStatus('canceled');
            },
            onConfirm() {
              setStatus('confirmed');
            },
          });
        }}
      >
        open
      </button>
    </>
  );
};

describe('confirmContext', () => {
  it('should open dialog with correct texts', () => {
    const { getByRole, getByText } = render(<MockComp />);

    // Open dialog
    userEvent.click(getByRole('button'));

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByText(/confirm/i)).toBeInTheDocument();
    expect(getByText(/are you sure\?/i)).toBeInTheDocument();
  });

  it('should reject promise if user clicks cancel', async () => {
    const { getByRole, getByText, queryByRole } = render(<MockComp />);

    userEvent.click(getByRole('button'));
    userEvent.click(getByText(/avbryt/i));

    await waitForElementToBeRemoved(() => getByRole('dialog'));

    expect(getByText(/canceled/i)).toBeInTheDocument();
    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should resolve promise if user clicks ok', async () => {
    const { getByRole, getByText, queryByRole } = render(<MockComp />);

    userEvent.click(getByRole('button'));
    userEvent.click(getByText(/ok/i));

    await waitForElementToBeRemoved(() => getByRole('dialog'));

    expect(getByText(/confirmed/i)).toBeInTheDocument();
    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });
});
