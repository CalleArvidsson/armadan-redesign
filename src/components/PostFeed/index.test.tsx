import { convertToRaw, ContentState } from 'draft-js';
import { render, userEvent } from 'common/testUtils';
import Errors from 'common/enums';
import PostFeed, { PostFeedData } from '.';

const mockData: PostFeedData = {
  posts: [
    {
      id: '1',
      title: 'first title',
      body: JSON.stringify(convertToRaw(ContentState.createFromText('first body'))),
      author: 'calle',
      createdAt: `${Date.now()}`,
    },
    {
      id: '2',
      title: 'second title',
      body: JSON.stringify(convertToRaw(ContentState.createFromText('second body'))),
      author: 'oscar',
      createdAt: `${Date.now()}`,
    },
  ],
};

describe('<PostFeed>', () => {
  it('should render posts', () => {
    const { getByText } = render(<PostFeed data={mockData} />);

    expect(getByText(/first title/i)).toBeInTheDocument();
    expect(getByText(/first body/i)).toBeInTheDocument();
    expect(getByText(/calle/i)).toBeInTheDocument();
    expect(getByText(/second title/i)).toBeInTheDocument();
    expect(getByText(/second body/i)).toBeInTheDocument();
    expect(getByText(/oscar/i)).toBeInTheDocument();
  });

  it('should render error message if empty', async () => {
    const { findByText } = render(<PostFeed data={{ posts: [] }} />);

    expect(await findByText(Errors.EMPTY)).toBeInTheDocument();
  });

  it('should call onDelete and onEdit on button click in edit mode', () => {
    const onEdit = jest.fn();
    const { getAllByRole } = render(<PostFeed data={mockData} onEdit={onEdit} isEditMode />);

    userEvent.click(getAllByRole('button', { name: /edit/i })[0]);
    userEvent.click(getAllByRole('button', { name: /delete/i })[0]);

    expect(onEdit).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
      })
    );
  });
});
