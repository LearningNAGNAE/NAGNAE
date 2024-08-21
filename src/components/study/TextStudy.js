// TextStudy.js
import React from 'react';
import { useTextStudy } from '../../hooks/study/useTextStudy';
import { TextStudyProvider } from '../../contexts/study/TextStudyApi';
import '../../assets/styles/study/TextStudy.scss';
import sendIcon from '../../assets/images/send.png';

function TextStudyInner() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    sentence,
    showSentence,
    showAnalysis,
    isPlaying,
    analysisResult,
    isLoading,
    userSentence,
    audioURL,
    isRecording,
    handleRefresh,
    handleSend,
    handleTextToSpeech,
    startRecording,
    stopRecording,
    restartRecording,
  } = useTextStudy();

  return (
    <div className="text-study">
      <h1>Learning Korean to Text</h1>
      <h2>Look at the sentence and read it!</h2>
      <h2>Please record within 15 seconds!</h2>
      <br/>
      
      <div className="category-selector">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
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
                Record
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
                  Re-recording
                </button>
                <div className="audio-player-container">
                  <audio src={audioURL} controls className="audio-player" />
                </div>
                <button className="send-button" onClick={handleSend} disabled={isLoading}>
                  <img src={sendIcon} alt="send" className="window-send-icon" />
                </button>
              </div>
            )}
          </div>

          {audioURL && !showAnalysis && !isLoading && (
            <p className="instruction">Click the right arrow button to analyze your recorded voice!</p>
          )}
        </>
      )}

      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Analyzing your voice...</p>
        </div>
      )}

      {showAnalysis && analysisResult && !isLoading && (
        <>
          <div className="user-input-section">
            <p>Your sentence:</p>
            <p className="user-sentence">{userSentence}</p>
          </div>

          <div className="sentence-analysis">
            <h2>Analysis:</h2>
            <div dangerouslySetInnerHTML={{ __html: analysisResult.replace(/\n/g, '<br>') }} />
          </div>
        </>
      )}
    </div>
  );
}

function TextStudy() {
  return (
    <TextStudyProvider>
      <TextStudyInner />
    </TextStudyProvider>
  );
}

export default TextStudy;