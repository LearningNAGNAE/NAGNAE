import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/board/Community/Comm_PostRead.scss';
import { usePostDetail } from '../../../hooks/board/BoardComm_PostRead';
import HtmlViewer from '../HtmlViewer';
import { PostDetailProvider } from '../../../contexts/board/Board_Comm_PostReadAPi';

function PostFormRead() {
  const { 
    post, 
    loading, 
    error, 
    commentContent, 
    commentList,
    userData,
    setCommentContent, 
    handleDelete, 
    handleComment 
  } = usePostDetail();


  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>게시글을 불러오는 중 오류 발생: {error.message}</div>;

  return (
    <div className="comm-commouncements">
      <div className='comm-header'>
        <h1 className='comm_h1'>Community</h1>
        <div className="comm-header-buttons">
          <Link className='comm-list' to="/BoardPage?type=Comm_PostList">목록</Link>
          <Link className='comm-modify' to="/BoardPage?type=Comm_PostList">수정</Link>
          {userData.apiData && post && Number(userData.apiData.userno) === Number(post.insertuserno) && (
            <button className="comm-delete" onClick={handleDelete}>삭제</button>
          )}
        </div>
      </div>
      <article className='comm-article-box'>
        <div className='comm-article-header'>
          <div className="comm-article-meta">
            <div className='comm-img-auth-loc-box'>
              <div className='comm-article-profile-img'></div>
              <div className='comm-auth-loc-box'>
                <p className="comm-author">{post.userName}</p>
                <p className="comm-location">Australia</p>
              </div>
            </div>
            <div className='comm-date-hits-box'>
              <span className="comm-date">{post.insertDate}</span>
              <span className="comm-hits">조회수: {post.views}</span>
            </div>
          </div>
          <h2 className='comm-article-h2'>{post.title}</h2>
        </div>

        <div className="comm-article-content">
          <HtmlViewer html={post.content} />
        </div>
      </article>
      <section className="comm-comments">
        {Array.isArray(commentList) && commentList.map((comment, index) => (
          <div key={index} className="comm-comment">
            <div className="comm-comment-img"></div>
            <div className="comm-commenter-box">
              <div className="comm-commenter">{comment.username}</div>
              <div className="comm-comment-content">{comment.content}</div>
            </div>
          </div>
        ))}
      </section>
      <div className="comm-reply-box">
        <div className='comm-reply-img'></div>
        <input
          className='comm-reply-input'
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <button type='button' onClick={handleComment} className="comm-send-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffffff">
            <path d="M120-160v-640l760 320-760 320Zm66.67-102 520.66-218-520.66-220v158.67L428-480l-241.33 60v158Zm0 0v-438 438Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function Comm_PostRead() {
  return (
    <PostDetailProvider>
      <PostFormRead />
    </PostDetailProvider>
  );
}

export default Comm_PostRead;