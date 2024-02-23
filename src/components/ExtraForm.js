import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import { Link as RouterLink, MemoryRouter } from 'react-router-dom';

export default function ExtraForm(props) {
  const {formik} = props
  console.log('starting ExtraForm')
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
            <Typography >Personal</Typography>
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              fullWidth
              id="personal_price"
              name="personal_price"
              label="personal price"
              value={formik.values.personal_price}
              onChange={formik.handleChange}
              error={formik.touched.personal_price && Boolean(formik.errors.personal_price)}
              helperText={formik.touched.personal_price && formik.errors.personal_price}
            />
            <Typography>Medium</Typography>
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              fullWidth
              id="medium_price"
              name="medium_price"
              label="medium price"
              value={formik.values.medium_price}
              onChange={formik.handleChange}
              error={formik.touched.medium_price && Boolean(formik.errors.medium_price)}
              helperText={formik.touched.medium_price && formik.errors.medium_price}
            />
            <Typography>Large</Typography>
            <TextField
              inputProps={{ type: 'number'}}
              margin="normal"
              fullWidth
              id="large_price"
              name="large_price"
              label="large price"
              value={formik.values.large_price}
              onChange={formik.handleChange}
              error={formik.touched.large_price && Boolean(formik.errors.large_price)}
              helperText={formik.touched.large_price && formik.errors.large_price}
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
              <input hidden id="file" name="file" type="file" accept="image/*" onChange={(event) => {
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