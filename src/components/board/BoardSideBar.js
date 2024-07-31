// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/board/BoardSideBar.scss';
import img from'../../assets/images/sam.png';

function BoardSideBar() {
  return (
    <aside className="board-sidebar">
      <div className='board-sidebar-title'>
        <h2>Borad</h2>
      </div>
      <nav>
        <ul className='board-sidebar-category'>
          <li><Link to="/BoardPage?type=Ann_PostList">Announcements</Link></li>
          <li><Link to="/BoardPage?type=Comm_PostList">Community</Link></li>
          <li><Link to="/BoardPage?type=Info_PostList">Information</Link></li>
        </ul>
      </nav>
      <img src={img} alt="Egg tart advertisement" />
    </aside>
  );
}

export default BoardSideBar;