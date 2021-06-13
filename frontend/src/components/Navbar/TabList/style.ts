import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    tabList: {
      width: '100%',
      display: 'flex',
      position: 'absolute',
      top: theme.sizes.navbarHeight,
      height: `calc(100vh - ${theme.sizes.navbarHeight})`,
      transform: 'translateX(-100%)',
      transition: 'transform 0.2s ease',

      '& > ul': {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '100%',
        backgroundColor: theme.palette.primary.dark,
        margin: 0,
        padding: 0,

        [theme.breakpoints.up('lg')]: {
          backgroundColor: 'transparent',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
        },
      },

      [theme.breakpoints.up('md')]: {
        maxWidth: '40%',
      },

      [theme.breakpoints.up('lg')]: {
        position: 'static',
        maxWidth: '100%',
        height: '100%',
        order: 1,
        transform: 'translateX(0%)',
      },
    },
    open: {
      transform: 'translateX(0%)',
      transition: 'transform 0.3s ease',
    },
    filler: {
      flex: 1,
      display: 'flex',
      borderBottom: `2px solid ${theme.palette.primary.main}`,

      [theme.breakpoints.up('lg')]: {
        border: 'none',
      },
    },
  });
