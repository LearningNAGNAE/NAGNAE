import React, { createContext } from 'react';
import axios from 'axios';

export const AuthorizationApi = createContext();

export const AuthorizationProvider = ({ children }) => {



  
    const AuthorizationData = async (UserVo) => {
        try {
          console.log('Sending request with data:', UserVo);
          const AuthorizationResponse = await axios.post('http://localhost:9000/api/nagnae/users/login', 
            UserVo,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('Received response:', AuthorizationResponse.data);
          return AuthorizationResponse.data;
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
    <AuthorizationProvider.Provider value={{ AuthorizationData }}>
        {children}
    </AuthorizationProvider.Provider>
  );
  
};