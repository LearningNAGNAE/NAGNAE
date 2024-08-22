import React, { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatAcademicApiContext = createContext(null);

export const ChatAcademicProvider = ({ children }) => {
  const PythonbaseUrl = useSelector(state => state.url.PythonbaseUrl);

  const api = useMemo(() => {
    if (!PythonbaseUrl) {
      console.error('PythonbaseUrl is not available');
      return null;
    }

    return {
      AcademicChatBotData: async (data) => {
        try {
          console.log("Sending data to backend:", data);
          const response = await axios.post(`${PythonbaseUrl}/academic`, data);
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
    <ChatAcademicApiContext.Provider value={api}>
      {children}
    </ChatAcademicApiContext.Provider>
  );
};

export const useChatAcademicApi = () => {
  const context = useContext(ChatAcademicApiContext);
  if (context === null) {
    throw new Error("useChatAcademicApi must be used within a ChatAcademicProvider");
  }
  return context;
};