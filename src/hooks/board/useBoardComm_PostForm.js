import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const usePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/board/freeboardwrite', {
        title,
        content,
        userid: 1
      });
      console.log('Post created:', response.data);
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
    handleSubmit
  };
};