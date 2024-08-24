import React from 'react';
import { useLocation } from 'react-router-dom';
import CommPostList from '../components/board/Community/Comm_PostList';
import CommPostForm from '../components/board/Community/Comm_PostForm';
import CommPostRead from '../components/board/Community/Comm_PostRead';
import CommPostModify from '../components/board/Community/Comm_PostModify';
import AnnPostList from '../components/board/Announcements/Ann_PostList';
import AnnPostForm from '../components/board/Announcements/Ann_PostForm';
import AnnPostRead from '../components/board/Announcements/Ann_PostRead';
import AnnPostModify from '../components/board/Announcements/Ann_PostModify';
import BoardMain from '../components/board/BoardMain';
import BoardSideBar from '../components/board/BoardSideBar';
import '../assets/styles/board/BoardPage.scss';

function BoardPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    const renderContent = () => {
        switch(type) {
            case 'Comm_PostForm':
                return <CommPostForm />;
            case 'Comm_PostRead':
                return <CommPostRead />;
            case 'Comm_PostList':
                return <CommPostList />;
            case 'Comm_PostModify':
                return <CommPostModify />;    

            case 'Ann_PostForm':
                return <AnnPostForm />;
            case 'Ann_PostRead':
                return <AnnPostRead />;
            case 'Ann_PostList':
                return <AnnPostList />;
            case 'Ann_PostModify':
                return <AnnPostModify />;

            default:
                return <BoardMain />;
        }
    };

    return (
        <div className="board-page">
            <BoardSideBar />
            <div className="board-main-content">
                {/* <h1>Community</h1> */}
                {renderContent()}
            </div>
        </div>
    );
}

export default BoardPage;