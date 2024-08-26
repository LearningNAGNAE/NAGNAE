import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePostModifyAPI } from "../../contexts/board/Board_PostModifyApi";
import Quill from "quill";

export const useBoard_PostModify = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { updatePost, uploadImage, fetchPost } = usePostModifyAPI();
  const location = useLocation();
  const categoryno = location.state?.categoryno || null;
  const boardno = location.state?.boardno || null;
  const quillRef = useRef(null);

  useEffect(() => {
    const loadUserData = () => {
      const storedUserData = JSON.parse(sessionStorage.getItem("userData"));
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
          if (postData && postData.title && postData.content) {
            setTitle(postData.title);
            const delta = convertHtmlToDelta(postData.content);
            setContent(delta);
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

  const convertHtmlToDelta = (html) => {
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = html;
    const quill = new Quill(tempContainer);
    return quill.getContents();
  };

  const convertDeltaToHtml = (delta) => {
    const tempContainer = document.createElement("div");
    const quill = new Quill(tempContainer);
    quill.setContents(delta);
    return tempContainer.innerHTML;
  };

  useEffect(() => {
    const loadPost = async () => {
      if (boardno) {
        setLoading(true);
        try {
          const postData = await fetchPost(boardno);
          if (postData && postData.title && postData.content) {
            setTitle(postData.title);
            const delta = convertHtmlToDelta(postData.content);
            setContent(delta);
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

  const handleUpdate = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userData) {
        throw new Error("사용자 데이터가 없습니다. 다시 로그인해주세요.");
      }
      if (!quillRef.current) {
        throw new Error("Quill editor reference is not available");
      }
      const updatedContent = quillRef.current.getEditor().getContents();
      const htmlContent = convertDeltaToHtml(updatedContent);
      await updatePost(boardno, title, htmlContent, userData, categoryno);
      navigate("/BoardPage?type=Comm_PostList");
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [boardno, categoryno, navigate, updatePost, userData, title, quillRef]);
  
  const handleImageUpload = useCallback(async (file) => {
    try {
      if (!userData || !userData.apiData) {
        throw new Error("사용자 데이터가 없습니다. 다시 로그인해주세요.");
      }
      const userNo = userData.apiData.userno;
      const imageUrl = await uploadImage(file, userNo);
      return imageUrl;
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
    quillRef,
  };
};