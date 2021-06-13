import React from 'react';
import { gql } from '@apollo/client';
import { render } from 'common/testUtils';
import withQuery from '../withQuery';

interface MockData {
  mock: {
    text: string;
  };
}

interface TestProps {
  data: MockData;
}

const TestComp: React.FC<TestProps> = ({ data }) => <div>{`${data.mock.text}`}</div>;
const MOCK_QUERY = gql`
  query MockQuery {
    mock {
      text
    }
  }
`;

describe('withQuery', () => {
  it('should render the component and pass data prop', async () => {
    const Comp = withQuery(TestComp, { query: MOCK_QUERY });
    const { findByText } = render(<Comp />, {
      apollo: { mocks: [{ request: { query: MOCK_QUERY }, result: { data: { mock: { text: 'hello' } } } }] },
    });

    expect(await findByText(/hello/i)).toBeInTheDocument();
  });

  it('should render the component without container', async () => {
    const Comp = withQuery(TestComp, { query: MOCK_QUERY }, { useContainer: false });
    const { findByText } = render(<Comp />, {
      apollo: { mocks: [{ request: { query: MOCK_QUERY }, result: { data: { mock: { text: 'hello' } } } }] },
    });

    expect(await findByText(/hello/i)).toBeInTheDocument();
  });

  it('should render error text on error', async () => {
    const Comp = withQuery(TestComp, { query: MOCK_QUERY }, { errorText: 'test error' });
    const { findByText } = render(<Comp />, {
      apollo: { mocks: [{ request: { query: MOCK_QUERY }, error: new Error() }] },
    });

    const error = await findByText(/test error/i);

    expect(error).toBeInTheDocument();
  });

  it('should render loader when waiting for data', () => {
    const Comp = withQuery(TestComp, { query: MOCK_QUERY });
    const { getByRole } = render(<Comp />);

    expect(getByRole('status')).toBeInTheDocument();
  });
});
