import React from 'react';
import LegalVisaMessage from './ChatLegalVisaMessage';
// 다른 메시지 컴포넌트들은 주석 처리
// import MedicalMessage from './ChatMedicalMessage';
// import AcademicMessage from './ChatStudyMessage';
// import EmploymentMessage from './ChatJobMessage';

const MessageSelector = ({ message, categoryNo }) => {
  switch(categoryNo) {
    case 1: // LegalVisa 카테고리
      return <LegalVisaMessage message={message} />;
    // 다른 카테고리 케이스들은 주석 처리
    // case 2:
    //   return <MedicalMessage message={message} />;
    // case 3:
    //   return <AcademicMessage message={message} />;
    // case 4:
    //   return <EmploymentMessage message={message} />;
    default:
      return <div>Unknown category</div>;
  }
};

export default MessageSelector;
