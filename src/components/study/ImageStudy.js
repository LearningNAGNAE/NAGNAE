import React, { useState } from 'react';
import sendIcon from '../../assets/images/send.png';
import sampleImage from '../../assets/images/an_office_compony_1.png';
import '../../assets/styles/study/ImageStudy.scss';

const ImageStudy = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [userSentence, setUserSentence] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const categories = [
    'an office/company',
    'Shopping',
    'a restaurant/cafe',
    'banking/finance',
    'an emergency situation'
  ];

  const handleRefresh = () => {
    if (selectedCategory) {
      setShowImage(true);
      setShowAnalysis(false);
    }
  };

  const handleSend = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="image-study">
      <h1>Learning Korean to Image</h1>
      <h2>Loot at the image and Say the appropriate sentence!</h2>
      <br/>
      
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

      {showImage && (
        <>
          <div className="image-display">
            <img src={sampleImage} alt="Sample for the selected category" />
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