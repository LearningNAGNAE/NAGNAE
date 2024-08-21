import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import store from '../../redux/Store';
import { useLocation } from 'react-router-dom';

const PostContext = createContext();

export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;
  const location = useLocation();
  const { boardno } = location.state || {};

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    if (!boardno) return;
    setLoading(true);
    try {
      const response = await axios.get(`${SpringbaseUrl}/board/freeboardread/${boardno}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [SpringbaseUrl, boardno]);

  const handleDelete = useCallback(async () => {
    if (!boardno) return;
    try {
      await axios.delete(`${SpringbaseUrl}/board/freeboarddelete/${boardno}`);
      // Handle post-deletion logic, e.g., redirect to list page
    } catch (error) {
      console.error('Error deleting post:', error);
      setError(error);
    }
  }, [SpringbaseUrl, boardno]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <PostContext.Provider value={{ post, loading, error, handleDelete }}>
      {children}
    </PostContext.Provider>
  );
};
