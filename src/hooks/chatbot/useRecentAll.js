import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useRecentAll = (fetchFunction) => {
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userNo = useSelector(state => state.user.userNo);

  const fetchChats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFunction(userNo);
      setRecentChats(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, userNo]);

  return { recentChats, loading, error, fetchChats };
};