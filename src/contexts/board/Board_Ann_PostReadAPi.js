import React, { createContext, useContext, useCallback, useState } from "react";
import axios from "axios";
import store from "../../redux/Store";

const AnnPostDetailContext = createContext();

export const useAnnPostDetailContext = () => {
  return useContext(AnnPostDetailContext);
};

export const AnnPostDetailProvider = ({ children }) => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const incrementViews = useCallback(
    async (boardno) => {
      try {
        await axios.put(`${SpringbaseUrl}/board/incrementViews`, {
          boardno,
          category_no: 2, // Announcements 카테고리 번호
        });
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    },
    [SpringbaseUrl]
  );

  const fetchPost = useCallback(
    async (boardno) => {
      if (!boardno) return;
      setLoading(true);
      try {
        await incrementViews(boardno);
        const response = await axios.get(
          `${SpringbaseUrl}/board/freeboardread`,
          {
            params: { boardno },
          }
        );
        setPost(response.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [SpringbaseUrl, incrementViews]
  );

  const deletePost = useCallback(
    async (boardno) => {
      if (!boardno) return;
      try {
        await axios.delete(`${SpringbaseUrl}/board/freereaddelete`, {
          params: { boardno },
        });
      } catch (error) {
        console.error("Error deleting post:", error);
        setError(error);
      }
    },
    [SpringbaseUrl]
  );

  const postComment = useCallback(
    async (commentcontent, userData, boardno) => {
      if (!userData || !userData.apiData) {
        console.error("User data is not available:", userData);
        throw new Error("User data is not available");
      }
      try {
        const response = await axios.post(
          `${SpringbaseUrl}/board/freeboardcommentwrite`,
          {
            content: commentcontent,
            commenterno: userData.apiData.userno,
            boardno,
            category_no: 2, // Announcements 카테고리 번호
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
      }
    },
    [SpringbaseUrl]
  );

  const getCommentList = useCallback(
    async (boardno) => {
      try {
        const response = await axios.get(
          `${SpringbaseUrl}/board/freeboardcommentlist`,
          {
            params: { boardno },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
      }
    },
    [SpringbaseUrl]
  );

  const value = {
    post,
    loading,
    error,
    fetchPost,
    deletePost,
    postComment,
    getCommentList,
  };

  return (
    <AnnPostDetailContext.Provider value={value}>
      {children}
    </AnnPostDetailContext.Provider>
  );
};
