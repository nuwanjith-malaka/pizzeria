import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props) {
    return (
      <Typography sx={{ mt: 8, mb: 4 }} variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Pizzeria
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }