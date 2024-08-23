import React from 'react';
import { useImageStudy } from '../../hooks/study/useImageStudy';
import { ImageStudyProvider } from '../../contexts/study/ImageStudyApi';
import '../../assets/styles/study/ImageStudy.scss';
import sendIcon from '../../assets/images/send.png';

function ImageStudyInner() {
  const {
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
  } = useImageStudy();

  return (
    <div className="image-study">
      <h1>Learning Korean to Image</h1>
      <h2>Look at the image and say the correct sentence!</h2>
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

      {showImage && imageUrl && (
        <>
          <div className="image-display">
            <img src={imageUrl} alt="Samples of selected categories" />
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

      {showAnalysis && !isLoading && (
        <>
          <div className="user-input-section">
            <p>Your sentence:</p>
            <p className="user-sentence">{userSentence}</p>
          </div>

          <div className="sentence-analysis">
            <h2>Analysis:</h2>
            <div dangerouslySetInnerHTML={{ __html: analysisResult ? analysisResult.replace(/\n/g, '<br>') : '분석 결과가 없습니다' }} />
          </div>

          <div className="nagnae-recommendation">
            <h2>
              Recommendation by 'NAGNAE':
              <button 
                className="audio-button" 
                onClick={() => handleTextToSpeech(recommendation)}
                disabled={isPlaying}
              >
                🔊
              </button>
            </h2>
            <p>{recommendation || '추천 사항이 없습니다'}</p>
          </div>
        </>
      )}
    </div>
  );
}

function ImageStudy() {
  return (
    <ImageStudyProvider>
      <ImageStudyInner />
    </ImageStudyProvider>
  );
}

export default ImageStudy;