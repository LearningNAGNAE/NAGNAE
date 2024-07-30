import { useState, useRef, useEffect } from 'react';

export const useRecorder = (onRecordingComplete) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [timeLeft, setTimeLeft] = useState(40);
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorder = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            stopRecording();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const startRecording = async () => {
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
        onRecordingComplete(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setTimeLeft(40);
      chunksRef.current = [];
    } catch (error) {
      console.error('Error accessing the microphone', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current && isPaused) {
      mediaRecorder.current.resume();
      setIsPaused(false);
    }
  };

  const restartRecording = () => {
    setAudioURL('');
    setAudioBlob(null);
    startRecording();
  };

  return {
    isRecording,
    isPaused,
    audioURL,
    timeLeft,
    audioBlob,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    restartRecording
  };
};