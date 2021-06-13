import { gql } from '@apollo/client';
import PostFeed, { PostFeedData, fragments } from 'components/PostFeed';
import withQuery from 'common/withQuery';

export const HOME_QUERY = gql`
  query HomeQuery {
    ...PostFeedFragment
  }
  ${fragments.posts}
`;

export default withQuery<PostFeedData, Record<string, never>>(PostFeed, { query: HOME_QUERY });
