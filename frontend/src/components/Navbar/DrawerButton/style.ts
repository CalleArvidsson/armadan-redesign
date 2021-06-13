import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 0.2s ease',
      width: theme.sizes.drawerBtnWidth,
      outline: 'none',

      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    open: {
      backgroundColor: theme.palette.primary.dark,
      transition: 'background-color 0.3s ease',

      '& $drawerBar': {
        transition: '0.3s ease',

        '&:nth-child(1)': {
          transform: 'translateY(0.5rem) rotate(45deg)',
        },

        '&:nth-child(2)': {
          width: 0,
        },

        '&:nth-child(3)': {
          transform: 'translateY(-0.5rem) rotate(-45deg)',
        },
      },
    },
    drawerBar: {
      width: '2rem',
      borderRadius: 1,
      height: 2,
      backgroundColor: theme.palette.background.default,
      transition: '0.2s ease',

      '& + &': {
        marginTop: '0.4rem',
      },
    },
  });
