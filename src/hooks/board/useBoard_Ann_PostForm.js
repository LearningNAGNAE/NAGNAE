import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAnnPostFormAPI } from "../../contexts/board/Board_Ann_PostFormApi";

export const useBoard_Ann_PostForm = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { submitPost, uploadImage } = useAnnPostFormAPI();
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const getUserNo = useCallback(() => {
    if (!userData || !userData.apiData) {
      throw new Error("User data is not available");
    }
    console.log("Ann User No:", userData.apiData.userno);
    return userData.apiData.userno;
  }, [userData]);

  const handleSubmit = useCallback(
    async (title, content) => {
      try {
        await submitPost(title, content, userData);
        navigate("/BoardPage?type=Ann_PostList");
      } catch (error) {
        console.error("Error creating Announcement post:", error);
      }
    },
    [userData, submitPost, navigate]
  );

  const handleImageUpload = useCallback(
    async (file) => {
      try {
        const userNo = getUserNo();
        console.log("Ann Image Upload User No:", userNo);
        const imageUrl = await uploadImage(file, userNo);
        return imageUrl;
      } catch (error) {
        console.error("Error uploading image for Announcement:", error);
        throw error;
      }
    },
    [getUserNo, uploadImage]
  );

  return {
    title,
    setTitle,
    handleSubmit,
    handleImageUpload,
    getUserNo,
  };
};
