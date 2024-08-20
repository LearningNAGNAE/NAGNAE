import React, { createContext, useContext } from 'react';
import axios from 'axios';
import store from '../../redux/Store';

const ImageStudyApiContext = createContext(null);

export const ImageStudyProvider = ({ children }) => {
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

  const fetchRandomImage = async (categoryNo) => {
    try {
      const response = await axios.get(`${SpringbaseUrl}/study/image/${categoryNo}`);
      if (response.data.code === "200") {
        const images = response.data.data.studyImageList;
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const imageUrl = await importImage(randomImage.fileSaveName);
        return { ...randomImage, url: imageUrl };
      }
      throw new Error('Failed to fetch image');
    } catch (error) {
      console.error('Error retrieving image:', error);
      return null;
    }
  };

  const importImage = async (filename) => {
    try {
      const image = await import(`../../assets/images/study/${filename}`);
      return image.default;
    } catch (error) {
      console.error('Error importing image:', error);
      return null;
    }
  };

  const sendAudioAndImageForAnalysis = async (audioBlob, image, cancelToken) => {
    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'recording.webm');
    
    try {
      const imageResponse = await fetch(image.url);
      if (!imageResponse.ok) {
        throw new Error(`Failed to import image: ${imageResponse.statusText}`);
      }
      const imageBlob = await imageResponse.blob();
      formData.append('image_file', imageBlob, image.fileSaveName);

      const response = await axios.post(`${PythonbaseUrl}/study-image-analysis`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        cancelToken: cancelToken
      });
      
      if (response.data && response.data.transcription) {
        return response.data;
      }
      throw new Error('No valid data received from server');
    } catch (error) {
      console.error('Error in sendAudioAndImageForAnalysis:', error);
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
    fetchRandomImage,
    sendAudioAndImageForAnalysis,
    textToSpeech
  };

  return (
    <ImageStudyApiContext.Provider value={value}>
      {children}
    </ImageStudyApiContext.Provider>
  );
};

export const useImageStudyApi = () => {
  const context = useContext(ImageStudyApiContext);
  if (context === null) {
    throw new Error('useImageStudyApi must be used within an ImageStudyProvider');
  }
  return context;
};