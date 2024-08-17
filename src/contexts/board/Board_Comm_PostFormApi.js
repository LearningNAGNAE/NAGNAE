import React, { createContext, useContext, useCallback } from 'react';
import axios from 'axios';
import store from '../../redux/Store';

const PostFormAPIContext = createContext();

export const usePostFormAPI = () => {
  return useContext(PostFormAPIContext);
};

export const PostFormAPIProvider = ({ children }) => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;

  const handleImageUpload = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(`${SpringbaseUrl}/upload-image`, formData);
      return response.data.url; // 업로드된 이미지의 URL 반환
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  }, [SpringbaseUrl]);

  const submitPost = useCallback(async (title, htmlContent, userData) => {
    try {
      const response = await axios.post(`${SpringbaseUrl}/board/freeboardwrite`, {
        title,
        content: htmlContent, // HTML 내용을 그대로 전송
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
    <PostFormAPIContext.Provider value={{ handleImageUpload, submitPost }}>
      {children}
    </PostFormAPIContext.Provider>
  );
};
