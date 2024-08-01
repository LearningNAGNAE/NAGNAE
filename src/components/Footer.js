import React from 'react'
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  // HomePage와 ChatBotPage를 제외한 나머지 경로에서만 Footer를 렌더링
  if (location.pathname === '/') {
    return null;
  }

  return (
    <footer>
      <div className='footer-wrap'>
        <div className='footer-detail-box'>
          <div className='first-detail'>
            <span>Privacy Statement</span>
            <span>Terms of Use</span>
          </div>
          <div className='second-detail'>
            <div className='s-introduce'>
              <span>Coporation NAGNAE</span>
              <span>CEO : Hyun Su Jung</span>
            </div>
            <div className='s-introduce'>
              <span>010-2728-7526</span>
            </div>
          </div>
          <div className='third-detail'>
            <span>20 Teheran-ro 5-gil, Gangnam-gu, Seoul</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer