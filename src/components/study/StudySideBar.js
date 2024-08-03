import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/styles/study/StudySideBar.scss';
import img from '../../assets/images/sam.png';

function StudySideBar() {
  const [activeCategory, setActiveCategory] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    setActiveCategory(type || '');
  }, [location]);

  return (
    <aside className="study-sidebar">
      <div className='study-sidebar-title'>
        <h2><Link to="/StudyPage">Study</Link></h2>
      </div>
      <nav>
        <ul className='study-sidebar-category'>
          <li className={activeCategory === 'text' ? 'active' : ''}>
            <Link to="/StudyPage?type=text">Text</Link>
          </li>
          <li className={activeCategory === 'image' ? 'active' : ''}>
            <Link to="/StudyPage?type=image">Image</Link>
          </li>
        </ul>
      </nav>
      <img src={img} alt="Egg tart advertisement" />
    </aside>
  );
}

export default StudySideBar;