import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostFormAPI } from '../../contexts/board/Board_Comm_PostFormApi';

export const useBoardComm_PostForm = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { submitPost, uploadImage } = usePostFormAPI();
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  const getUserNo = useCallback(() => {
    if (!userData || !userData.apiData) {
      throw new Error('User data is not available');
    }
    console.log("111111111",userData.apiData.userno)
    return userData.apiData.userno;
  }, [userData]);

  const useImageUpload = (quillRef) => {
    return useCallback(() => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
  
      input.onchange = async () => {
        const file = input.files[0];
        try {
          const userNo = getUserNo();
          console.log("2222222222",userNo)
          const imageUrl = await uploadImage(file, userNo);
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', imageUrl);
        } catch (error) {
          console.error('Error handling image upload:', error);
        }
      };
    }, [quillRef, getUserNo, uploadImage]);
  };

  const handleSubmit = useCallback(async (title, content) => {
    try {
      // Pass the entire userData object, not just userNo
      await submitPost(title, content, userData);
      // navigate('/BoardPage?type=Comm_PostList');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }, [userData, submitPost, navigate]);

  const handleImageUpload = useCallback(async (file) => {
    try {
      const userNo = getUserNo();
      console.log("2222222222",userNo)
      const imageUrl = await uploadImage(file, userNo);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }, [getUserNo, uploadImage]);

  return {
    title,
    setTitle,
    handleSubmit,
    handleImageUpload,
    useImageUpload,
    getUserNo,
  };
};
