import { FC } from 'react';
import { gql } from '@apollo/client';
import ScheduleGrid, { fragments } from 'components/ScheduleGrid';
import withQuery from 'common/withQuery';
import { Week as WeekType } from 'types';

const SCHEDULE_QUERY = gql`
  query ScheduleQuery {
    ...ScheduleFragment
  }
  ${fragments.schedule}
`;

interface Props {
  data: {
    schedule: WeekType[];
  };
}

const Schedule: FC<Props> = ({ data }) => <ScheduleGrid weeks={data.schedule} />;

export default withQuery(Schedule, { query: SCHEDULE_QUERY });
