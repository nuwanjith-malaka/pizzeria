import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import { Link as RouterLink, MemoryRouter } from 'react-router-dom';

export default function PizzaForm(props) {
  const {formik} = props
  console.log('starting pizzaForm')
  return (
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="pk"
              name="pk"
              label="pk"
              value={formik.values.pk}
              onChange={formik.handleChange}
              error={formik.touched.pk && Boolean(formik.errors.pk)}
              helperText={formik.touched.pk && formik.errors.pk}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="sk"
              name="sk"
              label="sk"
              value={formik.values.sk}
              onChange={formik.handleChange}
              error={formik.touched.sk && Boolean(formik.errors.sk)}
              helperText={formik.touched.sk && formik.errors.sk}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              label="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              multiline
              maxRows={Infinity}
              margin="normal"
              required
              fullWidth
              id="description"
              name="description"
              label="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              required
              fullWidth
              id="starting_price"
              name="starting_price"
              label="starting price"
              value={formik.values.starting_price}
              onChange={formik.handleChange}
              error={formik.touched.starting_price && Boolean(formik.errors.starting_price)}
              helperText={formik.touched.starting_price && formik.errors.starting_price}
            />
            <Typography component="h5" variant="h5" sx={{marginBottom: 2}}>Pan</Typography>
            <Typography >Personal</Typography>
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              fullWidth
              id="pan_personal_price"
              name="pan_personal_price"
              label="pan personal price"
              value={formik.values.pan_personal_price}
              onChange={formik.handleChange}
              error={formik.touched.pan_personal_price && Boolean(formik.errors.pan_personal_price)}
              helperText={formik.touched.pan_personal_price && formik.errors.pan_personal_price}
            />
            <Typography>Medium</Typography>
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              fullWidth
              id="pan_medium_price"
              name="pan_medium_price"
              label="pan medium price"
              value={formik.values.pan_medium_price}
              onChange={formik.handleChange}
              error={formik.touched.pan_medium_price && Boolean(formik.errors.pan_medium_price)}
              helperText={formik.touched.pan_medium_price && formik.errors.pan_medium_price}
            />
            <Typography>Large</Typography>
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              fullWidth
              id="pan_large_price"
              name="pan_large_price"
              label="pan large price"
              value={formik.values.pan_large_price}
              onChange={formik.handleChange}
              error={formik.touched.pan_large_price && Boolean(formik.errors.pan_large_price)}
              helperText={formik.touched.pan_large_price && formik.errors.pan_large_price}
            />
             <Typography component="h5" variant="h5" sx={{marginBottom: 2}}>Sausage</Typography>
            <Typography>Personal</Typography>
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              fullWidth
              id="sausage_personal_price"
              name="sausage_personal_price"
              label="personal sausage price"
              value={formik.values.sausage_personal_price}
              onChange={formik.handleChange}
              error={formik.touched.sausage_personal_price && Boolean(formik.errors.sausage_personal_price)}
              helperText={formik.touched.sausage_personal_price && formik.errors.sausage_personal_price}
            />
            <Typography>Medium</Typography>
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              fullWidth
              id="sausage_medium_price"
              name="sausage_medium_price"
              label="medium sausage price"
              value={formik.values.sausage_medium_price}
              onChange={formik.handleChange}
              error={formik.touched.sausage_medium_price && Boolean(formik.errors.sausage_medium_price)}
              helperText={formik.touched.sausage_medium_price && formik.errors.sausage_medium_price}
            />
            <Typography>Large</Typography>
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              fullWidth
              id="sausage_large_price"
              name="sausage_large_price"
              label="large sausage price"
              value={formik.values.sausage_large_price}
              onChange={formik.handleChange}
              error={formik.touched.sausage_large_price && Boolean(formik.errors.sausage_large_price)}
              helperText={formik.touched.sausage_large_price && formik.errors.sausage_large_price}
            />
            <Button
              variant="contained"
              component="label"
              sx={{
                marginTop: 2,
                marginBottom:2
              }}
            >
              
              Upload Image
              <input 
                hidden 
                id="file" 
                name="file" 
                type="file" 
                accept="image/*" 
                onChange={(event) => {
                  formik.setFieldValue("file", event.target.files[0]);
                  let reader = new FileReader();
                  let file = event.target.files[0];
                  reader.onloadend = () => {
                    let myElement = document.getElementById("uploadImage");
                    myElement.src = reader.result;
                  };
                  reader.readAsDataURL(file);
                }} 
                
              />
            </Button><br/>
            <img 
              id="uploadImage" 
              src={formik.values.file ? formik.values.file: ""}
            /> 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              {props.children}
            </Button>
          </Box>
  )
}