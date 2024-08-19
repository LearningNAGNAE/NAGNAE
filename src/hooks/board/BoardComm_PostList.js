// src/hooks/usePostList.js
import { useState, useEffect } from 'react';
import { getPosts } from '../../contexts/board/Board_Comm-PostListApi'; // API 호출 함수

export const usePostList = (initialPage = 1) => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [pageSize, setPageSize] =useState(0);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await getPosts(currentPage, searchTerm);
          if (response.code === '200' && Array.isArray(response.data.boardList)) {
            setPosts(response.data.boardList);
            setTotalPages(response.data.totalPages);
            setTotalPosts(response.data.totalPosts);
            setPageSize(response.data.pageSize);
          } else {
            setPosts([]);
            setTotalPages(0);
          }
        } catch (error) {
          console.error('Failed to fetch posts:', error);
          setPosts([]);
          setTotalPages(0);
        }
      };
  
      fetchPosts();
    }, [currentPage, searchTerm]);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const handleSearch = (term) => {
      setSearchTerm(term);
      setCurrentPage(1); // 검색 시 첫 페이지로 리셋
    };
  
    return {
      posts,
      currentPage,
      totalPages,
      totalPosts,
      pageSize,
      onPageChange: handlePageChange,
      onSearch: handleSearch
    };
  };
