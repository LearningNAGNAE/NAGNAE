import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import sendIcon from '../../assets/images/send.png';
import '../../assets/styles/study/TextStudy.scss';
import store from '../../redux/Store';

const TextStudy = () => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;
  const PythonbaseUrl = store.getState().url.PythonbaseUrl;
  const [sentence, setSentence] = useState('');
  const [userSentence, setUserSentence] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSentence, setShowSentence] = useState(false);
  const [showUserInput, setShowUserInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // 녹음 관련 상태
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${SpringbaseUrl}/study/category`);
      if (response.data.code === "200") {
        setCategories(response.data.data.studyCategoryList);
      }
    } catch (error) {
      console.error('Error retrieving category:', error);
    }
  };

  const fetchSentence = async () => {
    if (!selectedCategory) return;

    try {
      const response = await axios.get(`${SpringbaseUrl}/study/text/${selectedCategory}`);
      if (response.data.code === "200") {
        const sentences = response.data.data.studyTextList;
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
        setSentence(randomSentence.text);
      }
    } catch (error) {
      console.error('Error retrieving sentence:', error);
    }
  };

  const handleRefresh = () => {
    if (selectedCategory) {
      fetchSentence();
      setShowSentence(true);
      setShowUserInput(false);
    }
  };

  const handleSend = async () => {
    if (audioBlob) {
      try {
        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.webm');
        
        const response = await axios.post(`${PythonbaseUrl}/speech-to-text`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        console.log('API Response:', response.data);
        
        if (response.data && response.data.transcription) {
          setUserSentence(response.data.transcription);
          setShowUserInput(true);
        }
      } catch (error) {
        console.error('Error processing audio', error);
        alert('오디오 처리 중 오류가 발생했습니다.');
      }
    } else {
      alert('녹음된 오디오가 없습니다.');
    }
  };

  const handleTextToSpeech = async () => {
    if (isPlaying || !sentence) return;

    setIsPlaying(true);
    try {
      const response = await axios.post(
        `${PythonbaseUrl}/text-to-speech`,
        { text: sentence },
        { responseType: 'blob' }
      );

      const audio = new Audio(URL.createObjectURL(response.data));
      audio.onended = () => setIsPlaying(false);
      audio.play();
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      setIsPlaying(false);
    }
  };

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
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      chunksRef.current = [];
    } catch (error) {
      console.error('Error accessing the microphone', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const restartRecording = () => {
    setAudioURL('');
    setAudioBlob(null);
    startRecording();
  };

  return (
    <div className="text-study">
      <h1>Learning Korean to Text</h1>
      <h2>Look at the sentences and read them!</h2>
      <br/>
      
      <div className="category-selector">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Please choose a category</option>
          {categories.map((category) => (
            <option key={category.categoryNo} value={category.categoryNo}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <button className="refresh-button" onClick={handleRefresh}>
          <img src={sendIcon} alt="send" className="window-send-icon" />
        </button>
      </div>

      {showSentence && (
        <>
          <div className="sentence-display">
            <p>{sentence}</p>
            <button className="audio-button" onClick={handleTextToSpeech} disabled={isPlaying}>
              🔊
            </button>
          </div>

          <div className="action-buttons">
            {!isRecording && !audioURL ? (
              <button className="record-button" onClick={startRecording}>
                <svg viewBox="0 0 24 24" className="icon">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
                Recording
              </button>
            ) : isRecording ? (
              <button className="record-button recording" onClick={stopRecording}>
                <svg viewBox="0 0 24 24" className="icon">
                  <path d="M6 6h12v12H6z"/>
                </svg>
                Stop
              </button>
            ) : (
              <div className="recording-controls">
                <button className="restart-button" onClick={restartRecording}>
                  <svg viewBox="0 0 24 24" className="icon">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                  Re-Recording
                </button>
                <div className="audio-player-container">
                  <audio src={audioURL} controls className="audio-player" />
                </div>
                <button className="send-button" onClick={handleSend}>
                  <img src={sendIcon} alt="send" className="window-send-icon" />
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {showUserInput && (
        <div className="user-input-section">
          <p>Your sentence:</p>
          <p className="user-sentence">{userSentence}</p>
        </div>
      )}
    </div>
  );
};

export default TextStudy;