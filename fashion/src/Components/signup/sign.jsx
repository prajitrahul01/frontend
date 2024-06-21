
import {
    Paper,
    Typography
  } from '@mui/material';
  import './sign.css';
  import {  useState } from 'react';
import CustomButton from '../../custom-button';
import CustomTextField from '../custom-testfield/textfield';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/action/registerAction';

  const SignUp = () => {
    const dispatch = useDispatch();
  
    const [user, setUser] = useState({
      username: '',
      email: '',
      password: '',
    });
  
    const handleChange = (event) => {
      setUser({
        ...user,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        await dispatch(registerUser(user));
        alert("Successfully registered");
      } catch (error) {
        console.log(error);
        alert("Registration failed. Please try again.");
      }
    };

    return (
      <div className='space'>
        <form onSubmit={handleSubmit}>
          <Paper elevation={3} className="login-paper">
  
            <Typography variant="h5" align="center" gutterBottom className="formTitle">
              Registration
            </Typography>
            <CustomTextField onChange={handleChange} id="username" label="Username" variant="outlined" name='username' />
            <CustomTextField onChange={handleChange} id="email" label="Email" variant="outlined" name='email' />
            <CustomTextField onChange={handleChange} id="password" label="Password" variant="outlined" name='password' />
            <br /> <br />
            <CustomButton variant="contained" type='submit'>Sign In</CustomButton>
          </Paper>
        </form>
      </div>
  
    );
  }
  export default SignUp;
  
  
  