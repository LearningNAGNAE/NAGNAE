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

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  };

  const processImage = useCallback(async (imageData) => {
    if (imageData.startsWith('data:image')) {
      const file = dataURLtoFile(imageData, 'image.png');
      return await uploadImage(file);
    }
    return imageData;
  }, [uploadImage]);

  const processContent = useCallback(async (content) => {
    if (!content || !content.ops) {
      throw new Error('잘못된 콘텐츠 형식입니다');
    }
    const processedOps = await Promise.all(content.ops.map(async (op) => {
      if (op.insert && typeof op.insert === 'object' && op.insert.image) {
        const imageUrl = await processImage(op.insert.image);
        return {
          ...op,
          insert: {
            image: imageUrl
          }
        };
      }
      return op;
    }));

    return { ops: processedOps };
  }, [processImage]);


  const submitPost = useCallback(
    async (title, content, userData, categoryno) => {
      if (!userData || !userData.apiData) {
        throw new Error("사용자 데이터가 없습니다");
      }

      try {
        const processedContent = await processContent(content);
        const htmlContent = convertToHtml(processedContent);
        console.log(content);
        console.log(htmlContent);
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
    [SpringbaseUrl, token,processContent]
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
