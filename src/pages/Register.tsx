import React , { useState ,useEffect } from "react";
import { Container ,Typography,  Box, Grid, Button ,TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TopBar from '../components/TopBar';
import { Link as ToLink } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Customer } from '../models/customer';

// import axios from 'axios';

const theme = createTheme();

const Register = () => {

  //const [value, setValue] = useState<Date | null>(null);

  const initialCustomer : Customer ={
    fName: '',
    lName: '',
    email:'',
    password: '',
    phone: '',
    birthday: null,
    subStart: null,
    subEnd: null,
    isVerified: false
  }

  const [formData, setFormData] = useState(initialCustomer);


  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({ ...formData, [event.target.name]: event.currentTarget.value });
  };

  useEffect(()=>{
   console.log("form", formData)
  },[formData]);

  /*const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const target = event.target as HTMLInputElement
    const name = event.target.value;
    setFormData({ ...formData, name: name });
  }*/

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    //send data to db
  };

  const { fName, lName , email , password, phone , birthday , subStart , subEnd , isVerified } = formData;
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
                  onChange={onChange}
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
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email"
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
              
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                     label="Birth Day"
                     value={birthday}
                     onChange={(newValue) => {
                      //setValue(newValue);
                      setFormData(prevData => {
                        return{
                         ...prevData,
                         birthday:newValue
                        }
                      })

                      }}
                     renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
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

export default Register;


/*
<TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue={birthDay}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                />*/

