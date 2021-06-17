import { gql } from '@apollo/client';
import useMutationWithNotify from 'hooks/useMutationWithNotify';
import { MutationOptions, Post, UpdatePostInput } from 'types';

const UPDATE_POST = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      id
      title
      body
      author
      createdAt
    }
  }
`;

const useUpdatePost = (options: MutationOptions = {}) =>
  useMutationWithNotify<{ updatePost: Post }, { input: UpdatePostInput }>({
    query: UPDATE_POST,
    successText: 'Inlägg uppdaterat',
    ...options,
  });

export default useUpdatePost;
