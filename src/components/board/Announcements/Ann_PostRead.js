import React from 'react'
import { Link } from 'react-router-dom';
import '../../../assets/styles/board/Announcements/Ann_PostRead.scss';

function Ann_PostRead() {
  return (
    <div className="ann-announcements">
      <div className='ann-header'>
      <h1 className='ann_h1'>Announcements</h1>
        <div className="ann-header-buttons">
          <Link className='ann-list' to="/BoardPage?type=Ann_PostList">List</Link>
          <button className="ann-modify">Modify</button>
          <button className="ann-delete">Delete</button>
        </div>
      </div>
      
      <article className='ann-article-box'>

        <div className='ann-article-header'>

          <div className="ann-article-meta">
            <div className='ann-img-auth-loc-box'>
              <div className='ann-article-profile-img'>
              </div>
              <div className='ann-auth-loc-box'>
                <p className="ann-author">CRAZY TART</p>
                <p className="ann-location">Australia</p>
              </div>
            </div>
            <div className='ann-date-hits-box'>
              <span className="ann-date">2024.07.31 11:01</span>
              <span className="ann-hits">hit: 10554</span>
            </div>
          </div>
        
          <h2 className='ann-article-h2'>A good egg tart restaurant in Seoul</h2>

        </div>
        
        <div className="ann-article-content">
          <p>Egg Tart Revolution, located at 4564-123, Seocho-gu, Seoul, is taking the city by storm with its innovative approach to the classic egg tart. Founded by pastry chef Kim Min-jun, this cozy bakery offers a twist on the traditional Portuguese pastel de nata.</p>
          <p>Using locally sourced ingredients and experimenting with unique flavors, Egg Tart Revolution has quickly become a hotspot for dessert lovers and food enthusiasts alike.</p>
          <p>The store's signature item is their "Hallyu Tart," which infuses the creamy egg custard with subtle notes of green tea and tops it with a sprinkle of toasted black sesame seeds. Other popular varieties include the spicy gochujang-infused "K-Spice Tart" and the refreshing "Jeju Tangerine Tart."</p>
          <p>Despite being open for just six months, Egg Tart Revolution has already garnered attention from food critics and social media influencers, leading to long queues during peak hours. The store's success has inspired Kim to consider expanding to other locations in Seoul and potentially other major cities in South Korea.</p>
        </div>
      </article>
      
      <section className="ann-comments">
        <div className="ann-comment">
          <div className='ann-comment-img'></div>
          <div className='ann-commenter-box'>
            <span className="ann-commenter">BANA</span>
            <p>I tried the Hallyu Tart last week, and it was amazing! The green tea flavor was so subtle and perfectly balanced. Can't wait to go back and try the other flavors!</p>
          </div>
        </div>
        <div className="ann-comment">
          <div className='ann-comment-img'></div>
          <div className='ann-commenter-box'>
            <span className="ann-commenter">BANA</span>
            <p>Those queues are no joke. I waited for an hour, but it was totally worth it. The K-Spice Tart is a game-changer!</p>
          </div>
        </div>
      </section>
      
      <div className="ann-reply-box">
        <div className='ann-reply-img'></div>
        <input className='ann-reply-input' type="text" placeholder="Write a comment..." />
        <button className="ann-send-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffffff">
            <path d="M120-160v-640l760 320-760 320Zm66.67-102 520.66-218-520.66-220v158.67L428-480l-241.33 60v158Zm0 0v-438 438Z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Ann_PostRead