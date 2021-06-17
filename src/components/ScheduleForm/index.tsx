import { FC } from 'react';
import { gql, DocumentNode } from '@apollo/client';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Week as WeekType, Course as CourseType } from 'types';
import { useAddWeeks } from 'mutations/index';
import FormHeader from 'components/FormHeader';
import WeekForm, { fragments as weekFragments } from './WeekForm';

interface Props {
  courses: CourseType[];
  weeks: WeekType[];
  query: DocumentNode;
}

const useStyles = makeStyles((theme) => ({
  btn: {
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
}));

const ScheduleGrid: FC<Props> = ({ courses, query, weeks: schedule }) => {
  const classes = useStyles();
  const { handleSubmit, reset } = useFormContext();
  const [addWeeks, { loading }] = useAddWeeks({
    writeQuery: query,
    onCompleted() {
      reset({ weeks: schedule });
    },
  });
  const { fields, remove, append } = useFieldArray({ name: 'weeks', keyName: 'keyId' });

  const onSubmit = ({ weeks }: { weeks: WeekType[] }) => {
    const formattedWeeks = weeks.map((week) => ({ ...week, course: week.course.id, tee: week.tee.id }));

    addWeeks({
      variables: {
        input: {
          weeks: formattedWeeks,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader title="Schema">
        <div>
          <Button
            className={classes.btn}
            color="secondary"
            startIcon={<Add />}
            variant="outlined"
            size="small"
            onClick={() => append({ course: { id: courses[0].id }, tee: { id: courses[0].tees[0].id } })}
          >
            Ny vecka
          </Button>
          <Button
            disabled={loading}
            className={classes.btn}
            color="secondary"
            variant="outlined"
            size="small"
            type="submit"
          >
            Spara
          </Button>
        </div>
      </FormHeader>
      <Grid container spacing={2}>
        {fields.map((week, index) => (
          <Grid item md={6} key={week.keyId}>
            <WeekForm week={week as WeekType} onDelete={() => remove(index)} index={index} courses={courses} />
          </Grid>
        ))}
      </Grid>
    </form>
  );
};

export const fragments = {
  schedule: gql`
    fragment ScheduleFragment on Query {
      schedule {
        id
        ...WeekFragment
      }
      courses {
        ...WeekCourseFragment
      }
    }
    ${weekFragments.week}
    ${weekFragments.course}
  `,
};

export default ScheduleGrid;
