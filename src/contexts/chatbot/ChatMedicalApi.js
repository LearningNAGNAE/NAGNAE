import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatMedicalApiContext = createContext(null);

export const ChatMedicalProvider = ({ children }) => {
  const PythonbaseUrl = useSelector(state => state.url.PythonbaseUrl);

  const MedicalChatBotData = async (data) => {
    try {
      console.log('Sending request with data:', data);
      const response = await axios.post(`${PythonbaseUrl}/medical`, data);
      console.log('Received response:', response.data);
      return response.data;
    } catch (error) {
      // 에러 처리 로직
      console.error('Error:', error);
      throw error;
    }
  };

  const describeImage = async (imageFile) => {
    try {
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
      return response.data;
    } catch (error) {
      console.error('Error describing image:', error);
      throw error;
    }
  };

  const value = { MedicalChatBotData, describeImage };

  return (
    <ChatMedicalApiContext.Provider value={value}>
      {children}
    </ChatMedicalApiContext.Provider>
  );
};

export const useChatMedicalApi = () => {
  const context = useContext(ChatMedicalApiContext);
  if (context === null) {
    throw new Error('useChatMedicalApi must be used within a ChatMedicalProvider');
  }
  return context;
};