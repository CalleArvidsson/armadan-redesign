import { FC } from 'react';
import { gql } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import withQuery from 'common/withQuery';
import CourseForm, { fragments } from 'components/CourseForm';
import FormHeader from 'components/FormHeader';
import { Course as CourseType } from 'types';

const useStyles = makeStyles(() => ({
  filler: {
    width: 48,
  },
}));

interface Props {
  data: {
    course?: CourseType;
  };
}

const EditCoursePage: FC<Props> = ({ data: { course } }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <FormHeader
        title={!course ? 'Ny Bana' : 'Uppdatera Bana'}
        startComp={
          <IconButton aria-label="back" onClick={() => history.goBack()}>
            <ArrowBack />
          </IconButton>
        }
      >
        <div className={classes.filler} />
      </FormHeader>
      <CourseForm course={course} />
    </>
  );
};

const EDIT_COURSE_QUERY = gql`
  query EditCourseQuery($id: ID!) {
    course(id: $id) {
      ...CourseFormFragment
    }
  }
  ${fragments.course}
`;

interface Params {
  courseId: string;
}

interface QueryVars {
  id: string;
}

interface CourseQuery {
  course?: CourseType;
}

const PageWithQuery = withQuery<CourseQuery, QueryVars>(
  EditCoursePage,
  { query: EDIT_COURSE_QUERY },
  { useContainer: false }
);

const EditCourse: FC = () => {
  const { courseId } = useParams<Params>();

  if (courseId === 'new') {
    return <EditCoursePage data={{}} />;
  }

  return <PageWithQuery queryVariables={{ id: courseId }} />;
};

export default EditCourse;
