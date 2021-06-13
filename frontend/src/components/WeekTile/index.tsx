import { FC } from 'react';
import classNames from 'classnames';
import { gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Divider, useMediaQuery, useTheme } from '@material-ui/core';
import { getWeekDates, getCurrentWeek, isMonday } from 'common/dateUtils';
import { Week as WeekType, Course as CourseType, Tee as TeeType } from 'types';

export type WeekProp = Pick<WeekType, 'id' | 'nr' | 'hasResults'> & {
  course: Pick<CourseType, 'name'>;
  tee: Pick<TeeType, 'name'>;
};

interface Props {
  week: WeekProp;
  onClick?: (id: string) => void;
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0.5, 0),
    position: 'relative',
  },
  past: {
    opacity: 0.3,
  },
  current: {
    backgroundColor: theme.palette.warning.main,
  },
  week: {
    display: 'block',
    fontSize: '3rem',
    lineHeight: '1',
    maxHeight: '3rem',
    color: theme.palette.text.secondary,
  },
  courseName: {
    fontWeight: 'bold',
  },
  weekInfo: {
    textAlign: 'center',
  },
  courseInfo: {
    paddingLeft: theme.spacing(1.5),
  },
}));

const Week: FC<Props> = ({ week, onClick, className, children }) => {
  const theme = useTheme();
  const classes = useStyles();
  const currentWeek = getCurrentWeek();
  const isPhone = useMediaQuery(theme.breakpoints.down('xs'));
  const paperClasses = classNames(classes.paper, className, {
    [classes.past]: week.nr < currentWeek,
    [classes.current]: week.nr === currentWeek && !isMonday(),
  });

  return (
    <Paper square className={paperClasses} onClick={() => onClick?.(week.id)}>
      <Grid container alignItems="center">
        <Grid item className={classes.weekInfo} xs={3} sm={4}>
          <span className={classes.week}>{week.nr}</span>
          <Typography variant="caption" color="textSecondary">
            {getWeekDates(week.nr)}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs className={classes.courseInfo}>
          <Typography variant={isPhone ? 'h6' : 'body1'} className={classes.courseName}>
            {week.course.name}
          </Typography>
          <Typography variant="body2">{`Tee: ${week.tee.name}`}</Typography>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Paper>
  );
};

export const fragments = {
  week: gql`
    fragment WeekFragment on Week {
      nr
      hasResults
      course {
        name
      }
      tee {
        name
      }
    }
  `,
};

export default Week;
