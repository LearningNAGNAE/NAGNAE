import React, { createContext, useContext } from 'react';
import { usePostForm } from '../../contexts/board/Board_Comm_PostFormApi';

const PostFormContext = createContext();

export const usePostFormContext = () => useContext(PostFormContext);

export const PostFormProvider = ({ children }) => {
  const postFormHook = usePostForm();

  return (
    <PostFormContext.Provider value={postFormHook}>
      {children}
    </PostFormContext.Provider>
  );
};