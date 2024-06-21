import axios from 'axios';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const registerUser = (userData) => {
  return (dispatch) => {
    dispatch(registerRequest());

    axios.post('http://localhost:4000/api/user/registration', userData)
      .then((response) => {
        dispatch(registerSuccess());
      })
      .catch((error) => {
        dispatch(registerFailure(error.message));
      });
  };
};
