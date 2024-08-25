import React, { createContext, useContext, useCallback, useState } from "react";
import axios from "axios";
import store from "../../redux/Store";
import { convertToHtml, extractImageUrls } from "../../components/board/BoardUtil";

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

  const uploadImage = useCallback(
    async (file, userno) => {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await axios.post(
          `${SpringbaseUrl}/board/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: { userno },
          }
        );
        return response.data.imageUrl;
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        throw error;
      }
    },
    [SpringbaseUrl]
  );

  const submitPost = useCallback(
    async (title, content, userData, categoryno) => {
      if (!userData || !userData.apiData) {
        throw new Error("사용자 데이터가 없습니다");
      }

      try {
        const htmlContent = convertToHtml(content);
        const imageUrls = extractImageUrls(htmlContent);

        const postData = {
          title,
          content: htmlContent,
          insertuserno: userData.apiData.userno,
          modifyuserno: userData.apiData.userno,
          categoryno,
          imageUrls: imageUrls,
        };

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
        return response.data;
      } catch (error) {
        console.error("게시물 생성 중 오류 발생:", error);
        throw error;
      }
    },
    [SpringbaseUrl, token]
  );

  const handleImageSelect = useCallback((imageData) => {
    setSelectedImages((prev) => [...prev, imageData]);
  }, []);

  const value = {
    submitPost,
    uploadImage,
    handleImageSelect,
    selectedImages,
  };

  return (
    <PostFormAPIContext.Provider value={value}>
      {children}
    </PostFormAPIContext.Provider>
  );
};
