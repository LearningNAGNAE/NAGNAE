export const SET_TOKEN = 'SET_TOKEN';
export const LOGOUT = 'LOGOUT';
export const CLEAR_TOKEN  = 'CLEAR_TOKEN ';

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token
});

export const logout = () => {
  sessionStorage.removeItem('token');// sessionStorage에서 토큰 제거
  return { type: LOGOUT };
};

export const clearToken = () => ({
  type: CLEAR_TOKEN
});