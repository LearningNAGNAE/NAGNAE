import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostDetailContext } from '../../contexts/board/Board_Comm_PostReadAPi';
import { useLocation } from 'react-router-dom';

export const usePostDetail = () => {
  const { post, loading, error, fetchPost, deletePost, postComment, getCommentList } = usePostDetailContext();
  const [commentContent, setCommentContent] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const boardno = location.state?.boardno || null;

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      console.error('User data is not available in sessionStorage');
    }
  }, []);

  const fetchComments = useCallback(async () => {
    if (boardno) {
      try {
        const response = await getCommentList(boardno);
        setCommentList(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
  }, [boardno, getCommentList]);

  useEffect(() => {
    if (boardno) {
      fetchPost(boardno);
      fetchComments();
    }
  }, [boardno, fetchPost, fetchComments]);


  const handleDelete = useCallback(async () => {
    if (boardno) {
      try {
        await deletePost(boardno);
        navigate('/BoardPage?type=Comm_PostList');
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
  }, [boardno, deletePost, navigate]);

  const handleComment = useCallback(async () => {
    if (boardno && userData?.apiData) {
      try {
        await postComment(commentContent, userData, boardno);
        setCommentContent('');
        await fetchComments();
      } catch (error) {
        console.error('Error creating comment:', error);
      }
    } else {
      console.error('User data is not available or boardno is missing');
    }
  }, [boardno, commentContent, fetchComments, postComment, userData]);

  return { 
    post, 
    loading, 
    error, 
    commentContent,
    commentList,
    userData,
    setCommentContent, 
    handleDelete, 
    handleComment
  };
};