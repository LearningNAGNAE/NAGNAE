import React from 'react'
import { Link } from 'react-router-dom';
import '../../../assets/styles/board/Community/Comm_PostRead.scss';

function Comm_PostRead() {
  return (
    <div className="comm-commouncements">
      <div className='comm-header'>
      <h1 className='comm_h1'>commouncements</h1>
        <div className="comm-header-buttons">
        <Link className='comm-list' to="/BoardPage?type=Comm_PostList">List</Link>
          <button className="comm-modify">Modify</button>
          <button className="comm-delete">Delete</button>
        </div>
      </div>
      
      <article className='comm-article-box'>

        <div className='comm-article-header'>

          <div className="comm-article-meta">
            <div className='comm-img-auth-loc-box'>
              <div className='comm-article-profile-img'>
              </div>
              <div className='comm-auth-loc-box'>
                <p className="comm-author">CRAZY TART</p>
                <p className="comm-location">Australia</p>
              </div>
            </div>
            <div className='comm-date-hits-box'>
              <span className="comm-date">2024.07.31 11:01</span>
              <span className="comm-hits">hit: 10554</span>
            </div>
          </div>
        
          <h2 className='comm-article-h2'>A good egg tart restaurant in Seoul</h2>

        </div>
        
        <div className="comm-article-content">
          <p>Egg Tart Revolution, located at 4564-123, Seocho-gu, Seoul, is taking the city by storm with its innovative approach to the classic egg tart. Founded by pastry chef Kim Min-jun, this cozy bakery offers a twist on the traditional Portuguese pastel de nata.</p>
          <p>Using locally sourced ingredients and experimenting with unique flavors, Egg Tart Revolution has quickly become a hotspot for dessert lovers and food enthusiasts alike.</p>
          <p>The store's signature item is their "Hallyu Tart," which infuses the creamy egg custard with subtle notes of green tea and tops it with a sprinkle of toasted black sesame seeds. Other popular varieties include the spicy gochujang-infused "K-Spice Tart" and the refreshing "Jeju Tangerine Tart."</p>
          <p>Despite being open for just six months, Egg Tart Revolution has already garnered attention from food critics and social media influencers, leading to long queues during peak hours. The store's success has inspired Kim to consider expanding to other locations in Seoul and potentially other major cities in South Korea.</p>
        </div>
      </article>
      
      <section className="comm-comments">
        <div className="comm-comment">
          <div className='comm-comment-img'></div>
          <div className='comm-commenter-box'>
            <span className="comm-commenter">BANA</span>
            <p>I tried the Hallyu Tart last week, and it was amazing! The green tea flavor was so subtle and perfectly balanced. Can't wait to go back and try the other flavors!</p>
          </div>
        </div>
        <div className="comm-comment">
          <div className='comm-comment-img'></div>
          <div className='comm-commenter-box'>
            <span className="comm-commenter">BANA</span>
            <p>Those queues are no joke. I waited for an hour, but it was totally worth it. The K-Spice Tart is a game-changer!</p>
          </div>
        </div>
      </section>
      
      <div className="comm-reply-box">
        <div className='comm-reply-img'></div>
        <input className='comm-reply-input' type="text" placeholder="Write a comment..." />
        <button className="comm-send-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffffff">
            <path d="M120-160v-640l760 320-760 320Zm66.67-102 520.66-218-520.66-220v158.67L428-480l-241.33 60v158Zm0 0v-438 438Z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Comm_PostRead