import { createSlice } from '@reduxjs/toolkit';

const urlSlice = createSlice({
  name: 'url',
  initialState: {
    // 스프링 url
    SpringbaseUrl: 'http://3.34.127.243',
    // SpringbaseUrl: 'http://localhost:9000',

    // 파이썬 url
    PythonbaseUrl: 'http://localhost:8000',
  },
  reducers: {
    setSpringBaseUrl: (state, action) => {
      state.SpringbaseUrl = action.payload;
    },
    setPythonBaseUrl: (state, action) => {
      state.PythonbaseUrl = action.payload;
    }
  }
});

export const { setSpringBaseUrl, setPythonBaseUrl } = urlSlice.actions;
export default urlSlice.reducer;