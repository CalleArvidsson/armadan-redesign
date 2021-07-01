import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import styles from './button.scss';

interface Props {
  loading: boolean;
  noAnimate: boolean;
  onlyChild: boolean;
}

const LoadingIcon = ({ loading = false, noAnimate = false, onlyChild = false }: Props) => {
  const classes = classNames(styles.loadingIcon, {
    [styles.loadingIconEntered]: noAnimate,
    [styles.loadingIconOnly]: onlyChild,
  });

  if (noAnimate) {
    return (
      <span className={classes}>
        <LoadingOutlined />
      </span>
    );
  }

  return (
    <CSSTransition
      in={loading}
      timeout={300}
      classNames={{
        enterActive: styles.loadingIconEntering,
        enterDone: styles.loadingIconEntered,
      }}
      unmountOnExit
    >
      <span className={classes}>
        <LoadingOutlined />
      </span>
    </CSSTransition>
  );
};

export default LoadingIcon;
