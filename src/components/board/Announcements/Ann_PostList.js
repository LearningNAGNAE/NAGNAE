import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/board/Announcements/Ann_PostList.scss";
import { useBoard_Ann_PostList } from "../../../hooks/board/useBoard_Ann_PostList";

function AnnPostList({
  posts,
  currentPage,
  totalPages,
  totalPosts,
  pageSize,
  userNo,
  userData,
  onPageChange,
  onSearch,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="ann_postlist_wrap">
      <div className="ann-post-list-header">
        <h1 className="ann_h1">Announcements</h1>
        <div className="ann-input-btn-box">
          <input
            className="ann-search"
            type="text"
            placeholder="Please enter your search term"
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="ann-search-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="36px"
              viewBox="0 -960 960 960"
              width="36px"
              fill="#5f6368"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </div>
      </div>

      <table className="ann-post-list">
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "auto" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead className="ann-thead">
          <tr>
            <th>no</th>
            <th>title</th>
            <th>writer</th>
            <th>date</th>
            <th>hits</th>
          </tr>
        </thead>
        <tbody className="ann-tbody">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <tr key={post.boardno}>
                <td>{totalPosts - ((currentPage - 1) * pageSize + index)}</td>
                <td align="left">
                  <Link
                    to={"/BoardPage?type=Ann_PostRead"}
                    state={{ boardno: post.boardno }}
                  >
                    {post.title}
                  </Link>
                </td>
                <td>{post.userName}</td>
                <td>
                  {new Date(post.insertDate)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\.$/, "")}
                </td>
                <td>{post.views}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No announcements available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagenation-writebtn-box">
        <div className="pagination">
          <button onClick={() => onPageChange(1)} className="pagination-button">
            &laquo;
          </button>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="pagination-button"
          >
            &lt;
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`pagination-button ${
                currentPage === number ? "active" : ""
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="pagination-button"
          >
            &gt;
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            className="pagination-button"
          >
            &raquo;
          </button>
        </div>

        <div className="write-btn">
          {userData != null ?
            (userNo === 1 ?(
              <Link to={"/BoardPage?type=Ann_PostForm"} 
              state ={{categoryno : 2}}>Write</Link>
            ):(
              <div></div>
            )):(
              <div></div>
            )
          }
        </div>
      </div>
    </div>
  );
}

function AnnPostListMain() {
  const {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    pageSize,
    userNo,
    userData,
    onPageChange,
    onSearch,
  } = useBoard_Ann_PostList(1); // 1은 초기 페이지 번호입니다

  return (
    <AnnPostList
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
      totalPosts={totalPosts}
      pageSize={pageSize}
      userNo={userNo}
      userData={userData}
      onPageChange={onPageChange}
      onSearch={onSearch}
    />
  );
}

export default AnnPostListMain;
