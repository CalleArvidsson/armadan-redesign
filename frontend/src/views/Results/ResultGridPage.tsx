import { FC } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { gql } from '@apollo/client';
import { Grid, IconButton } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import findIndex from 'lodash/findIndex';
import Week, { fragments } from 'components/WeekTile';
import withQuery from 'common/withQuery';
import { Week as WeekType } from 'types';
import EditResultPage from './EditResults';

const RESULT_GRID_QUERY = gql`
  query ResultGridQuery {
    schedule {
      id
      ...WeekFragment
    }
  }
  ${fragments.week}
`;

interface Props {
  data: {
    schedule: WeekType[];
  };
}

const useStyles = makeStyles((theme) => ({
  inactive: {
    opacity: 0.3,
  },
  activeWeek: {
    backgroundColor: theme.palette.warning.light,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.warning.main,
    },
  },
  editButton: {
    color: theme.palette.common.black,
  },
}));

const ResultGridPage: FC<Props> = ({ data }) => {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const history = useHistory();
  const nextActiveWeek = findIndex(data.schedule, (w) => !w.hasResults);

  return (
    <Switch>
      <Route exact path={path}>
        <Grid container spacing={2}>
          {data.schedule.map((week, index) => (
            <Grid item md={6} key={week.id}>
              <Week
                week={week}
                onClick={(id) => {
                  if (index !== nextActiveWeek) {
                    return;
                  }

                  history.push(`${path}/new/${id}`);
                }}
                className={classNames({
                  [classes.activeWeek]: index === nextActiveWeek,
                  [classes.inactive]: index !== nextActiveWeek,
                })}
              >
                {index < nextActiveWeek ? (
                  <IconButton className={classes.editButton} onClick={() => history.push(`${path}/edit/${week.id}`)}>
                    <Edit />
                  </IconButton>
                ) : null}
              </Week>
            </Grid>
          ))}
        </Grid>
      </Route>
      <Route path={`${path}/:mode/:weekId`}>
        <EditResultPage />
      </Route>
    </Switch>
  );
};

export default withQuery(ResultGridPage, { query: RESULT_GRID_QUERY });
