import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostFormAPI } from '../../contexts/board/Board_Comm_PostFormApi';

export const usePostForm = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { submitPost } = usePostFormAPI();
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  const handleSubmit = async (title, htmlContent, localImages) => {
    try {
      if (!userData || !userData.apiData) {
        throw new Error('User data is not available');
      }
      await submitPost(title, htmlContent, localImages, userData);
      navigate('/BoardPage?type=Comm_PostList');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return {
    title,
    setTitle,
    handleSubmit,
  };
};


