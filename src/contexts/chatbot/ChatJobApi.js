import React, { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatJobApiContext = createContext(null);

export const ChatJobProvider = ({ children }) => {
  const PythonbaseUrl = useSelector(state => state.url.PythonbaseUrl);

  const api = useMemo(() => {
    if (!PythonbaseUrl) {
      console.error('PythonbaseUrl is not available');
      return null;
    }

    return {
      JobChatBotData: async (data) => {
        console.log(data, "fdsfsdfd");
        try {
          console.log("Sending data to backend:", data);
          const response = await axios.post(`${PythonbaseUrl}/search_jobs`, data,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
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
    <ChatJobApiContext.Provider value={api}>
      {children}
    </ChatJobApiContext.Provider>
  );
};

export const useChatJobApi = () => {
  const context = useContext(ChatJobApiContext);
  if (context === null) {
    throw new Error("useChatJobApi must be used within a ChatJobProvider");
  }
  return context;
};