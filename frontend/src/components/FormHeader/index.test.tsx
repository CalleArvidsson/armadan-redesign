import { render } from 'common/testUtils';
import FormHeader from '.';

describe('<FormHeader>', () => {
  it('should render children and title properly', () => {
    const view = render(
      <FormHeader title="Test Title">
        <div>Test child</div>
      </FormHeader>
    );

    expect(view.getByText(/test title/i)).toBeInTheDocument();
    expect(view.getByText(/test child/i)).toBeInTheDocument();
  });

  it('should render startComp properly', () => {
    const view = render(<FormHeader title="test title" startComp={<div>start comp</div>} />);

    expect(view.getByText(/start comp/i)).toBeInTheDocument();
    expect(view.getByText(/test title/i)).toBeInTheDocument();
  });
});
