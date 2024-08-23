import React from 'react';
import DOMPurify from 'dompurify';

const HtmlViewer = ({ html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  const modifiedHtml = sanitizedHtml.replace(
    /src="\/upload\//g,
    'src="http://localhost:9000/upload/'
  );

  return <div dangerouslySetInnerHTML={{ __html: modifiedHtml }} />;
};
export default HtmlViewer;