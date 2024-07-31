// src/components/PostList.js
import React from 'react';
import { Link } from 'react-router-dom';

function Comm_PostList() {
  return (
    <table className="post-list">
      <thead>
        <tr>
          <th>no</th>
          <th>title</th>
          <th>writer</th>
          <th>date</th>
          <th>hits</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>1</td>
            <td><Link to="/BoardPage?type=Comm_PostRead">링크</Link></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
      </tbody>
      
      <Link to="/BoardPage?type=Comm_PostForm">글쓰기</Link>
    </table>
  );
}

export default Comm_PostList;