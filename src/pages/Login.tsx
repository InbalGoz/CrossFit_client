import React , { useState , useEffect} from 'react';
import {Button , TextField , Grid , Box , Typography , Container} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TopBar from '../components/TopBar';
import { Link as ToLink } from 'react-router-dom';

const theme = createTheme();

const Login = () => {
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });
    
  const { email, password } = formData;
    
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  };

  useEffect(()=>{
    console.log("form",formData)
  },[formData])
    
     /* const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
    
        //login(email, password);
        
      };*/

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
             <ToLink to='/home' style={{ textDecoration: 'none' , color:'white'}}> Login </ToLink> 
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                <ToLink to='/register' style={{ textDecoration: 'none' , color:'blue'}}> {"Don't have an account? Sign Up"}</ToLink>
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

export default Login;

