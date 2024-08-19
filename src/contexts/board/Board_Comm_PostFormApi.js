import React, { createContext, useContext, useCallback } from 'react';
import axios from 'axios';
import store from '../../redux/Store';

const PostFormAPIContext = createContext();

export const usePostFormAPI = () => {
  return useContext(PostFormAPIContext);
};

export const PostFormAPIProvider = ({ children }) => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;

  const submitPost = useCallback(async (title, htmlContent, userData) => {
    if (!userData || !userData.apiData) {
      throw new Error('User data is not available');
    }
  
    try {
      const response = await axios.post(`${SpringbaseUrl}/board/freeboardwrite`, {
        title,
        content: htmlContent,
        insertuserno: userData.apiData.userno,
        modifyuserno: userData.apiData.userno,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }, [SpringbaseUrl]);

  return (
    <PostFormAPIContext.Provider value={{ submitPost }}>
      {children}
    </PostFormAPIContext.Provider>
  );
};
