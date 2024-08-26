import { useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePostFormAPI } from "../../contexts/board/Board_PostFormApi";
import Quill from "quill";

export const useBoard_PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const navigate = useNavigate();
  const { submitPost, uploadImage } = usePostFormAPI();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const location = useLocation();
  const categoryno = location.state?.categoryno || null;
  const quillRef = useRef(null);

  const getUserNo = useCallback(() => {
    if (!userData || !userData.apiData) {
      throw new Error("User data is not available");
    }
    return userData.apiData.userno;
  }, [userData]);

  const processContent = useCallback(async (delta) => {
    const tempContainer = document.createElement("div");
    const quill = new Quill(tempContainer);
    quill.setContents(delta);

    const images = tempContainer.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (img.src.startsWith("data:image")) {
        const blob = await fetch(img.src).then(r => r.blob());
        const file = new File([blob], `image${i}.png`, { type: "image/png" });
        const imageUrl = await uploadImage(file, getUserNo());
        img.src = imageUrl;
      }
    }

    return tempContainer.innerHTML;
  }, [uploadImage, getUserNo]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (!title.trim()) {
        alert("제목을 입력해주세요.");
        return;
      }

      if (userData !== null) {
        if (!quillRef.current) {
          console.error("Quill editor reference is not available");
          return;
        }
        const delta = quillRef.current.getEditor().getContents();
        const processedContent = await processContent(delta);

        const result = await submitPost(title, processedContent, userData, categoryno);
        console.log("Submit post result:", result);

        navigate("/BoardPage?type=Comm_PostList");
      } else {
        alert("로그인 후 이용해주세요");
        navigate("/SignPage?type=signin");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }, [title, userData, submitPost, navigate, categoryno, quillRef, processContent]);

  return {
    title,
    setTitle,
    content,
    setContent,
    handleSubmit,
    quillRef,
  };
};