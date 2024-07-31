import React from 'react';
import { useLocation } from 'react-router-dom';
import Comm_PostList from '../components/board/Community/Comm_PostList';
import Comm_PostForm from '../components/board/Community/Comm_PostForm';
import Comm_PostRead from '../components/board/Community/Comm_PostRead';
import Ann_PostList from '../components/board/Announcements/Ann_PostList';
import Ann_PostForm from '../components/board/Announcements/Ann_PostForm';
import Ann_PostRead from '../components/board/Announcements/Ann_PostRead';
import Info_PostList from '../components/board/Information/Info_PostList';
import Info_PostForm from '../components/board/Information/Info_PostForm';
import Info_PostRead from '../components/board/Information/Info_PostRead';
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
                return <Comm_PostForm />;
            case 'Comm_PostRead':
                return <Comm_PostRead />;
            case 'Comm_PostList':
                return <Comm_PostList />;

            case 'Ann_PostForm':
                return <Ann_PostForm />;
            case 'Ann_PostRead':
                return <Ann_PostRead />;
            case 'Ann_PostList':
                return <Ann_PostList />;

            case 'Info_PostForm':
                return <Info_PostForm />;
            case 'Info_PostRead':
                return <Info_PostRead />;
            case 'Info_PostList':
                return <Info_PostList />;
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