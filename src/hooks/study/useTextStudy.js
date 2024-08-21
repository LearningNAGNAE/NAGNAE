import { useState, useEffect, useRef, useCallback } from 'react';
import { useTextStudyApi } from '../../contexts/study/TextStudyApi';
import axios from 'axios';

export const useTextStudy = () => {
  const [sentence, setSentence] = useState('');
  const [userSentence, setUserSentence] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSentence, setShowSentence] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);
  const chunksRef = useRef([]);
  const cancelTokenSourceRef = useRef(null);

  const { fetchCategories, fetchSentence, sendAudioForAnalysis, textToSpeech } = useTextStudyApi();

  useEffect(() => {
    fetchCategories().then(setCategories);
    return () => {
      if (cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel('Component is unmounted');
      }
    };
  }, [fetchCategories]);

  const handleRefresh = useCallback(() => {
    if (selectedCategory) {
      fetchSentence(selectedCategory).then(setSentence);
      setShowSentence(true);
      setShowAnalysis(false);
      setAudioURL('');
      setAudioBlob(null);
      cancelOngoingRequest();
    }
  }, [selectedCategory, fetchSentence]);

  const cancelOngoingRequest = useCallback(() => {
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel('Operation cancelled by user');
      cancelTokenSourceRef.current = null;
      setIsLoading(false);
    }
  }, []);

  const handleSend = useCallback(async () => {
    if (audioBlob) {
      try {
        setIsLoading(true);
        cancelOngoingRequest();
        cancelTokenSourceRef.current = axios.CancelToken.source();
        
        const response = await sendAudioForAnalysis(audioBlob, cancelTokenSourceRef.current.token);
        
        if (response && response.transcription) {
          setUserSentence(response.transcription);
          setAnalysisResult(response.analysis);
          setShowAnalysis(true);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
        } else {
          console.error('오디오 처리 오류', error);
          alert('Please record within 15 seconds');
        }
      } finally {
        setIsLoading(false);
        cancelTokenSourceRef.current = null;
      }
    } else {
      alert('There is no recorded audio.');
    }
  }, [audioBlob, sendAudioForAnalysis, cancelOngoingRequest]);

  const handleTextToSpeech = useCallback(async () => {
    if (isPlaying || !sentence) return;

    setIsPlaying(true);
    try {
      const audioBlob = await textToSpeech(sentence);
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.onended = () => setIsPlaying(false);
      audio.play();
    } catch (error) {
      console.error('Text to speech error:', error);
      setIsPlaying(false);
    }
  }, [isPlaying, sentence, textToSpeech]);

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

  return {
    sentence,
    userSentence,
    selectedCategory,
    setSelectedCategory,
    showSentence,
    showAnalysis,
    categories,
    isPlaying,
    analysisResult,
    isLoading,
    isRecording,
    audioURL,
    audioBlob,
    handleRefresh,
    handleSend,
    handleTextToSpeech,
    startRecording,
    stopRecording,
    restartRecording,
  };
};