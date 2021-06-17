import { useCallback } from 'react';
import { useSnackbar, OptionsObject } from 'notistack';

const commonOptions: OptionsObject = {
  anchorOrigin: { horizontal: 'right', vertical: 'top' },
  autoHideDuration: 3000,
};

const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();

  const success = useCallback((message: string) => {
    enqueueSnackbar(message, {
      variant: 'success',
      ...commonOptions,
    });
  }, []);

  const error = useCallback((message?: string) => {
    enqueueSnackbar(message || 'Något gick fel', {
      variant: 'error',
      ...commonOptions,
    });
  }, []);

  return {
    success,
    error,
  };
};

export default useNotify;
