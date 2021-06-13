import { FC, Fragment, useState, lazy, Suspense, ElementType } from 'react';
import { useHistory, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse } from '@material-ui/core';
import { People, Today, Equalizer, Description, Flag, ExpandLess, ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PrivateRoute from 'components/PrivateRoute';
import FallbackLoader from 'components/FallbackLoader';

const Courses = lazy(() => import(/* webpackChunkName: "Courses" */ 'views/Courses'));
const Players = lazy(() => import(/* webpackChunkName: "Players" */ 'views/Players'));
const Posts = lazy(() => import(/* webpackChunkName: "Posts" */ 'views/Posts'));
const Results = lazy(() => import(/* webpackChunkName: "EditResults" */ 'views/Results/ResultGridPage'));
const Schedule = lazy(() => import(/* webpackChunkName: "EditSchedule" */ 'views/Schedule/EditSchedule'));

const DRAWER_WIDTH = 240;

interface Action {
  name: string;
  linkRef: string;
  Icon: ElementType;
  items?: Action[];
}

const actions: Action[] = [
  {
    name: 'Inlägg',
    linkRef: 'posts',
    Icon: Description,
  },
  {
    name: 'Resultat',
    linkRef: 'results',
    Icon: Equalizer,
  },
  {
    name: 'Schema',
    linkRef: 'schedule',
    Icon: Today,
  },
  {
    name: 'Spelare',
    linkRef: 'players',
    Icon: People,
  },
  {
    name: 'Banor',
    linkRef: 'courses',
    Icon: Flag,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    overflow: 'scroll',
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.background.default,
  },
  portal: {
    width: '100%',
    padding: theme.spacing(2, 3),
    display: 'flex',

    [theme.breakpoints.up('md')]: {
      maxWidth: 960,
    },
  },
  filler: {
    height: theme.sizes.navbarHeight,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    color: theme.palette.background.default,
  },
  listItem: {
    borderLeft: `6px solid ${theme.palette.primary.dark}`,
  },
  active: {
    borderColor: theme.palette.secondary.main,
  },
}));

const Admin: FC = () => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { path } = useRouteMatch();
  const location = useLocation();

  const createListItem = (action: Action, nested = false) => {
    const { Icon } = action;

    if (action.items) {
      return (
        <Fragment key={action.name}>
          <ListItem button onClick={() => setExpanded(!expanded)}>
            <ListItemIcon>
              <Icon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={action.name} />
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {action.items.map((item) => createListItem(item, true))}
            </List>
          </Collapse>
        </Fragment>
      );
    }

    return (
      <ListItem
        button
        key={action.name}
        onClick={() => history.replace(`${path}/${action.linkRef}`)}
        className={classNames(classes.listItem, {
          [classes.nested]: nested,
          [classes.active]: location.pathname.includes(action.linkRef),
        })}
      >
        <ListItemIcon>
          <Icon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary={action.name} />
      </ListItem>
    );
  };

  return (
    <div className={classes.root}>
      <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.filler} />
        <List>{actions.map((action) => createListItem(action))}</List>
      </Drawer>
      <div className={classes.portal}>
        <Suspense fallback={<FallbackLoader />}>
          <Switch>
            <PrivateRoute admin path={`${path}/posts`} comp={Posts} />
            <PrivateRoute admin path={`${path}/results`} comp={Results} />
            <PrivateRoute admin path={`${path}/schedule`} comp={Schedule} />
            <PrivateRoute admin path={`${path}/players`} comp={Players} />
            <PrivateRoute admin path={`${path}/courses`} comp={Courses} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default Admin;
