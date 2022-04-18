import React from "react";
import  { useState } from 'react';
import { Container ,Typography,  Box, Grid, Button ,TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TopBar from '../components/TopBar';
import { Link as ToLink } from 'react-router-dom';
// import axios from 'axios';


const theme = createTheme();


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });


  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({ ...formData, [event.target.name]: event.currentTarget.value });
  }

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const target = event.target as HTMLInputElement
    const name = event.target.value;
    setFormData({ ...formData, name: name });
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    
    if (password !== password2) {
      console.log("Passwords do not match")
     // setAlert('Passwords do not match', 'danger');
    } else {
      //register({name, email, password});
      //axios
    }

  };

  const { name, email, password, password2  } = formData;
  return (
    <>
    <TopBar/>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily:'Nunito'
          }}
        >
          <Typography component="h1" variant="h3" sx={{fontFamily:'Nunito'}}>
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="fName"
                  required
                  fullWidth
                  id="fName"
                  label="First Name"
                  autoFocus
                  onChange={onNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="lName"
                  required
                  fullWidth
                  id="lName"
                  label="Last Name"
                  onChange={onNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
             <ToLink to='/home' style={{ textDecoration: 'none' , color:'white'}}>Register</ToLink>
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                <ToLink to='/login' style={{ textDecoration: 'none' , color:'blue'}}> Already have an account? Sign in</ToLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider> 
    </>
  )
}

export default Register

