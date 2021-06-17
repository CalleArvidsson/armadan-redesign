import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useAuth } from 'contexts/authContext';
import armadanLogo from 'images/Armadan.min.svg';

const useStyles = makeStyles((theme) => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    order: 1,
    flex: 1,

    '& > img': {
      height: '2rem',
      width: '9rem',
      marginLeft: `-${theme.sizes.drawerBtnWidth}`,
    },

    '&$center': {
      '& > img': {
        marginLeft: 0,
      },
    },

    [theme.breakpoints.up('lg')]: {
      flex: 0,
      marginRight: '1.5rem',

      '& > img': {
        marginLeft: 0,
      },
    },
  },
  center: {
    [theme.breakpoints.up('lg')]: {
      marginRight: 0,
    },
  },
}));

const Logo: FC = () => {
  const { isAuthenticated } = useAuth();
  const classes = useStyles({ isAuthenticated });
  const logoClass = classNames(classes.logo, {
    [classes.center]: !isAuthenticated,
  });

  return (
    <div className={logoClass}>
      <img src={armadanLogo} alt="App logo" />
    </div>
  );
};

export default Logo;
