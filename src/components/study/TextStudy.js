import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sendIcon from '../../assets/images/send.png';
import '../../assets/styles/study/TextStudy.scss';
import store from '../../redux/Store';

const TextStudy = () => {

  const SpringbaseUrl = store.getState().url.SpringbaseUrl;

  const [sentence, setSentence] = useState('');
  const [userSentence, setUserSentence] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSentence, setShowSentence] = useState(false);
  const [showUserInput, setShowUserInput] = useState(false);
  const [categories, setCategories] = useState([]);

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

  const handleSend = () => {
    setShowUserInput(true);
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
            <button className="audio-button">🔊</button>
          </div>

          <div className="action-buttons">
            <button className="record-button">
              <span className="record-icon">🎙️</span>
              record
            </button>
            <button className="send-button" onClick={handleSend}>
              <img src={sendIcon} alt="send" className="send-icon" />
            </button>
          </div>
        </>
      )}

      {showUserInput && (
        <div className="user-input-section">
          <p>your sentence:</p>
          <input 
            type="text" 
            value={userSentence} 
            onChange={(e) => setUserSentence(e.target.value)}
            placeholder={sentence}
          />
        </div>
      )}
    </div>
  );
};

export default TextStudy;