import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from '@mui/material';
import { useEffect, useState } from 'react';

const useConfirm = (title, message) => {

    const [promise, setPromise] = useState(null); // promise == null

    const confirm = () => new Promise( (resolve, reject) => {
        setPromise({ resolve });  // promise == Promise .La variable de estado promise se setea como Promise y permite ver el componente <Dialog/>
    });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true); // promise ejecuta el metodo resolve y devuelve true.
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    useEffect(()=>{
        console.log("promesa ",promise);
    }, [promise]);

    // You could replace the Dialog with your library's version
    const ConfirmationDialog = () => (
        <Dialog  open={promise !== null} fullWidth >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm}>Yes</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
    return [ConfirmationDialog, confirm];
};

export default useConfirm;