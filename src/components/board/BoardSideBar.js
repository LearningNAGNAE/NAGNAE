// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/board/BoardSideBar.scss';
import img from '../../assets/images/sam.png';
import { useBoardCategory } from '../../hooks/board/useBoardCategory';

function BoardSideBar() {
  const activeCategory = useBoardCategory();

  return (
    <aside className="board-sidebar">
      <div className='board-sidebar-title'>
        <h2><Link to="/BoardPage">Board</Link></h2>
      </div>
      <nav>
        <ul className='board-sidebar-category'>
          <li className={activeCategory === 'Ann_PostList' ? 'active' : ''}>
            <Link to="/BoardPage?type=Ann_PostList">Announcements</Link>
          </li>
          <li className={activeCategory === 'Comm_PostList' ? 'active' : ''}>
            <Link to="/BoardPage?type=Comm_PostList">Community</Link>
          </li>
          
        </ul>
      </nav>
      <img src={img} alt="Egg tart advertisement" />
    </aside>
  );
}

export default BoardSideBar;