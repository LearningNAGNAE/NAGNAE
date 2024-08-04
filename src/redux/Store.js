import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthReducer';

// sessionStorage에서 토큰을 불러옴
const persistedToken = sessionStorage.getItem('token');

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState: {
    auth: { token: persistedToken }
  }
});

export default store;