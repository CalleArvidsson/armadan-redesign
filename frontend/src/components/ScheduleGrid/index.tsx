import { FC } from 'react';
import { gql } from '@apollo/client';
import { Grid } from '@material-ui/core';
import Week, { fragments as weekFragments, WeekProp } from 'components/WeekTile';

interface Props {
  weeks: WeekProp[];
  onClick?: (id: string) => void;
}

const ScheduleGrid: FC<Props> = ({ weeks, onClick }) => (
  <Grid container spacing={2}>
    {weeks.map((week) => (
      <Grid item xs={12} sm={6} md={4} key={week.id}>
        <Week week={week} onClick={onClick} />
      </Grid>
    ))}
  </Grid>
);

export const fragments = {
  schedule: gql`
    fragment ScheduleFragment on Query {
      schedule {
        id
        ...WeekFragment
      }
    }
    ${weekFragments.week}
  `,
};

export default ScheduleGrid;
