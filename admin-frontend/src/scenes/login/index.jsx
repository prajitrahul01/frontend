import {
    Paper,
    Typography,
    useTheme,
  } from '@mui/material';
  import CustomButton from '../../components/customButton';
  import CustomTextField from '../../components/textField';
  import { useDispatch, useSelector } from 'react-redux';
  import { useState } from 'react';
  import { loginUser } from '../redux/action/loginAction';
  import axios from 'axios';
  import './index.css';
  import { tokens } from '../../theme';


  const LoginPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
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
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:4000/api/user/login', user);
          
          // Check the status code to determine success or failure
          if (response.status === 200) {
            const token = response.data; // Assuming response contains the access token
            console.log("Token tt: ", token)
            localStorage.setItem('accessToken', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the Authorization header globally
            alert("Successfully logged in");
            window.location.href = '/team';
            
          } else {
            // Handle other status codes (e.g., 401, 500)
            console.log(response.data);
            alert(`Login failed. Please try again. ${response.statusText}`);
          }
        } catch (error) {
          let errorMessage = "Error creating user. Please try again later.";
            if (error.response && error.response.data) {
                errorMessage = error.response.data;
            }
          alert(`Please try again. ${errorMessage}`);
        }
      };
  
    const handleSignIn = () => {
      window.location.href = '/team';
    };
  
    return (
      <div className='center'>
        <form onSubmit={handleSubmit}>
          <Paper className="login-paper" sx={
            {backgroundColor:`${colors.primary[400]}`, color:colors.grey[300]}
          }>
            <Typography variant="h5" align="center" gutterBottom className="formTitle">
              Login
            </Typography>
            <CustomTextField onChange={handleChange} id="email" label="Email" variant="outlined" name="email"/>
            <CustomTextField onChange={handleChange} id="password" label="Password" variant="outlined" name="password"/>
            <br /><br/>
            <CustomButton variant="contained" type='submit' style={{backgroundColor: 'green'}}>LOG In</CustomButton>
          </Paper>
        </form>
      </div>
    );
  };
  
  export default LoginPage;
  