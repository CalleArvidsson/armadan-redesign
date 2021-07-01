import { render, userEvent } from '#/common/testUtils';
import Input from '.';

const baseProps = {
  id: 'testId',
  name: 'testName',
  placeholder: 'test',
};

describe('<Input>', () => {
  it('should render an input', () => {
    const { getByRole } = render(<Input {...baseProps} />);

    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('should render disabled state correctly', () => {
    const { getByRole } = render(<Input {...baseProps} disabled />);

    expect(getByRole('textbox')).toBeDisabled();
  });

  it('should handle value prop', () => {
    const { getByDisplayValue } = render(<Input {...baseProps} disabled value="test_value" />);

    expect(getByDisplayValue('test_value')).toBeInTheDocument();
  });

  it('should render prefix prop', () => {
    const { getByRole, getByText } = render(<Input {...baseProps} prefix={<div>prefix</div>} />);

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByText('prefix')).toBeInTheDocument();
  });
});
