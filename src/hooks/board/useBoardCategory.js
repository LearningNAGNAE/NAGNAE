import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useBoardCategory() {
  const [activeCategory, setActiveCategory] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    setActiveCategory(type || '');
  }, [location]);

  return activeCategory;
}