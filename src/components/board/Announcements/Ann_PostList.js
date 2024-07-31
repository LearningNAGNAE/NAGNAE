// src/components/PostList.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/board/Announcements/Ann_PostList.scss';

function Ann_PostList() {
  return (
    <div className='ann_postlist_wrap'>
      <h1>Community</h1>
    
      <ul className="ann-post-list">
        <li>
          <div>
            <div>title</div>
            <div>writer</div>
            <div>date</div>
            <div>hits</div>
          </div>
        </li>
        <li>2</li>
        <li>3</li>
        <li>4</li>

        
        
              {/* <td><Link to="/BoardPage?type=Ann_PostRead">링크</Link></td> */}
        <Link to="/BoardPage?type=Ann_PostForm">글쓰기</Link>
      </ul>
    </div>
  );
}

export default Ann_PostList;