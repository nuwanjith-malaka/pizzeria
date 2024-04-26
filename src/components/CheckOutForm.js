import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';

export default function CheckOutForm(props) {
  const {formik} = props
  console.log('starting OrderDetailsForm')
  return (
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              multiline
              maxRows={Infinity}
              margin="normal"
              required
              fullWidth
              id="delivery_address"
              name="delivery_address"
              label="delivery address"
              value={formik.values.delivery_address}
              onChange={formik.handleChange}
              error={formik.touched.delivery_address && Boolean(formik.errors.delivery_address)}
              helperText={formik.touched.delivery_address && formik.errors.delivery_address}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="delivery_date"
              name="delivery_date"
              label="delivery date"
              value={formik.values.delivery_date}
              onChange={formik.handleChange}
              error={formik.touched.delivery_date && Boolean(formik.errors.delivery_date)}
              helperText={formik.touched.delivery_date && formik.errors.delivery_date}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              name="first_name"
              label="first name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={formik.touched.first_name && Boolean(formik.errors.first_name)}
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              name="last_name"
              label="last name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={formik.touched.last_name && Boolean(formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              required
              fullWidth
              id="phone_number"
              name="phone_number"
              label="phone number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
              helperText={formik.touched.phone_number && formik.errors.phone_number}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Box display="flex" justifyContent="center" marginTop={5}>
              <Button
              component={RouterLink} 
              to={"/Pizza"} 
              variant="contained" 
              color="warning"
              sx={{marginRight:2}}
              startIcon={<ArrowBackIcon></ArrowBackIcon>}
              >
              Continue Shopping
              </Button>
              <Button 
                  type="submit"
                  variant="contained"
                  component={RouterLink} 
                  to={"/OrderSuccess"} 
              >
              Place Order
              </Button>
            </Box> 
          </Box>
  )
}