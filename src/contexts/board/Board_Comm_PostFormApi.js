import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import store from '../../redux/Store';

const userData = JSON.parse(sessionStorage.getItem('userData'));

export const usePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SpringbaseUrl}/board/freeboardwrite`, {
        title,
        content,
        userid: userData.apiData.userID
      });
      console.log('Post created:', response.data);
      // console.log(userData.apiData.userName);
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