import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/styles/board/BoardMain.scss';

function BoardMain() {
  const sampleData = [
    { no: 15679, title: "Help Me Plz...", writer: "BingSoooo", date: "2024.07.30", hits: 2151 },
    { no: 15679, title: "Help Me Plz...", writer: "BingSoooo", date: "2024.07.30", hits: 2151 },
    { no: 15679, title: "Help Me Plz...", writer: "BingSoooo", date: "2024.07.30", hits: 2151 },
    { no: 15679, title: "Help Me Plz...", writer: "BingSoooo", date: "2024.07.30", hits: 2151 },
  ];

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
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.no}</td>
              <td>{item.title}</td>
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
        title="Announcements-(Latest post)" 
        data={sampleData} 
        linkTo="/BoardPage?type=Ann_PostList"
      />
      <BoardSection 
        title="Community-(Latest post)" 
        data={sampleData} 
        linkTo="/BoardPage?type=Comm_PostList"
      />
      <BoardSection 
        title="Information-(Latest post)" 
        data={sampleData} 
        linkTo="/BoardPage?type=Info_PostList"
      />
    </div>
  )
}

export default BoardMain