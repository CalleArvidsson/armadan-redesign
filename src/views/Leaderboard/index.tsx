import { FC, useMemo } from 'react';
import { gql } from '@apollo/client';
import orderBy from 'lodash/orderBy';
import LeaderList, { fragments } from 'components/LeaderList';
import withQuery from 'common/withQuery';
import { Leader } from 'types';

const LEADERBOARD_QUERY = gql`
  query LeaderboardQuery {
    leaderboard {
      ...LeaderList
    }
  }
  ${fragments.leaders}
`;

interface Props {
  data: {
    leaderboard: Leader[];
  };
}

const Leaderboard: FC<Props> = ({ data }) => {
  const leaderboard = useMemo<Leader[]>(
    () => orderBy(data.leaderboard, ['points', 'rounds'], ['desc', 'desc']),
    [data.leaderboard]
  );

  return <LeaderList leaderboard={leaderboard} />;
};

export default withQuery(Leaderboard, { query: LEADERBOARD_QUERY });
