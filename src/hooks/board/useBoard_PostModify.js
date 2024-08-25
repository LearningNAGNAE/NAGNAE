import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePostModifyAPI } from "../../contexts/board/Board_PostModifyApi";

export const useBoard_PostModify = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { updatePost, uploadImage, fetchPost } = usePostModifyAPI();
  const location = useLocation();
  const categoryno = location.state?.categoryno || null;
  const boardno = location.state?.boardno || null;

  useEffect(() => {
    const loadUserData = () => {
      const storedUserData = JSON.parse(sessionStorage.getItem("userData"));
      console.log("Stored user data:", storedUserData);
      if (storedUserData && storedUserData.apiData) {
        setUserData(storedUserData);
      } else {
        console.error("User data not found in sessionStorage");
        setError("사용자 데이터를 찾을 수 없습니다. 다시 로그인해주세요.");
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const loadPost = async () => {
      if (boardno) {
        setLoading(true);
        try {
          const postData = await fetchPost(boardno);
          console.log("Fetched post data:", postData);
          if (postData && postData.title && postData.content) {
            setTitle(postData.title);
            setContent(postData.content);
          } else {
            throw new Error("Invalid post data structure");
          }
        } catch (err) {
          console.error("Error in loadPost:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadPost();
  }, [boardno, fetchPost]);

  const handleUpdate = useCallback(async (updatedTitle, updatedContent) => {
    setLoading(true);
    try {
      console.log("Updating post with userData:", userData);
      if (!userData) {
        throw new Error("사용자 데이터가 없습니다. 다시 로그인해주세요.");
      }
      await updatePost(boardno, updatedTitle, updatedContent, userData, categoryno);
      navigate("/BoardPage?type=Comm_PostList");
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [boardno, categoryno, navigate, updatePost, userData]);

  const handleImageUpload = useCallback(async (file) => {
    try {
      console.log("Uploading image with userData:", userData);
      if (!userData || !userData.apiData) {
        throw new Error("사용자 데이터가 없습니다. 다시 로그인해주세요.");
      }
      const userNo = userData.apiData.userno;
      return await uploadImage(file, userNo);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }, [userData, uploadImage]);

  return {
    title,
    setTitle,
    content,
    setContent,
    handleUpdate,
    handleImageUpload,
    loading,
    error,
    userData,
  };
};