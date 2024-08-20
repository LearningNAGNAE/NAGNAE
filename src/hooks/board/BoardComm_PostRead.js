import { useState, useEffect } from 'react';
import { usePostAPI } from '../../contexts/board/Board_Comm_PostReadAPi';

export const usePost = (postId) => {
  const { fetchPost, deletePost } = usePostAPI();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPost(postId);
        setPost(postData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId, fetchPost]);

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      // 성공적인 삭제 후 추가 작업
    } catch (err) {
      setError(err);
    }
  };

  return { post, loading, error, handleDelete };
};
