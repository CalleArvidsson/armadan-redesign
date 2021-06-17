import { FC, useEffect } from 'react';
import { gql } from '@apollo/client';
import { TextField, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import has from 'lodash/has';
import * as yup from 'yup';
import { useUpdateCourse, useAddCourse } from 'mutations/index';
import { Course as CourseType, AddCourseInput, UpdateCourseInput } from 'types';
import TeeForm, { fragments as teeFragments } from './components/TeeForm';
import HoleForm, { fragments as holeFragments } from './components/HoleForm';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  },
  input: {
    flex: '0 0 75%',

    '& + &': {
      flex: '1',
      marginLeft: theme.spacing(1),
    },
  },
  btn: {
    marginBottom: theme.spacing(2),
  },
}));

const CourseSchema = yup.object().shape({
  name: yup.string().required().trim(),
  par: yup.number().required().integer().positive(),
  tees: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().notRequired(),
        name: yup.string().required().trim(),
        slope: yup.number().required().integer().positive(),
        cr: yup.number().required().positive(),
      })
    )
    .ensure(),
  holes: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().notRequired(),
        nr: yup.number().required().integer().positive(),
        par: yup.number().required().integer().positive().oneOf([3, 4, 5]),
        index: yup.number().required().integer().positive().min(1).max(18),
      })
    )
    .ensure(),
});

interface Props {
  course?: CourseType;
}

const CourseForm: FC<Props> = ({ course = {} }) => {
  const classes = useStyles();
  const history = useHistory();
  const [updateCourse, { loading: updateLoading }] = useUpdateCourse();
  const [addCourse, { loading: addLoading }] = useAddCourse({
    onCompleted() {
      history.goBack();
    },
  });
  const { register, errors, handleSubmit, control, reset, ...rest } = useForm({
    defaultValues: course,
    resolver: yupResolver(CourseSchema),
  });

  const onSubmit = (data: AddCourseInput | Omit<UpdateCourseInput, 'id'>) => {
    if (!course.id) {
      const newData: AddCourseInput = { ...data };

      newData.holes = newData.holes.map(({ nr, par, index }) => ({ nr, par, index }));
      newData.tees = newData.tees.map(({ name, slope, cr }) => ({ name, slope, cr }));

      addCourse({
        variables: { input: { ...newData } },
      });
    } else {
      updateCourse({ variables: { input: { id: course.id, ...(data as Omit<UpdateCourseInput, 'id'>) } } });
    }
  };

  useEffect(() => {
    if (course.id) {
      reset(course);
    }
  }, [course]);

  return (
    <FormProvider
      control={control}
      reset={reset}
      register={register}
      errors={errors}
      {...rest}
      handleSubmit={handleSubmit}
    >
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Paper square className={classes.container}>
          <TextField
            error={has(errors, 'name')}
            className={classes.input}
            margin="normal"
            id="name"
            label="Namn"
            name="name"
            autoComplete="off"
            inputRef={register}
          />
          <TextField
            error={has(errors, 'par')}
            className={classes.input}
            margin="normal"
            id="par"
            label="Par"
            name="par"
            autoComplete="off"
            inputRef={register}
          />
        </Paper>
        <TeeForm courseId={course.id} />
        <HoleForm holes={course.holes} />
        <Button
          disabled={addLoading || updateLoading}
          variant="outlined"
          aria-label="submit"
          type="submit"
          color="primary"
          className={classes.btn}
        >
          Spara
        </Button>
      </form>
    </FormProvider>
  );
};

export const fragments = {
  course: gql`
    fragment CourseFormFragment on Course {
      id
      name
      par
      tees {
        ...TeeFormFragment
      }
      holes {
        ...HoleFormFragment
      }
    }
    ${teeFragments.tee}
    ${holeFragments.hole}
  `,
};

export default CourseForm;
