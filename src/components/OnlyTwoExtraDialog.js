import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import { useContext } from 'react'
import { Context } from '../Context'

  
export default function OnlyTwoExtraDialog() {

    const { State, setState } = useContext(Context)

    const handleClickOpen = () => {
      setState({...State, DialogOpen:true});
    };

    const handleClose = () => {
      setState({...State, DialogOpen:false});
    };

    return (
      <React.Fragment>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={State.DialogOpen}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              Sorry! Only two extras can be selected.
            </Typography>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }