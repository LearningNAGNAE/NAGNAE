import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import store from '../../redux/Store';
import { useLocation } from 'react-router-dom';

const PostDetailContext = createContext();

export const usePostDetailContext = () => {
  return useContext(PostDetailContext);
};

export const PostDetailProvider = ({ children }) => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;
  const location = useLocation();
  const { boardno } = location.state || {};
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    if (!boardno) {
      return;
    }
    try {
      const response = await axios.get(`${SpringbaseUrl}/board/freeboardread`, {
        params: { boardno }
      });
      setPost(response.data.data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [SpringbaseUrl, boardno]);

  const deletePost = useCallback(async () => {
    if (!boardno) {
      return;
    }
    try {
      await axios.delete(`${SpringbaseUrl}/board/freereaddelete`, {
        params: { boardno }
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      setError(error);
    }
  }, [SpringbaseUrl, boardno]);

  const postComment = useCallback(async (commentcontent, userData) => {
    if (!userData || !userData.apiData) {
      console.error('User data is not available:', userData);
      throw new Error('User data is not available');
    }
    console.log(userData.apiData.userno);
    try {
      const response = await axios.post(`${SpringbaseUrl}/board/freeboardcommentwrite`, {
        content: commentcontent,
        commenterno: userData.apiData.userno,
        boardno
      });
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }, [SpringbaseUrl, boardno]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <PostDetailContext.Provider value={{ post, loading, error, fetchPost, deletePost, postComment }}>
      {children}
    </PostDetailContext.Provider>
  );
};
