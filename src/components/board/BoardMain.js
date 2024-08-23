// src/components/board/BoardMain.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useBoard } from '../../hooks/board/BoardMainHook';
import '../../assets/styles/board/BoardMain.scss';

function BoardMain() {
  const { announcements, communityPosts, loading, error } = useBoard();

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>게시글을 불러오는 중 오류 발생: {error.message}</div>;

  const BoardSection = ({ title, data, linkTo }) => (
    <section className="board-main-section">
      <h2>
        {title}
        <Link to={linkTo} className="see-more">see more</Link>
      </h2>
      <table>
        <thead className='board-main-thead'>
          <tr>
            <th>no</th>
            <th>title</th>
            <th>writer</th>
            <th>date</th>
            <th>hits</th>
          </tr>
        </thead>
        <tbody className='board-main-tbody'>
          {data.map((item) => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td><Link to={`/post/${item.no}`}>{item.title}</Link></td>
              <td>{item.writer}</td>
              <td>{item.date}</td>
              <td>{item.hits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );

  return (
    <div className="board-main">
      <BoardSection 
        title="Announcements (Latest posts)" 
        data={announcements} 
        linkTo="/announcements"
      />
      <BoardSection 
        title="Community (Latest posts)" 
        data={communityPosts} 
        linkTo="/community"
      />
    </div>
  );
}

export default BoardMain;
