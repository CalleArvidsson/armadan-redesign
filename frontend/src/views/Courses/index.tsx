import { FC } from 'react';
import { Switch, useRouteMatch, Route, useHistory } from 'react-router-dom';
import { gql } from '@apollo/client';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import CourseList, { fragments, CourseListData } from 'components/CourseList';
import FormHeader from 'components/FormHeader';
import withQuery from 'common/withQuery';
import EditCourse from './EditCourse';

export const COURSES_QUERY = gql`
  query CoursesQuery {
    ...CourseListFragment
  }
  ${fragments.courses}
`;

interface Props {
  data: CourseListData;
}

const CoursePage: FC<Props> = ({ data }) => {
  const history = useHistory();
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <FormHeader title="Banor">
          <Button
            color="secondary"
            startIcon={<Add />}
            variant="outlined"
            size="small"
            onClick={() => history.push(`${path}/new`)}
          >
            Ny bana
          </Button>
        </FormHeader>
        <CourseList data={data} />
      </Route>
      <Route path={`${path}/:courseId`}>
        <EditCourse />
      </Route>
    </Switch>
  );
};

export default withQuery<CourseListData, Record<string, unknown>>(CoursePage, { query: COURSES_QUERY });
