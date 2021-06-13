import { convertToRaw, ContentState } from 'draft-js';
import { render } from 'common/testUtils';
import Errors from 'common/enums';
import Home, { HOME_QUERY } from '.';

const mockQuery = {
  request: {
    query: HOME_QUERY,
  },
  result: {
    data: {
      posts: [
        {
          id: 1,
          title: 'first title',
          body: JSON.stringify(convertToRaw(ContentState.createFromText('first body'))),
          author: 'calle',
          createdAt: `${Date.now()}`,
          __typename: 'Post',
        },
        {
          id: 2,
          title: 'second title',
          body: JSON.stringify(convertToRaw(ContentState.createFromText('second body'))),
          author: 'oscar',
          createdAt: `${Date.now()}`,
          __typename: 'Post',
        },
      ],
      __typename: 'Query',
    },
  },
};

describe('<Home>', () => {
  it('should render posts', async () => {
    const { findByText } = render(<Home />, { apollo: { mocks: [mockQuery] } });

    expect(await findByText(/first title/i)).toBeInTheDocument();
  });

  it('should render error message on error', async () => {
    const { findByText } = render(<Home />, {
      apollo: {
        mocks: [
          {
            request: { query: HOME_QUERY },
            error: new Error(),
          },
        ],
      },
    });

    expect(await findByText(Errors.GENERAL)).toBeInTheDocument();
  });

  it('should render loader while waiting for data', async () => {
    const { getByRole } = render(<Home />);

    expect(getByRole('status')).toBeInTheDocument();
  });
});
