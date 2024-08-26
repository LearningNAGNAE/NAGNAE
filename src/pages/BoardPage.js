import React from "react";
import { useLocation } from "react-router-dom";
import { PostFormAPIProvider } from "../contexts/board/Board_PostFormApi";
import { PostModifyAPIProvider } from "../contexts/board/Board_PostModifyApi";
import CommPostList from "../components/board/Community/Comm_PostList";
import CommPostForm from "../components/board/Community/Comm_PostForm";
import PostRead from "../components/board/Board_PostRead";
import CommPostModify from "../components/board/Community/Comm_PostModify";
import AnnPostList from "../components/board/Announcements/Ann_PostList";
import BoardMain from "../components/board/BoardMain";
import BoardSideBar from "../components/board/BoardSideBar";
import "../assets/styles/board/BoardPage.scss";

function BoardPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const boardno = queryParams.get("boardno");

  const renderContent = () => {
    switch (type) {
      case "Comm_PostForm":
        return (
          <PostFormAPIProvider>
            <CommPostForm />
          </PostFormAPIProvider>
        );
      case "Board_PostRead":
        return <PostRead />;
      case "Comm_PostList":
        return <CommPostList />;
      case "Comm_PostModify":
        return (
          <PostModifyAPIProvider>
            <CommPostModify board_no={boardno} />
          </PostModifyAPIProvider>
        );

      case "Ann_PostList":
        return <AnnPostList />;

      default:
        return <BoardMain />;
    }
  };

  return (
    <div className="board-page">
      <BoardSideBar />
      <div className="board-main-content">{renderContent()}</div>
    </div>
  );
}

export default BoardPage;
