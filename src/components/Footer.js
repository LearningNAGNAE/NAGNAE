import React from 'react'
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  // HomePage와 ChatBotPage를 제외한 나머지 경로에서만 Footer를 렌더링
  if (location.pathname === '/') {
    return null;
  }

  return (
    <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <p>2024 NAGNAE. All rights reserved.</p>
            <p>hyunsujung3679@gmail.com</p>
          </div>
        </div>
    </footer>
  )
}

export default Footer