import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import LoadingIcon from './LoadingIcon';
import styles from './button.scss';

export interface Props {
  type?: 'default' | 'primary' | 'dashed' | 'text' | 'link';
  size?: 'default' | 'large' | 'small';
  htmlType?: 'button' | 'submit' | 'reset';
  shape?: 'default' | 'round' | 'circle';
  disabled?: boolean;
  danger?: boolean;
  block?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  onClick: () => void;
}

const Button = ({
  type = 'default',
  size = 'default',
  shape = 'default',
  htmlType = 'button',
  disabled = false,
  danger = false,
  block = false,
  loading = false,
  icon,
  children,
  onClick,
}: Props) => {
  const [clickAnimation, setClickAnimation] = useState(false);
  const isIconOnly = !!icon && !children;
  const classes = classNames(styles.button, {
    [styles[type]]: type !== 'default',
    [styles[size]]: size !== 'default',
    [styles[shape]]: shape !== 'default',
    [styles.clicked]: clickAnimation,
    [styles.dangerous]: danger,
    [styles.block]: block,
    [styles.loading]: loading,
    [styles.iconOnly]: isIconOnly,
  });

  const iconNode =
    icon && !loading ? icon : <LoadingIcon loading={loading} noAnimate={isIconOnly} onlyChild={isIconOnly} />;

  return (
    <button
      className={classes}
      type={htmlType}
      disabled={disabled}
      onClick={() => {
        setClickAnimation(true);
        onClick?.();
      }}
      onAnimationEnd={() => setClickAnimation(false)}
    >
      {iconNode}
      {children}
    </button>
  );
};

export default Button;
