import { ReactNode, forwardRef, ChangeEventHandler } from 'react';
import classNames from 'classnames';
import useFocus from '#/hooks/useFocus';
import styles from './input.scss';

export interface Props {
  id: string;
  name: string;
  placeholder: string;
  prefix?: ReactNode;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'default' | 'small' | 'large';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      name,
      placeholder,
      type = 'text',
      disabled = false,
      size = 'default',
      prefix,
      required = false,
      onChange,
      value,
    },
    ref
  ) => {
    const { focused, onFocus, onBlur } = useFocus();
    const needsWrapper = !!prefix;
    const wrapperClasses = classNames(styles.wrapper, {
      [styles[size]]: size !== 'default',
      [styles.focused]: focused,
      [styles.disabled]: disabled,
    });
    const classes = classNames(styles.input, {
      [styles[size]]: size !== 'default',
      [styles.focused]: focused,
      [styles.disabled]: disabled,
    });
    const baseInputProps = {
      autoComplete: 'off',
      className: classes,
      type,
      required,
      disabled,
      id,
      name,
      placeholder,
      value,
    };

    if (needsWrapper) {
      return (
        <span className={wrapperClasses}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <input {...baseInputProps} ref={ref} onFocus={onFocus} onBlur={onBlur} onChange={(e) => onChange?.(e)} />
        </span>
      );
    }

    return <input {...baseInputProps} ref={ref} onChange={(e) => onChange?.(e)} />;
  }
);

export default Input;
