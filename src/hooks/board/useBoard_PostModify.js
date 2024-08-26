import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePostModifyAPI } from "../../contexts/board/Board_PostModifyApi";
import Quill from "quill";
import { convertToHtml, extractImageUrls } from "../../components/board/BoardUtil";

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

  const convertHtmlToDelta = useCallback((html) => {
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = html;
    const quill = new Quill(tempContainer);
    return quill.getContents();
  }, []);


  const dataURLtoFile = useCallback((dataurl, filename) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }, []);

  const replaceImageUrls = useCallback((htmlContent, oldUrls, newUrls) => {
    let updatedContent = htmlContent;
    oldUrls.forEach((oldUrl, index) => {
      updatedContent = updatedContent.replace(oldUrl, newUrls[index]);
    });
    return updatedContent;
  }, []);

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
      const htmlContent = convertToHtml(updatedContent);
      
      // 이미지 URL을 추출하고 처리합니다.
      const imageUrls = extractImageUrls(htmlContent);
      const processedImageUrls = await Promise.all(
        imageUrls.map(async (url) => {
          if (url.startsWith('data:')) {
            // base64 이미지를 파일로 변환
            const file = dataURLtoFile(url, 'image.png');
            return await handleImageUpload(file);
          }
          return url;
        })
      );

      // 처리된 이미지 URL로 HTML 내용을 업데이트합니다.
      const finalHtmlContent = replaceImageUrls(htmlContent, imageUrls, processedImageUrls);

      await updatePost(boardno, title, finalHtmlContent, userData, categoryno);
      navigate("/BoardPage?type=Comm_PostList");
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [boardno, categoryno, navigate, updatePost, userData, title, quillRef, handleImageUpload, dataURLtoFile, replaceImageUrls]);

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
  }, [boardno, fetchPost, convertHtmlToDelta]);

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
    convertToHtml,
    extractImageUrls,
  };
};