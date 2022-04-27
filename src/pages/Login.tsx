import React , { useState , useEffect} from 'react';
import {Button , TextField , Grid , Box , Typography , Container} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TopBar from '../components/TopBar';
import { Link as ToLink , useNavigate } from 'react-router-dom';
import {Customer} from '../models/customer';


//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logIn } from '../store/actions/authActions';

const theme = createTheme();

const Login: React.FC = () => {

  const [newCustomer , setNewCustomer ] = useState({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
 // const allCustomers = useAppSelector(state => state.customer.all_customers);
  //const oneCustomer = useAppSelector(state => state.customer.customer);
  const { customer ,isAuthenticated } = useAppSelector(state => state.customer);

  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });

  const { email, password } = formData;
   
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

   //get the user from db and check if he exist
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      //mine:get al users, loop them all, if the customer exist with the same mail, get is id and send it
      
      dispatch(logIn(formData));
      

      // if everything is good ->  go to home screen
     // navigate('/home');
    }catch(error){
      console.log("error",error)
    }

  };

  useEffect(()=>{
    console.log("form",formData)
    console.log("isAuthenticated",isAuthenticated)

    if (isAuthenticated && customer) {
      console.log("customer",customer)
      navigate(`/home/${customer.id}`)
     // navigate(`/home`)
    }

   // dispatch(reset());
  },[formData, customer,navigate,dispatch])
   
  

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
          }}
        >
          <Typography component="h1" variant="h3" sx={{fontFamily:'Nunito' }}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <ToLink to='/register' style={{ color:'blue'}}> {"Don't have an account? Sign Up"}</ToLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
    
      </Container>
    </ThemeProvider>
    </> 
  )
}

export default Login;

//<ToLink to='/register' style={{ textDecoration: 'none' , color:'blue'}}> {"Don't have an account? Sign Up"}</ToLink>
//<ToLink to='/home' style={{ textDecoration: 'none' , color:'white'}}> Login </ToLink> 
/*
 const data = new FormData(event.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    //dispatch(login(email, password)); */

