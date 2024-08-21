import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostFormAPI } from '../../contexts/board/Board_Comm_PostFormApi';

export const useBoardComm_PostForm = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { submitPost, uploadImage } = usePostFormAPI();
  const userData = JSON.parse(sessionStorage.getItem('userData'));


  const handleSubmit = async (title, content) => {
    try {
      if (!userData || !userData.apiData) {
        throw new Error('User data is not available');
      }
      await submitPost(title, content, userData);
      navigate('/BoardPage?type=Comm_PostList');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const imageUrl = await uploadImage(file);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return {
    title,
    setTitle,
    handleSubmit,
    handleImageUpload,
  };
};