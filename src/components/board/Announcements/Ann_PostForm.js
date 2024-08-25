import React from "react";
import { useBoard_PostForm } from "../../../hooks/board/useBoard_PostForm";
import { PostFormAPIProvider } from "../../../contexts/board/Board_PostFormApi";
import CommonPostForm from "../Common_PostForm";
import "../../../assets/styles/board/Announcements/Ann_PostForm.scss";

function Ann_PostForm() {
  const { title, setTitle, handleSubmit, handleImageUpload } =
    useBoard_PostForm();

  return (
    <PostFormAPIProvider>
      <div className="ann-form-container">
        <CommonPostForm
          title={title}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
          handleImageUpload={handleImageUpload}
          formType="Announcements"
          listPageUrl="/BoardPage?type=Ann_PostList"
        />
      </div>
    </PostFormAPIProvider>
  );
}

export default Ann_PostForm;
