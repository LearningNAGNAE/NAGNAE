import { useState, useEffect, useRef, useCallback } from 'react';
import { useImageStudyApi } from '../../contexts/study/ImageStudyApi';
import axios from 'axios';

export const useImageStudy = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [userSentence, setUserSentence] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);
  const chunksRef = useRef([]);
  const cancelTokenSourceRef = useRef(null);

  const { 
    fetchCategories, 
    fetchRandomImage, 
    sendAudioAndImageForAnalysis,
    textToSpeech 
  } = useImageStudyApi();

  useEffect(() => {
    fetchCategories().then(setCategories);
    return () => {
      cancelOngoingRequest();
    };
  }, [fetchCategories]);

  const cancelOngoingRequest = useCallback(() => {
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel('Operation cancelled by user');
      cancelTokenSourceRef.current = null;
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    if (selectedCategory) {
      fetchRandomImage(selectedCategory).then((image) => {
        setCurrentImage(image);
        setImageUrl(image.url);
        setShowImage(true);
        setShowAnalysis(false);
        setAudioURL('');
        setAudioBlob(null);
      });
    }
  }, [selectedCategory, fetchRandomImage]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setAudioBlob(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      chunksRef.current = [];
    } catch (error) {
      console.error('Microphone access error', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  }, []);

  const restartRecording = useCallback(() => {
    setAudioURL('');
    setAudioBlob(null);
    startRecording();
    cancelOngoingRequest();
  }, [startRecording, cancelOngoingRequest]);

  const handleSend = useCallback(async () => {
    if (audioBlob && currentImage) {
      setIsLoading(true);
      cancelOngoingRequest();
      cancelTokenSourceRef.current = axios.CancelToken.source();

      try {
        const result = await sendAudioAndImageForAnalysis(audioBlob, currentImage, cancelTokenSourceRef.current.token);
        setUserSentence(result.transcription);
        setAnalysisResult(result.analysis);
        setRecommendation(result.recommend || '');
        setShowAnalysis(true);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
        } else {
          console.error('Audio and image processing errors:', error);
          alert('Please record within 15 seconds');
        }
      } finally {
        setIsLoading(false);
        cancelTokenSourceRef.current = null;
      }
    } else {
      alert('There is no recorded audio or selected image.');
    }
  }, [audioBlob, currentImage, sendAudioAndImageForAnalysis, cancelOngoingRequest]);

  const handleTextToSpeech = useCallback(async (text) => {
    if (isPlaying || !text) return;

    setIsPlaying(true);
    try {
      const audioBlob = await textToSpeech(text);
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.onended = () => setIsPlaying(false);
      audio.play();
    } catch (error) {
      console.error('Text to speech error:', error);
      setIsPlaying(false);
    }
  }, [isPlaying, textToSpeech]);

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    showImage,
    imageUrl,
    currentImage,
    showAnalysis,
    isPlaying,
    analysisResult,
    isLoading,
    userSentence,
    audioURL,
    isRecording,
    recommendation,
    handleRefresh,
    handleSend,
    handleTextToSpeech,
    startRecording,
    stopRecording,
    restartRecording,
  };
};