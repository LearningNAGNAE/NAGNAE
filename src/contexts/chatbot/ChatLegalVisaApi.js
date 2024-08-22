import React, { createContext, useContext, useMemo } from 'react';
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
          const response = await fetch(`${PythonbaseUrl}/law`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return response;
        } catch (error) {
          console.error("Error:", error);
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