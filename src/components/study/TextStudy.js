import React, { useState } from 'react';
import sendIcon from '../../assets/images/send.png';
import '../../assets/styles/study/TextStudy.scss';

const TextStudy = () => {
  const [sentence, setSentence] = useState('우리는 새로운 고객과 계약을 체결했습니다.');
  const [userSentence, setUserSentence] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSentence, setShowSentence] = useState(false);
  const [showUserInput, setShowUserInput] = useState(false);

  const categories = [
    'an office/company',
    'Shopping',
    'a restaurant/cafe',
    'banking/finance',
    'an emergency situation'
  ];

  const handleRefresh = () => {
    if (selectedCategory) {
      setShowSentence(true);
    }
  };

  const handleSend = () => {
    setShowUserInput(true);
  };

  return (
    <div className="text-study">
      <h1>Learning Korean to Text</h1>
      
      <div className="category-selector">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Please choose a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <button className="refresh-button" onClick={handleRefresh}>
          <img src={sendIcon} alt="Send" className="window-send-icon" />
        </button>
      </div>

      {showSentence && (
        <>
          <div className="sentence-display">
            <p>{sentence}</p>
            <p>(We signed a contract with a new client.)</p>
            <button className="audio-button">🔊</button>
          </div>

          <div className="action-buttons">
            <button className="record-button">
              <span className="record-icon">🎙️</span>
              Record
            </button>
            <button className="send-button" onClick={handleSend}>
              <img src={sendIcon} alt="Send" className="send-icon" />
            </button>
          </div>

          {showUserInput && (
            <div className="user-input-section">
              <p>Your Sentence:</p>
              <input 
                type="text" 
                value={userSentence} 
                onChange={(e) => setUserSentence(e.target.value)}
                placeholder="우리는 새로운 고객과 계약을 체결했습니다."
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TextStudy;