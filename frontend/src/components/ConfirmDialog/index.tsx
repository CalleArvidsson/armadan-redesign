import { FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';

interface Props {
  open?: boolean;
  title?: string;
  description?: string;
  onCancel(): void;
  onConfirm(): void;
}

const ConfirmDialog: FC<Props> = ({
  open = false,
  title = 'Bekräfta',
  description = 'Är du säker?',
  onCancel,
  onConfirm,
}) => (
  <Dialog open={open} aria-labelledby="confirm-dialog-title" onClose={onCancel} fullWidth maxWidth="xs">
    <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary" aria-label="dialog-cancel">
        Avbryt
      </Button>
      <Button onClick={onConfirm} color="primary" aria-label="dialog-confirm">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
