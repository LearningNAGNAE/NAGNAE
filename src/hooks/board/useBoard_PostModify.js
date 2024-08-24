import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePostModifyAPI } from "../../contexts/board/Board_PostModifyApi";
import { useLocation } from 'react-router-dom';

export const useBoard_PostModify = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { updatePost, uploadImage } = usePostModifyAPI();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const location = useLocation();
  const categoryno = location.state?.categoryno || null;

  const getUserNo = useCallback(() => {
    if (!userData || !userData.apiData) {
      throw new Error("User data is not available");
    }
    return userData.apiData.userno;
  }, [userData]);

  const handleUpdate = useCallback(
    async (title, content) => {
      try {
        if(userData !== null){
          await updatePost(title, content, userData,categoryno);
          navigate("/BoardPage?type=Comm_PostList");
        }else {
          alert("로그인 후 이용해주세요");
          navigate("/SignPage?type=signin");
        }
        
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    [userData, updatePost, navigate,categoryno]
  );

  const handleImageUpload = useCallback(
    async (file) => {
      try {
        const userNo = getUserNo();
        console.log("2222222222", userNo);
        const imageUrl = await uploadImage(file, userNo);
        return imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    },
    [getUserNo, uploadImage]
  );

  return {
    title,
    setTitle,
    handleUpdate,
    handleImageUpload,
    getUserNo,
  };
};
