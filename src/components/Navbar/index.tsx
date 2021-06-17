import { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useAuth } from 'contexts/authContext';
import TabList from './TabList';
import DrawerButton from './DrawerButton';
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: 'flex',
    position: 'sticky',
    zIndex: theme.zIndex.drawer + 1,
    height: theme.sizes.navbarHeight,
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[3],

    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start',
      padding: '0 5%',
    },
  },
  center: {
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center',
    },
  },
}));

interface Tab {
  linkRef: string;
  name: string;
  onClick?: () => void;
}

interface FillerTab {
  filler: boolean;
}

const tabs: (Tab | FillerTab)[] = [
  { linkRef: '/', name: 'Hem' },
  { linkRef: '/result', name: 'Resultat' },
  { linkRef: '/schedule', name: 'Schema' },
  { linkRef: '/leaderboard', name: 'Ledartavla' },
  { filler: true },
  { linkRef: '/profile', name: 'Min profil' },
  { linkRef: '/admin', name: 'Admin' },
  { linkRef: '#', name: 'Logga ut' },
];

const Navbar: FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const classes = useStyles();
  const navbarClass = classNames(classes.navbar, {
    [classes.center]: !isAuthenticated,
  });

  const onTabClick = () => setShowMenu(false);

  useEffect(() => {
    (tabs[tabs.length - 1] as Tab).onClick = () => logout?.();
  }, []);

  return (
    <div className={navbarClass}>
      <Logo />
      {isAuthenticated ? (
        <>
          <TabList tabs={tabs} menuOpen={showMenu} onTabClick={onTabClick} />
          <DrawerButton menuOpen={showMenu} onClick={() => setShowMenu(!showMenu)} />
        </>
      ) : null}
    </div>
  );
};

export default Navbar;
