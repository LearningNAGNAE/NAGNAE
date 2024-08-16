// usePostForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostFormAPI } from '../../contexts/board/Board_Comm_PostFormApi';

export const usePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { handleImageUpload, submitPost } = usePostFormAPI();
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  const handleSubmit = async (title, htmlContent) => {
    try {
      await submitPost(title, htmlContent, userData);
      navigate('/BoardPage?type=Comm_PostList');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    handleSubmit,
    handleImageUpload,
  };
};
