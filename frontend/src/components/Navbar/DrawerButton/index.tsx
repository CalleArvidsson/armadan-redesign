import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from './style';

const useStyles = makeStyles(styles);

interface Props {
  menuOpen: boolean;
  onClick(): void;
}

const DrawerButton: FC<Props> = ({ menuOpen, onClick }) => {
  const classes = useStyles();
  const drawerClass = classNames(classes.drawer, {
    [classes.open]: menuOpen,
  });

  return (
    <div className={drawerClass} onClick={onClick} role="button" tabIndex={0} onKeyPress={onClick}>
      <div className={classes.drawerBar} id="bar-one" />
      <div className={classes.drawerBar} id="bar-two" />
      <div className={classes.drawerBar} id="bar-three" />
    </div>
  );
};

export default DrawerButton;
