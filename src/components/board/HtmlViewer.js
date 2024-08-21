import React from 'react';

function HtmlViewer({ html }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}

export default HtmlViewer;