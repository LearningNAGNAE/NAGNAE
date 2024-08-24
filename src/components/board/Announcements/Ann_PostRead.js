import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/board/Announcements/Ann_PostRead.scss";
import { useBoard_Ann_PostRead } from "../../../hooks/board/useBoard_Ann_PostRead";
import HtmlViewer from "../HtmlViewer";
import { AnnPostDetailProvider } from "../../../contexts/board/Board_Ann_PostReadAPi";

function AnnPostFormRead() {
  const {
    post,
    loading,
    error,
    commentContent,
    commentList,
    userNo,
    setCommentContent,
    handleDelete,
    handleComment,
  } = useBoard_Ann_PostRead();

  if (loading) return <div>로딩 중...</div>;
  if (error)
    return <div>공지사항을 불러오는 중 오류 발생: {error.message}</div>;

  return (
    <div className="ann-announcements">
      <div className="ann-header">
        <h1 className="ann_h1">Announcements</h1>
        <div className="ann-header-buttons">
          <Link className="ann-list" to="/BoardPage?type=Ann_PostList">
            목록
          </Link>
          <Link className="ann-modify" to="/BoardPage?type=Ann_PostList">
            수정
          </Link>
          {userNo &&
            post &&
            Number(userNo) === Number(post.insertuserno) && (
              <button className="ann-delete" onClick={handleDelete}>
                삭제
              </button>
            )}
        </div>
      </div>
      <article className="ann-article-box">
        <div className="ann-article-header">
          <div className="ann-article-meta">
            <div className="ann-img-auth-loc-box">
              <div className="ann-article-profile-img"></div>
              <div className="ann-auth-loc-box">
                <p className="ann-author">{post.userName}</p>
                <p className="ann-location">Australia</p>
              </div>
            </div>
            <div className="ann-date-hits-box">
              <span className="ann-date">{post.insertDate}</span>
              <span className="ann-hits">조회수: {post.views}</span>
            </div>
          </div>
          <h2 className="ann-article-h2">{post.title}</h2>
        </div>

        <div className="ann-article-content">
          <HtmlViewer html={post.content} />
        </div>
      </article>
      <section className="ann-comments">
        {Array.isArray(commentList) &&
          commentList.map((comment, index) => (
            <div key={index} className="ann-comment">
              <div className="ann-comment-img"></div>
              <div className="ann-commenter-box">
                <div className="ann-commenter">{comment.username}</div>
                <div className="ann-comment-content">{comment.content}</div>
              </div>
            </div>
          ))}
      </section>
      <div className="ann-reply-box">
        <div className="ann-reply-img"></div>
        <input
          className="ann-reply-input"
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <button
          type="button"
          onClick={handleComment}
          className="ann-send-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#ffffff"
          >
            <path d="M120-160v-640l760 320-760 320Zm66.67-102 520.66-218-520.66-220v158.67L428-480l-241.33 60v158Zm0 0v-438 438Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Ann_PostRead() {
  return (
    <AnnPostDetailProvider>
      <AnnPostFormRead />
    </AnnPostDetailProvider>
  );
}

export default Ann_PostRead;
