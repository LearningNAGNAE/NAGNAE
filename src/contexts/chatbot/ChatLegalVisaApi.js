import React, { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatLegalVisaApiContext = createContext(null);

export const ChatLegalVisaProvider = ({ children }) => {
  const PythonbaseUrl = useSelector(state => state.url.PythonbaseUrl);

  const api = useMemo(() => {
    if (!PythonbaseUrl) {
      console.error('PythonbaseUrl is not available');
      return null;
    }

    return {
      LegalVisaChatBotData: async (data) => {
        try {
          console.log("Sending data to backend:", data);
          const response = await axios.post(`${PythonbaseUrl}/law`, data);
          return response.data;
        } catch (error) {
          console.error("Error:", error);
          if (error.response) {
            console.error("Response data:", error.response.data);
          }
          throw error;
        }
      },
    };
  }, [PythonbaseUrl]);

  return (
    <ChatLegalVisaApiContext.Provider value={api}>
      {children}
    </ChatLegalVisaApiContext.Provider>
  );
};

export const useChatLegalVisaApi = () => {
  const context = useContext(ChatLegalVisaApiContext);
  if (context === null) {
    throw new Error("useChatLegalVisaApi must be used within a ChatLegalVisaProvider");
  }
  return context;
};