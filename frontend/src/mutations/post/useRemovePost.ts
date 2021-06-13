import { gql, Reference } from '@apollo/client';
import useMutationWithNotify from 'hooks/useMutationWithNotify';
import { MutationOptions, RemoveInput, DeletedId } from 'types';

export const REMOVE_POST = gql`
  mutation RemovePost($id: ID!) {
    removePost(id: $id) {
      deletedId
    }
  }
`;

const useRemovePost = (options: MutationOptions = {}) =>
  useMutationWithNotify<{ removePost: DeletedId }, RemoveInput>({
    query: REMOVE_POST,
    successText: 'Inlägg borttaget',
    update: (
      cache,
      {
        data: {
          removePost: { deletedId },
        },
      }
    ) => {
      cache.modify({
        fields: {
          posts: (existingPosts: Reference[] = [], { readField }) =>
            existingPosts.filter((postRef: Reference) => deletedId !== readField('id', postRef)),
        },
      });

      cache.modify({
        id: cache.identify({ id: deletedId, __typename: 'Post' }),
        fields(val, { DELETE }) {
          return DELETE;
        },
      });
    },
    ...options,
  });

export default useRemovePost;
