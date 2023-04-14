import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export default function DeleteDialog({ open, name, handleClose, onSubmit }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to remove <span style={{color: 'red'}}>{name}</span> ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={onSubmit} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
