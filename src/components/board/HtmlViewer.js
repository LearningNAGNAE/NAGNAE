import React from 'react';
import DOMPurify from 'dompurify';
import 'quill/dist/quill.snow.css'; // Quill의 스타일을 import
import "../../assets/styles/board/quillstyle.css";

const HtmlViewer = ({ html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  const modifiedHtml = sanitizedHtml.replace(
    /src="\/upload\//g,
    'src="http://localhost:9000/upload/'
  );

  return (
    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: modifiedHtml }} />
  );
};

export default HtmlViewer;