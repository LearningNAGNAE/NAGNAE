import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAnnPostDetailContext } from "../../contexts/board/Board_Ann_PostReadAPi";

export const useBoard_Ann_PostRead = () => {
  const {
    post,
    loading,
    error,
    fetchPost,
    deletePost,
    postComment,
    getCommentList,
  } = useAnnPostDetailContext();
  const [commentContent, setCommentContent] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userNo, setUserNo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const boardno = location.state?.boardno || null;

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(storedUserData);
    if (storedUserData && storedUserData.apiData) {
      setUserNo(storedUserData.apiData.userno)
    }
  }, []);

  const fetchComments = useCallback(async () => {
    if (boardno) {
      try {
        const response = await getCommentList(boardno);
        setCommentList(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  }, [boardno, getCommentList]);

  useEffect(() => {
    if (boardno) {
      fetchPost(boardno);
      fetchComments();
    }
  }, [boardno, fetchPost, fetchComments]);

  const handleDelete = useCallback(async () => {
    if (boardno) {
      try {
        await deletePost(boardno);
        navigate("/BoardPage?type=Ann_PostList");
      } catch (err) {
        console.error("Error deleting Announcement post:", err);
      }
    }
  }, [boardno, deletePost, navigate]);

  const handleComment = useCallback(async () => {
    if (boardno && userData?.apiData) {
      try {
        await postComment(commentContent, userData, boardno);
        setCommentContent("");
        await fetchComments();
      } catch (error) {
        console.error("Error creating comment:", error);
      }
    } else {
      alert("로그인후 이용해주세요");
      navigate("/SignPage?type=signin");
    }
  }, [boardno, commentContent, fetchComments, postComment, userData,navigate]);

  return {
    post,
    loading,
    error,
    commentContent,
    commentList,
    userNo,
    setCommentContent,
    handleDelete,
    handleComment,
  };
};
