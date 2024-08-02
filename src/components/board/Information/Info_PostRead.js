import React from 'react'
import { Link } from 'react-router-dom';
import '../../../assets/styles/board/Infomation/Info_PostRead.scss';

function Info_PostRead() {
  return (
    <div className="info-infoouncements">
      <div className='info-header'>
      <h1 className='info_h1'>infoouncements</h1>
        <div className="info-header-buttons">
          <Link className='info-list' to="/BoardPage?type=Info_PostList">List</Link>
          <button className="info-modify">Modify</button>
          <button className="info-delete">Delete</button>
        </div>
      </div>
      
      <article className='info-article-box'>

        <div className='info-article-header'>

          <div className="info-article-meta">
            <div className='info-img-auth-loc-box'>
              <div className='info-article-profile-img'>
              </div>
              <div className='info-auth-loc-box'>
                <p className="info-author">CRAZY TART</p>
                <p className="info-location">Australia</p>
              </div>
            </div>
            <div className='info-date-hits-box'>
              <span className="info-date">2024.07.31 11:01</span>
              <span className="info-hits">hit: 10554</span>
            </div>
          </div>
        
          <h2 className='info-article-h2'>A good egg tart restaurant in Seoul</h2>

        </div>
        
        <div className="info-article-content">
          <p>Egg Tart Revolution, located at 4564-123, Seocho-gu, Seoul, is taking the city by storm with its innovative approach to the classic egg tart. Founded by pastry chef Kim Min-jun, this cozy bakery offers a twist on the traditional Portuguese pastel de nata.</p>
          <p>Using locally sourced ingredients and experimenting with unique flavors, Egg Tart Revolution has quickly become a hotspot for dessert lovers and food enthusiasts alike.</p>
          <p>The store's signature item is their "Hallyu Tart," which infuses the creamy egg custard with subtle notes of green tea and tops it with a sprinkle of toasted black sesame seeds. Other popular varieties include the spicy gochujang-infused "K-Spice Tart" and the refreshing "Jeju Tangerine Tart."</p>
          <p>Despite being open for just six months, Egg Tart Revolution has already garnered attention from food critics and social media influencers, leading to long queues during peak hours. The store's success has inspired Kim to consider expanding to other locations in Seoul and potentially other major cities in South Korea.</p>
        </div>
      </article>
      
      <section className="info-comments">
        <div className="info-comment">
          <div className='info-comment-img'></div>
          <div className='info-commenter-box'>
            <span className="info-commenter">BANA</span>
            <p>I tried the Hallyu Tart last week, and it was amazing! The green tea flavor was so subtle and perfectly balanced. Can't wait to go back and try the other flavors!</p>
          </div>
        </div>
        <div className="info-comment">
          <div className='info-comment-img'></div>
          <div className='info-commenter-box'>
            <span className="info-commenter">BANA</span>
            <p>Those queues are no joke. I waited for an hour, but it was totally worth it. The K-Spice Tart is a game-changer!</p>
          </div>
        </div>
      </section>
      
      <div className="info-reply-box">
        <div className='info-reply-img'></div>
        <input className='info-reply-input' type="text" placeholder="Write a comment..." />
        <button className="info-send-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffffff">
            <path d="M120-160v-640l760 320-760 320Zm66.67-102 520.66-218-520.66-220v158.67L428-480l-241.33 60v158Zm0 0v-438 438Z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Info_PostRead