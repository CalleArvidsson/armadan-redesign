import { FC, useState, useCallback, createContext } from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import useToggle from 'hooks/useToggle';

interface DialogOptions {
  title?: string;
  description?: string;
  onConfirm?(): void;
  onCancel?(): void;
}

interface ConfirmContextData {
  (options: DialogOptions): void;
}

const ConfirmContext = createContext<ConfirmContextData>(() => {});

const ConfirmProvider: FC = ({ children }) => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions>({});
  const [open, toggle] = useToggle(false);

  const confirm = useCallback((opts: DialogOptions) => {
    setDialogOptions(opts);
    toggle(true);
  }, []);

  const handleClose = useCallback(() => {
    toggle(false);
  }, []);

  const handleCancel = useCallback(() => {
    dialogOptions.onCancel?.();
    handleClose();
  }, [dialogOptions, handleClose]);

  const handleConfirm = useCallback(() => {
    dialogOptions.onConfirm?.();
    handleClose();
  }, [dialogOptions, handleClose]);

  return (
    <>
      <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
      <ConfirmDialog
        open={open}
        title={dialogOptions.title}
        description={dialogOptions.description}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export { ConfirmContext, ConfirmProvider };
