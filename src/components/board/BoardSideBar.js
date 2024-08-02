// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/styles/board/BoardSideBar.scss';
import img from '../../assets/images/sam.png';

function BoardSideBar() {
  const [activeCategory, setActiveCategory] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    setActiveCategory(type || '');
  }, [location]);

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
          <li className={activeCategory === 'Info_PostList' ? 'active' : ''}>
            <Link to="/BoardPage?type=Info_PostList">Information</Link>
          </li>
        </ul>
      </nav>
      <img src={img} alt="Egg tart advertisement" />
    </aside>
  );
}

export default BoardSideBar;