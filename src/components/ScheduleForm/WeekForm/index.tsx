import { FC } from 'react';
import has from 'lodash/has';
import { gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import { useFormContext } from 'react-hook-form';
import { Paper, Typography, Grid, Divider, IconButton, Input, Select } from '@material-ui/core';
import { getWeekDates } from 'common/dateUtils';
import useConfirm from 'hooks/useConfirm';
import { useRemoveWeek } from 'mutations/index';
import { Week as WeekType, Course as CourseType, Tee as TeeType } from 'types';

interface Props {
  index: number;
  week: Pick<WeekType, 'id' | 'nr'> & { course: Pick<CourseType, 'id' | 'name'>; tee: Pick<TeeType, 'id' | 'name'> };
  onDelete(): void;
  courses: CourseType[];
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  courseInfo: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(1.5),
  },
  iconButton: {
    padding: 0,
    height: 25,
    width: 25,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  weekInput: {
    width: 75,
  },
  inputRoot: {
    fontSize: '2.5rem',
    textAlign: 'center',
    padding: 0,
  },
  hidden: {
    display: 'none',
  },
  dropdown: {
    width: 225,
    '& + &': {
      marginTop: theme.spacing(0.5),
    },
  },
  selectRoot: {
    padding: theme.spacing(0.5, 1, 0.5, 0.5),
  },
}));

const Week: FC<Props> = ({ week, onDelete, index, courses }) => {
  const confirm = useConfirm();
  const { register, errors, watch } = useFormContext();
  const [removeWeek] = useRemoveWeek({
    onCompleted() {
      onDelete();
    },
  });
  const weekNr = watch(`weeks[${index}].nr`);
  const selectedCourse = watch(`weeks[${index}].course.id`);
  const classes = useStyles();

  return (
    <Paper square className={classes.paper}>
      <Grid container alignItems="center">
        <Grid item className={classes.weekInfo} xs={3} sm={4}>
          <Input
            className={classes.hidden}
            defaultValue={week?.id}
            name={`weeks[${index}].id`}
            autoComplete="off"
            inputRef={register()}
          />
          <Input
            error={has(errors?.weeks?.[index], 'nr')}
            className={classes.weekInput}
            inputProps={{
              className: classes.inputRoot,
            }}
            name={`weeks[${index}].nr`}
            defaultValue={week.nr}
            id="nr"
            autoComplete="off"
            inputRef={register()}
          />
          <Typography variant="caption" color="textSecondary">
            {getWeekDates(weekNr)}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs className={classes.courseInfo}>
          <Select
            classes={{
              root: classes.selectRoot,
            }}
            variant="outlined"
            className={classes.dropdown}
            name={`weeks[${index}].course.id`}
            defaultValue={week.course.id}
            native
            inputRef={register()}
          >
            {courses.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select
            classes={{
              root: classes.selectRoot,
            }}
            className={classes.dropdown}
            name={`weeks[${index}].tee.id`}
            defaultValue={week.tee.id}
            native
            variant="outlined"
            inputRef={register()}
          >
            {courses
              .find((course) => course.id === selectedCourse)
              ?.tees.map((tee) => (
                <option value={tee.id} key={tee.id}>
                  {tee.name}
                </option>
              ))}
          </Select>
        </Grid>
      </Grid>
      <div className={classes.iconContainer}>
        <IconButton
          className={classes.iconButton}
          aria-label="delete"
          onClick={() => {
            if (week.id) {
              confirm({
                title: 'Ta bort vecka',
                description: 'Är du säker på att du vill ta bort veckan?',
                onConfirm() {
                  removeWeek({ variables: { id: week.id } });
                },
              });
            } else {
              onDelete();
            }
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </div>
    </Paper>
  );
};

export const fragments = {
  week: gql`
    fragment WeekFragment on Week {
      id
      nr
      course {
        id
        name
      }
      tee {
        id
        name
      }
    }
  `,
  course: gql`
    fragment WeekCourseFragment on Course {
      id
      name
      tees {
        id
        name
      }
    }
  `,
};

export default Week;
