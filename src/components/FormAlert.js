import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const FormAlert = (props) => {
    const vertical = props.AlertState.vertical
    const horizontal= props.AlertState.horizontal
    return (
        <>
        {props.AlertState.open ? 
				<Stack spacing={2} sx={{ width: '100%' }}>
				<Snackbar 
					anchorOrigin={{ vertical, horizontal }}
					open={props.AlertState.open} 
					autoHideDuration={6000} 
					onClose={props.handleClose}
					key={vertical + horizontal}
				>
				<Alert 
					variant="filled" 
					severity={props.AlertState.type} 
					onClose={props.handleClose}
					sx={{ width: '100%' }}
				>
					{props.AlertState.content}
				</Alert>
				</Snackbar>
				</Stack>
			:
				<></> 
			}
        </>
        
    );
};

export default FormAlert;