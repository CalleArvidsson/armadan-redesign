import { FC, lazy } from 'react';
import { gql } from '@apollo/client';
import Post, { fragments as postFragments } from 'components/Post';
import Errors from 'common/enums';
import { Post as PostType } from 'types';

export interface PostFeedData {
  posts: PostType[];
}

interface Props {
  data: PostFeedData;
  isEditMode?: boolean;
  onEdit?(post: PostType): void;
}

const Error = lazy(() => import(/* webpackChunkName: "Error" */ 'components/Error'));

const PostFeed: FC<Props> = ({ data, isEditMode = false, onEdit }) => (
  <>
    {data?.posts?.length ? (
      data.posts.map((post) => <Post key={post.id} post={post} isEditMode={isEditMode} onEdit={() => onEdit?.(post)} />)
    ) : (
      <Error text={Errors.EMPTY} />
    )}
  </>
);

export const fragments = {
  posts: gql`
    fragment PostFeedFragment on Query {
      posts {
        id
        ...PostFragment
      }
    }
    ${postFragments.post}
  `,
};

export default PostFeed;
