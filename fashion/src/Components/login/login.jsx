import {
    Paper,
    Typography,
  } from '@mui/material';
import './login.css';
import CustomButton from '../../custom-button';
import CustomTextField from '../custom-testfield/textfield'; 
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loginUser } from '../redux/action/loginAction';



const LoginPage = () => {
  const dispatch = useDispatch();
  
    const [user, setUser] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (event) => {
      setUser({
        ...user,
        [event.target.name]: event.target.value,
      });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      try {
        dispatch(loginUser(user)); // Assuming loginUser returns the access token
        alert("Successfully Login");
      } catch (error) {
        console.log(error);
        alert("Login failed. Please try again.");
      }
    };
    const handleSignIn = () => {
      window.location.href = '/home'
    }
    return (
    <div className='space'>
      <form onSubmit={handleSubmit}>
      <Paper className="login-paper" >
        <Typography variant="h5" align="center" gutterBottom className="formTitle">
          Login
        </Typography>
            <CustomTextField onChange={handleChange} id="email" label="Email" variant="outlined" name="email"/>
            <CustomTextField onChange={handleChange} id="password" label="Password" variant="outlined" name="password"/>
            <br /><br/>
            <CustomButton variant="contained" type='submit' onClick={handleSignIn}  style = {{backgroundColor:'green'}}>LOG In</CustomButton>
        </Paper>
        </form>
    </div>
        
    );
 
}
export default LoginPage;


