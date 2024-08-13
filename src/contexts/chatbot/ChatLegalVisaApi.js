import React, { createContext, useContext } from 'react';
import axios from 'axios';
import store from '../../redux/Store';

const ChatLegalVisaApiContext = createContext(null);

export const ChatLegalVisaProvider = ({ children }) => {
  const PythonbaseUrl = store.getState().url.PythonbaseUrl;

  const LegalVisaChatBotData = async (text, sessionId) => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    try {
      console.log('Sending request with data:', { question: text, userNo: userData.apiData.user_No, categoryNo: 1, sessionId });
      const response = await axios.post(
        `${PythonbaseUrl}/law`,
        { 
          question: text, 
          userNo: userData.apiData.user_NO, 
          categoryNo: 1,
          session_id: sessionId
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Received response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      throw error;
    }
  };

  const describeImage = async (imageFile) => {
    try {
      console.log('Sending image for description:', imageFile.name, imageFile.type, imageFile.size);
      const formData = new FormData();
      formData.append('file', imageFile);
      
      const response = await axios.post(
        `${PythonbaseUrl}/describe_image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Image description response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error describing image:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      throw error;
    }
  };

  const value = { LegalVisaChatBotData, describeImage, PythonbaseUrl };

  return (
    <ChatLegalVisaApiContext.Provider value={value}>
      {children}
    </ChatLegalVisaApiContext.Provider>
  );
};

export const useChatLegalVisaApi = () => {
  const context = useContext(ChatLegalVisaApiContext);
  if (context === null) {
    throw new Error('useChatLegalVisaApi must be used within a ChatLegalVisaProvider');
  }
  return context;
};