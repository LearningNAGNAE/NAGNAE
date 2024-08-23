import React, { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

const ChatMedicalApiContext = createContext(null);

export const ChatMedicalProvider = ({ children }) => {
  const PythonbaseUrl = useSelector(state => state.url.PythonbaseUrl);

  const api = useMemo(() => {
    if (!PythonbaseUrl) {
      console.error('PythonbaseUrl is not available');
      return null;
    }

    return {
      MedicalChatBotData: async (data) => {
        try {
          console.log("Sending data to backend:", data);
          const response = await fetch(`${PythonbaseUrl}/medical`, {
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
      describeImage: async (imageFile) => {
        try {
          const formData = new FormData();
          formData.append('file', imageFile);
          
          const response = await fetch(`${PythonbaseUrl}/describe_image`, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return response.json();
        } catch (error) {
          console.error('Error describing image:', error);
          throw error;
        }
      },
    };
  }, [PythonbaseUrl]);

  return (
    <ChatMedicalApiContext.Provider value={api}>
      {children}
    </ChatMedicalApiContext.Provider>
  );
};

export const useChatMedicalApi = () => {
  const context = useContext(ChatMedicalApiContext);
  if (context === null) {
    throw new Error("useChatMedicalApi must be used within a ChatMedicalProvider");
  }
  return context;
};