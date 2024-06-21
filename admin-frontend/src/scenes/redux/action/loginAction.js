import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (userData) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios.post('http://localhost:4000/api/user/login', userData)
      .then((response) => {
        console.log("Respone: ", response.data);
        localStorage.setItem('accessToken', response.data);
        dispatch(loginSuccess());
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };
};
