import React, { createContext, useContext, useCallback } from 'react';
import axios from 'axios';
import store from '../../redux/Store';
import Quill from 'quill';

const PostFormAPIContext = createContext();

export const usePostFormAPI = () => {
  return useContext(PostFormAPIContext);
};

export const PostFormAPIProvider = ({ children }) => {
  const SpringbaseUrl = store.getState().url.SpringbaseUrl;

  const uploadImage = useCallback(async (file, userno) => {
    try {
      console.log(userno);
      const formData = new FormData();
      formData.append('image', file);
      const response = await axios.post(`${SpringbaseUrl}/board/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: { userno }
      });
      return response.data.imageUrl;
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      throw error;
    }
  }, [SpringbaseUrl]);

  const processImage = useCallback(async (imageData) => {
    if (imageData.startsWith('data:image')) {
      const file = dataURLtoFile(imageData, 'image.png');
      return await uploadImage(file);
    }
    return imageData;
  }, [uploadImage]);

  // 중복된 uploadImage 함수 제거

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

  const submitPost = useCallback(async (title, content, userData) => {
    if (!userData || !userData.apiData) {
      throw new Error('사용자 데이터가 없습니다');
    }
  
    try {
      const processedContent = await processContent(content);
      const htmlContent = convertToHtml(processedContent);
      
      // 이미지 URL들을 추출
      const imageUrls = extractImageUrls(htmlContent);
      
      const postData = {
        title,
        content: htmlContent,
        insertuserno: userData.apiData.userno,
        modifyuserno: userData.apiData.userno,
        imageUrls: imageUrls // 추출된 이미지 URL들을 함께 전송
      };
  
      const response = await axios.post(`${SpringbaseUrl}/board/freeboardwrite`, postData);
      return response.data;
    } catch (error) {
      console.error('게시물 생성 중 오류 발생:', error);
      throw error;
    }
  }, [SpringbaseUrl, processContent]);
  
  // HTML 내용에서 이미지 URL을 추출하는 함수
  const extractImageUrls = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.getElementsByTagName('img');
    return Array.from(images).map(img => img.src);
  };
  
  const convertToHtml = (delta) => {
    const tempContainer = document.createElement('div');
    const quill = new Quill(tempContainer);
    quill.setContents(delta);
    return quill.root.innerHTML;
  };

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

  return (
    <PostFormAPIContext.Provider value={{ submitPost, uploadImage }}>
      {children}
    </PostFormAPIContext.Provider>
  );
};