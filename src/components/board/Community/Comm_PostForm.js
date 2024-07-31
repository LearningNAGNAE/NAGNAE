// src/components/PostForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Comm_PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, date: new Date().toISOString().split('T')[0], hits: 0 });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <Link to="/BoardPage?type=Comm_PostList">목록</Link>
      <button type="submit">Write</button>
    </form>
  );
}

export default Comm_PostForm;