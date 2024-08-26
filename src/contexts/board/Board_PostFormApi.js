import React, { createContext, useContext, useCallback, useState } from "react";
import axios from "axios";
import store from "../../redux/Store";
import { extractImageUrls } from "../../components/board/BoardUtil";

const PostFormAPIContext = createContext();

export const usePostFormAPI = () => {
  const context = useContext(PostFormAPIContext);
  if (!context) {
    throw new Error("usePostFormAPI must be used within a PostFormAPIProvider");
  }
  return context;
};

export const PostFormAPIProvider = ({ children }) => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;
  const [selectedImages, setSelectedImages] = useState([]);
  const token = sessionStorage.getItem("token");

  const uploadImage = useCallback(async (file, userno) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(
        `${SpringbaseUrl}/board/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          params: { userno },
        }
      );
      if (response.data && response.data.imageUrl) {
        return response.data.imageUrl;
      } else {
        console.error("Invalid response format:", response.data);
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data);
      }
      throw error;
    }
  }, [SpringbaseUrl, token]);

  const submitPost = useCallback(async (title, content, userData, categoryno) => {
    try {
      console.log("Submitting post with data:", { title, content, userData, categoryno });

      if (!userData || !userData.apiData) {
        throw new Error("사용자 데이터가 없습니다");
      }

      const imageUrls = extractImageUrls(content);
      console.log("Extracted image URLs:", imageUrls);

      const postData = {
        title,
        content,
        insertuserno: userData.apiData.userno,
        modifyuserno: userData.apiData.userno,
        categoryno,
        imageUrls,
      };

      console.log("Post data being sent to server:", JSON.stringify(postData, null, 2));

      const response = await axios.post(
        `${SpringbaseUrl}/board/boardwrite`,
        postData,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("게시물 생성 중 오류 발생:", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data);
        console.error("서버 상태 코드:", error.response.status);
        console.error("서버 헤더:", error.response.headers);
      }
      throw error;
    }
  }, [SpringbaseUrl, token]);

  const value = {
    submitPost,
    uploadImage,
    selectedImages,
    setSelectedImages,
  };

  return (
    <PostFormAPIContext.Provider value={value}>
      {children}
    </PostFormAPIContext.Provider>
  );
};