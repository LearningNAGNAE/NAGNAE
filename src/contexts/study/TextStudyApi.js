import React, { createContext, useContext } from 'react';
import axios from 'axios';
import store from '../../redux/Store';

const TextStudyApiContext = createContext(null);

export const TextStudyProvider = ({ children }) => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;
  const PythonbaseUrl = store.getState().url.PythonbaseUrl;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${SpringbaseUrl}/study/category`);
      if (response.data.code === "200") {
        return response.data.data.studyCategoryList;
      }
      throw new Error('Failed to fetch categories');
    } catch (error) {
      console.error('Error retrieving category:', error);
      return [];
    }
  };

  const fetchSentence = async (category) => {
    try {
      const response = await axios.get(`${SpringbaseUrl}/study/text/${category}`);
      if (response.data.code === "200") {
        const sentences = response.data.data.studyTextList;
        return sentences[Math.floor(Math.random() * sentences.length)].text;
      }
      throw new Error('Failed to fetch sentence');
    } catch (error) {
      console.error('Error retrieving text:', error);
      return '';
    }
  };

  const sendAudioForAnalysis = async (audioBlob, cancelToken) => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');
      
      const response = await axios.post(`${PythonbaseUrl}/study-text-analysis`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        cancelToken: cancelToken
      });

      if (response.data) {
        return response.data;
      }
      throw new Error('No data received from analysis');
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error analyzing audio:', error);
      }
      throw error;
    }
  };

  const textToSpeech = async (text) => {
    try {
      const response = await axios.post(
        `${PythonbaseUrl}/text-to-speech`,
        { text },
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Text to speech error:', error);
      throw error;
    }
  };

  const value = {
    fetchCategories,
    fetchSentence,
    sendAudioForAnalysis,
    textToSpeech
  };

  return (
    <TextStudyApiContext.Provider value={value}>
      {children}
    </TextStudyApiContext.Provider>
  );
};

export const useTextStudyApi = () => {
  const context = useContext(TextStudyApiContext);
  if (context === null) {
    throw new Error('useTextStudyApi must be used within a TextStudyProvider');
  }
  return context;
};