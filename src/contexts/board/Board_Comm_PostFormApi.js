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
      return response.data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  }, [SpringbaseUrl]);

  const submitPost = useCallback(async (title, htmlContent, localImages, userData) => {
    if (!userData || !userData.apiData) {
      throw new Error('User data is not available');
    }
  
    try {
      const uploadPromises = localImages.map(img => handleImageUpload(img.file));
      const uploadedUrls = await Promise.all(uploadPromises);
  
      let updatedContent = htmlContent;
      localImages.forEach((img, index) => {
        updatedContent = updatedContent.replace(img.tempUrl, uploadedUrls[index] || img.tempUrl);
      });
  
      const response = await axios.post(`${SpringbaseUrl}/board/freeboardwrite`, {
        title,
        content: updatedContent,
        insertuserno: userData.apiData.userno,
        modifyuserno: userData.apiData.userno,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }, [SpringbaseUrl, handleImageUpload]);

  return (
    <PostFormAPIContext.Provider value={{ submitPost, handleImageUpload }}>
      {children}
    </PostFormAPIContext.Provider>
  );
};