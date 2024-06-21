import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../action/registerAction";

const initialState = {
  loading: false,
  error: null,
  user: {}
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registrationReducer;
