import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sendIcon from '../../assets/images/send.png';
import '../../assets/styles/study/ImageStudy.scss';
import store from '../../redux/Store';

const ImageStudy = () => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [userSentence, setUserSentence] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentImage) {
      importImage(currentImage.fileSaveName);
    }
  }, [currentImage]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${SpringbaseUrl}/study/category`);
      if (response.data.code === "200") {
        setCategories(response.data.data.studyCategoryList);
      }
    } catch (error) {
      console.error('카테고리를 가져오는 중 오류 발생:', error);
    }
  };

  const fetchRandomImage = async (categoryNo) => {
    try {
      const response = await axios.get(`${SpringbaseUrl}/study/image/${categoryNo}`);
      if (response.data.code === "200") {
        const images = response.data.data.studyImageList;
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setCurrentImage(randomImage);
        setShowImage(true);
      }
    } catch (error) {
      console.error('이미지를 가져오는 중 오류 발생:', error);
    }
  };

  const importImage = async (filename) => {
    try {
      const image = await import(`../../assets/images/study/${filename}`);
      setImageUrl(image.default);
    } catch (error) {
      console.error('이미지를 불러오는 중 오류 발생:', error);
      setImageUrl(null);
    }
  };

  const handleRefresh = () => {
    if (selectedCategory) {
      fetchRandomImage(selectedCategory);
      setShowAnalysis(false);
    }
  };

  const handleSend = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="image-study">
      <h1>이미지로 한국어 학습하기</h1>
      <h2>이미지를 보고 알맞은 문장을 말해보세요!</h2>
      <br/>
      
      <div className="category-selector">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">카테고리를 선택해주세요</option>
          {categories.map((category) => (
            <option key={category.categoryNo} value={category.categoryNo}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <button className="refresh-button" onClick={handleRefresh}>
          <img src={sendIcon} alt="새로고침" className="window-send-icon" />
        </button>
      </div>

      {showImage && imageUrl && (
        <>
          <div className="image-display">
            <img 
              src={imageUrl} 
              alt="선택된 카테고리의 샘플" 
            />
          </div>

          <div className="action-buttons">
            <button className="record-button">
              <span className="record-icon">🎙️</span>
              녹음
            </button>
            <button className="send-button" onClick={handleSend}>
              <img src={sendIcon} alt="전송" className="send-icon" />
            </button>
          </div>
        </>
      )}

      {showAnalysis && (
        <>
          <div className="user-input-section">
            <p>입력한 문장:</p>
            <input 
              type="text" 
              value={userSentence} 
              onChange={(e) => setUserSentence(e.target.value)}
              placeholder="이미지에 대한 설명을 입력하세요."
            />
          </div>

          <div className="action-buttons">
            <button className="record-button">
              <span className="record-icon">🎙️</span>
              녹음
            </button>
            <button className="send-button" onClick={handleSend}>
              <img src={sendIcon} alt="전송" className="send-icon" />
            </button>
          </div>
        </>
      )}

      {showAnalysis && (
        <>
          <div className="user-input-section">
            <p>Your Sentence:</p>
            <input 
              type="text" 
              value={userSentence} 
              onChange={(e) => setUserSentence(e.target.value)}
              placeholder="이미지에 대한 설명을 입력하세요."
            />
          </div>

          <div className="sentence-analysis">
            <h2>Sentence Analysis:</h2>
            <p>여성 직원이 회의실에서 동료들 앞에서 차트를 이용해 프레젠테이션을 하고 있습니다.</p>
            <ol>
              <li>Evaluation: The description is accurate and concise, capturing the main elements of the image. It effectively conveys the setting (회의실 - meeting room), the main action (프레젠테이션 - presentation), and the use of visual aids (차트 - chart).</li>
              <li>Sentence structure and coherence: The sentence structure is good, following a logical order. However, it could be improved slightly for better flow and more detailed information. Here are some suggestions:
                <ul>
                  <li>Consider mentioning the number of colleagues present.</li>
                  <li>You could specify the type of chart being used (e.g., bar graph).</li>
                  <li>The order of information could be rearranged for a more natural flow.</li>
                </ul>
              </li>
              <li>Improved version in English: "In a meeting room, a female employee is giving a presentation using a bar chart to four colleagues seated around a glass table."</li>
            </ol>
            <p>This revised version provides more specific details about the scene, including the number of colleagues and the type of chart, while maintaining a concise structure. The order of information now follows a more natural progression from setting to action to details.</p>
            <p>Overall, the original Korean description was effective, and these suggestions aim to enhance its clarity and informativeness.</p>
          </div>

          <div className="nagnae-recommendation">
            <div className="recommendation-header">
              <h2>NAGNAE's recommendation</h2>
              <button className="audio-button">🔊</button>
            </div>
            <ol>
              <li>회의실 창문을 통해 밝은 자연광이 들어와 전문적이고 개방적인 분위기를 조성하고 있습니다.</li>
              <li>참석자들은 다양한 연령대로 구성되어 있으며, 모두 정장 차림으로 비즈니스 미팅의 중요성을 나타내고 있습니다.</li>
              <li>테이블 위에는 물병과 유리잔이 놓여있어 장시간의 회의를 위한 준비가 되어 있음을 보여줍니다.</li>
            </ol>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageStudy;