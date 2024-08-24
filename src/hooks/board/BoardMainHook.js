// src/hooks/useBoard.js

import { useState, useEffect } from 'react';
import { fetchPosts } from '../../contexts/board/BoardMainApi';

export const useBoard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [totalMainAnnouncementsCount, setTotalMainAnnouncementsCount] = useState(0);
  const [totalMainCommunityCount, setTotalMainCommunityCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setAnnouncements(data.announcements.boardList); // 최신 6개
        setCommunityPosts(data.communityPosts.boardList); // 최신 6개
        setTotalMainAnnouncementsCount(data.announcements.totalMainCount);
        setTotalMainCommunityCount(data.communityPosts.totalMainCount);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { announcements, communityPosts, totalMainAnnouncementsCount, totalMainCommunityCount, loading, error };
};
