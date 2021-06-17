import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    tab: {
      flex: '0 0 4rem',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      borderLeft: '5px solid transparent',

      '&:last-child': {
        border: 'none',
      },

      '&$active': {
        '& $tabLink': {
          [theme.breakpoints.up('lg')]: {
            paddingLeft: 0,
          },
        },
      },

      [theme.breakpoints.up('lg')]: {
        flex: '0 0 7.5rem',
        border: 'none',
      },
    },
    tabLink: {
      textDecoration: 'none',
      color: theme.palette.primary.light,
      flexBasis: '100%',
      '-webkit-tap-highlight-color': 'transparent',
      paddingLeft: theme.spacing(2),
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',

      '&:active': {
        backgroundColor: theme.palette.primary.light,
      },
      '&:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },

      [theme.breakpoints.up('lg')]: {
        justifyContent: 'center',
        paddingLeft: 0,
      },
    },
    tabLinkText: {
      fontSize: '1rem',
      color: theme.palette.background.default,
      transition: 'color 0.1s ease',
    },
    active: {
      backgroundColor: theme.palette.primary.dark,
      borderLeft: `5px solid ${theme.palette.secondary.light}`,

      [theme.breakpoints.up('lg')]: {
        border: 'none',
      },
    },
    dropdown: {
      '& > a': {
        display: 'none',
      },

      [theme.breakpoints.up('lg')]: {
        '& > a': {
          display: 'flex',
        },

        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          borderLeftWidth: 5,
          borderLeftColor: theme.palette.secondary.light,

          '& $dropdownList': {
            display: 'flex',
          },
        },
      },
    },
    dropdownList: {
      flex: '0 0 4rem',
      display: 'flex',

      '& $dropdownLink': {
        display: 'none',

        '&:last-child': {
          display: 'flex',
        },
      },

      [theme.breakpoints.up('lg')]: {
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        padding: 0,
        top: theme.sizes.navbarHeight,
        flexDirection: 'column',
        width: '10rem',
        zIndex: 2,
        right: 0,
        display: 'none',
      },
    },
    dropdownLink: {
      flex: '0 0 100%',
      display: 'flex',

      [theme.breakpoints.up('lg')]: {
        display: 'flex',
        flex: '0 0 3.5rem',
        position: 'relative',
      },
    },
  });
