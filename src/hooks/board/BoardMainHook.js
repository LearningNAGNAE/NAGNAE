// src/hooks/useBoard.js

import { useState, useEffect } from 'react';
import { fetchPosts } from '../../contexts/board/BoardMainApi';

export const useBoard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setAnnouncements(data.announcements.slice(0, 6)); // 최신 6개
        setCommunityPosts(data.communityPosts.slice(0, 6)); // 최신 6개
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { announcements, communityPosts, loading, error };
};
