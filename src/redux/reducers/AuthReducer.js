import { SET_TOKEN, LOGOUT, CLEAR_TOKEN } from '../actions/AuthActions';

const initialState = {
    token: null
  };
  
  const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TOKEN:
        return { ...state, token: action.payload };
      case LOGOUT:
        return { ...state, token: null };
      case CLEAR_TOKEN:
        return { ...state, token: null };
      default:
        return state;
    }
  };
  
  export default AuthReducer;