import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostDetailContext } from '../../contexts/board/Board_Comm_PostReadAPi';

export const usePostDetail = (postId) => {
  const { post, loading, error, fetchPost, deletePost, postComment } = usePostDetailContext(); 
  const [commentContent, setCommentContent] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      console.error('User data is not available in sessionStorage');
    }
  }, []);

  useEffect(() => {
    fetchPost(postId);
  }, [postId, fetchPost]);

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      navigate('/BoardPage?type=Comm_PostList');
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleComment = async () => {
    try {
      if (!userData || !userData.apiData) {
        throw new Error('User data is not available');
      }
      await postComment(commentContent, userData);
      navigate('/BoardPage?type=Comm_PostList');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return { 
    post, 
    loading, 
    error, 
    commentContent, 
    setCommentContent, 
    handleDelete, 
    handleComment 
  };
};
