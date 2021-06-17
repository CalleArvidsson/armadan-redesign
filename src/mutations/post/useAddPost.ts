import { gql, Reference } from '@apollo/client';
import useMutationWithNotify from 'hooks/useMutationWithNotify';
import { MutationOptions, Post, AddPostInput } from 'types';

const ADD_POST = gql`
  mutation AddPost($input: AddPostInput!) {
    addPost(input: $input) {
      id
      title
      body
      author
      createdAt
    }
  }
`;

const useAddPost = (options: MutationOptions = {}) =>
  useMutationWithNotify<{ addPost: Post }, { input: AddPostInput }>({
    query: ADD_POST,
    successText: 'Inlägg tillagt',
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      cache.modify({
        fields: {
          posts: (existingPosts: Reference[] = []) => {
            const newPostRef = cache.writeFragment({
              data: data.addPost,
              fragment: gql`
                fragment NewPost on Post {
                  id
                  title
                  author
                  body
                  createdAt
                }
              `,
            });

            return [newPostRef, ...existingPosts];
          },
        },
      });
    },
    ...options,
  });

export default useAddPost;
