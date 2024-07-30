import React, { createContext } from 'react';
import axios from 'axios';

export const ChatStudyApi = createContext();

export const ChatStudyProvider = ({ children }) => {

    const StudyChatBotData = async (text) => {
        try {
          console.log('Sending request with data:', text);
          const StudyChatbotResponse = await axios.post('http://localhost:8000/study', 
            text,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('Received response:', StudyChatbotResponse.data);
          return StudyChatbotResponse.data;
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

  return (
    <ChatStudyApi.Provider value={{ StudyChatBotData }}>
        {children}
    </ChatStudyApi.Provider>
  );
  
};