import { useState, useEffect } from "react";
import { getAnnPosts } from "../../contexts/board/Board_Ann_PostListApi";

export const useBoard_Ann_PostList = (initialPage = 1) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState(null);
  const [userNo, setUserNo] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(storedUserData);
    if (storedUserData && storedUserData.apiData) {
      setUserNo(storedUserData.apiData.userno);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAnnPosts(currentPage, searchTerm);
        if (response.code === "200" && Array.isArray(response.data.boardList)) {
          setPosts(response.data.boardList);
          setTotalPages(response.data.totalPages);
          setTotalPosts(response.data.totalPosts);
          setPageSize(response.data.pageSize);
        } else {
          setPosts([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error("Failed to fetch Announcement posts:", error);
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
    setCurrentPage(1);
  };

  return {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    pageSize,
    userNo,
    userData,
    onPageChange: handlePageChange,
    onSearch: handleSearch,
  };
};
