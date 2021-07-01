import { useCallback } from 'react';
import useToggle from './useToggle';

const useFocus = () => {
  const [focused, toggle] = useToggle(false);
  const onFocus = useCallback(() => {
    toggle(true);
  }, []);
  const onBlur = useCallback(() => {
    toggle(false);
  }, []);

  return {
    focused,
    onFocus,
    onBlur,
  };
};

export default useFocus;
