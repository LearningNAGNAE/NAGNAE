import React, { createContext, useContext, useCallback, useState } from "react";
import axios from "axios";
import store from "../../redux/Store";
import {
  convertToHtml,
  extractImageUrls,
} from "../../components/board/BoardUtil";

const PostModifyAPIContext = createContext();

export const usePostModifyAPI = () => {
  const context = useContext(PostModifyAPIContext);
  if (!context) {
    throw new Error(
      "usePostModifyAPI must be used within a PostModifyAPIProvider"
    );
  }
  return context;
};

export const PostModifyAPIProvider = ({ children }) => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;
  const [selectedImages, setSelectedImages] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

const updatePost = useCallback(
    async (boardno, title, content, userData, categoryno) => {
      console.log("updatePost called with:", { boardno, title, content, userData, categoryno });
      if (!userData || !userData.apiData) {
        console.error("Invalid userData:", userData);
        throw new Error("사용자 데이터가 없습니다");
      }

      // 토큰 디버깅
      console.log("Token from userData:", token);

      try {
        const htmlContent = convertToHtml(content);
        const imageUrls = extractImageUrls(htmlContent);

        const postData = {
          boardno,
          title,
          content: htmlContent,
          modifyuserno: userData.apiData.userno,
          imageUrls: imageUrls,
        };

        console.log("Request data:", postData);
        console.log("Request headers:", {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        });

        const response = await axios.put(
          `${SpringbaseUrl}/board/boardupdate`,
          postData,
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Update response:", response.data);
        return response.data;
      } catch (error) {
        console.error("게시물 수정 중 오류 발생:", error);
        console.error("Error response:", error.response);
        throw error;
      }
    },
    [SpringbaseUrl]
  );

  const fetchPost = useCallback(
    async (boardno) => {
      if (!boardno) {
        console.error("boardno is undefined");
        return null;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${SpringbaseUrl}/board/boardread`, {
          params: { boardno },
        });
        console.log("API Response:", response.data); // 전체 응답 로깅
        if (response.data) {
          return response.data.data; 
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [SpringbaseUrl]
  );
  const handleImageSelect = useCallback((imageData) => {
    setSelectedImages((prev) => [...prev, imageData]);
  }, []);

  const value = {
    updatePost,
    uploadImage,
    handleImageSelect,
    selectedImages,
    fetchPost,
  };

  return (
    <PostModifyAPIContext.Provider value={value}>
      {children}
    </PostModifyAPIContext.Provider>
  );
};
