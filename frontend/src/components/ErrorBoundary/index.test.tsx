import { render } from 'common/testUtils';
import ErrorBoundary from '.';

const Throws = () => {
  throw new Error('Error');
};

describe('<ErrorBoundary>', () => {
  it('should render children if no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Testing</div>
      </ErrorBoundary>
    );

    expect(getByText(/testing/i)).toBeInTheDocument();
  });

  it('should render error text on error', async () => {
    const { findByText } = render(
      <ErrorBoundary errorText="Test error">
        <Throws />
      </ErrorBoundary>
    );

    expect(await findByText(/test error/i)).toBeInTheDocument();
  });
});
