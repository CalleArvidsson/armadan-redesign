import { convertToRaw, ContentState } from 'draft-js';
import { render, userEvent, waitForElementToBeRemoved } from 'common/testUtils';
import { REMOVE_POST } from 'mutations/post/useRemovePost';
import Post from '.';

const mockPost = {
  id: 'mockId',
  title: 'mock title',
  body: JSON.stringify(convertToRaw(ContentState.createFromText('mock body'))),
  author: 'mock author',
  createdAt: `${Date.now()}`,
};

describe('<Post>', () => {
  it('should render post data', () => {
    const { getByText } = render(<Post post={mockPost} />);

    expect(getByText(/mock title/i)).toBeInTheDocument();
    expect(getByText(/mock body/i)).toBeInTheDocument();
    expect(getByText(/mock author/i)).toBeInTheDocument();
  });

  it('should not render buttons in normal mode', () => {
    const { queryByRole } = render(<Post post={mockPost} />);

    expect(queryByRole('button')).not.toBeInTheDocument();
  });

  describe('Edit mode', () => {
    it('should render delete and edit button', () => {
      const { getByRole } = render(<Post post={mockPost} isEditMode />);

      expect(getByRole('button', { name: /edit/i })).toBeInTheDocument();
      expect(getByRole('button', { name: /delete/i })).toBeInTheDocument();
    });

    it('edit button should trigger click handler', () => {
      const onEdit = jest.fn();
      const { getByRole } = render(<Post post={mockPost} isEditMode onEdit={onEdit} />);

      userEvent.click(getByRole('button', { name: /edit/i }));
      userEvent.click(getByRole('button', { name: /delete/i }));

      expect(onEdit).toBeCalled();
    });

    it('delete button should open confirmation dialog', () => {
      const { getByRole, queryByRole } = render(<Post post={mockPost} isEditMode onEdit={jest.fn()} />);

      expect(queryByRole('dialog')).not.toBeInTheDocument();

      userEvent.click(getByRole('button', { name: /delete/i }));

      expect(getByRole('dialog')).toBeInTheDocument();
    });

    it('should show toast alert after deleting successfully', async () => {
      const { getByRole, getByText } = render(<Post post={mockPost} isEditMode onEdit={jest.fn()} />, {
        apollo: {
          mocks: [
            {
              request: {
                query: REMOVE_POST,
                variables: { id: mockPost.id },
              },
              result: { data: { removePost: { deletedId: mockPost.id } } },
            },
          ],
        },
      });

      userEvent.click(getByRole('button', { name: /delete/i }));
      userEvent.click(getByRole('button', { name: /dialog-confirm/i }));

      await waitForElementToBeRemoved(() => getByRole('dialog'));

      expect(getByRole('alert')).toBeInTheDocument();
      expect(getByText(/inlägg borttaget/i)).toBeInTheDocument();
    });

    it('should render only title in edit mode', () => {
      const { getByText, queryByText } = render(<Post post={mockPost} isEditMode />);

      expect(getByText(/mock title/i)).toBeInTheDocument();
      expect(queryByText(/mock body/i)).not.toBeInTheDocument();
      expect(queryByText(/mock author/i)).not.toBeInTheDocument();
    });
  });
});
