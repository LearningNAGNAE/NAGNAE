// src/components/board/BoardMain.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useBoard } from '../../hooks/board/BoardMainHook';
import '../../assets/styles/board/BoardMain.scss';

function BoardMain() {
  const { announcements, communityPosts, totalMainAnnouncementsCount, totalMainCommunityCount, loading, error } = useBoard();

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>게시글을 불러오는 중 오류 발생: {error.message}</div>;

  const BoardSection = ({ title, data, data2, linkTo }) => (
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
          {data.length > 0 ? 
            (data.map((item, index) => (
              <tr key={item.boardno}>
                <td>{data2-index}</td>
                <td><Link to={'/BoardPage?type=Comm_PostRead'} state={{ boardno: item.boardno }}>{item.title}</Link></td>
                <td className='board-main-tbody-writer'>{item.userName}</td>
                <td className='board-main-tbody-insertDate'>
                  {new Date(item.insertDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  }).replace(/\.$/, '')}
                </td>
                <td className='board-main-tbody-views'>{item.views}</td>
              </tr>
            ))
          )
          : (
            <tr>
              <td className='board-main-tbody-nopost' colSpan="5">No posts available</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );

  return (
    <div className="board-main">
      <BoardSection 
        title="Announcements (Latest posts)" 
        data={announcements} 
        data2={totalMainAnnouncementsCount}
        linkTo="/BoardPage?type=Ann_PostList"
      />
      <BoardSection 
        title="Community (Latest posts)" 
        data={communityPosts}
        data2={totalMainCommunityCount}
        linkTo="/BoardPage?type=Comm_PostList"
      />
    </div>
  );
}

export default BoardMain;
