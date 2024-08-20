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

  const submitPost = useCallback(async (title, content, userData) => {
    if (!userData || !userData.apiData) {
      throw new Error('User data is not available');
    }
  
    try {
      const processedContent = await processContent(content);
      const htmlContent = convertToHtml(processedContent); // 새로운 함수
      const response = await axios.post(`${SpringbaseUrl}/board/freeboardwrite`, {
        title,
        content: htmlContent, // HTML 문자열로 변환된 내용
        insertuserno: userData.apiData.userno,
        modifyuserno: userData.apiData.userno,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }, [SpringbaseUrl]);
  
  // Delta 형식을 HTML로 변환하는 함수
  const convertToHtml = (delta) => {
    const tempContainer = document.createElement('div');
    const quill = new Quill(tempContainer);
    quill.setContents(delta);
    return quill.root.innerHTML;
  };

  const uploadImage = useCallback(async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await axios.post(`${SpringbaseUrl}/board/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }, [SpringbaseUrl]);

  const processContent = async (content) => {
    const processedOps = await Promise.all(content.ops.map(async (op) => {
      if (op.insert && typeof op.insert === 'object' && op.insert.image) {
        // 이미지 처리
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
  };

  const processImage = async (imageData) => {
    if (imageData.startsWith('data:image')) {
      // base64 이미지를 서버로 업로드하고 URL을 반환
      const file = dataURLtoFile(imageData, 'image.png');
      return await uploadImage(file);
    }
    return imageData;  // 이미 URL인 경우 그대로 반환
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