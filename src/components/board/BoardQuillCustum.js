import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import '../../assets/styles/board/quillstyle.css';
import { usePostFormAPI } from '../../contexts/board/Board_Comm_PostFormApi';

const Size = Quill.import('formats/size');
Size.whitelist = ['small', 'medium', 'large', 'huge'];
Quill.register(Size, true);

const Font = Quill.import('attributors/class/font');
Font.whitelist = ['arial', 'buri', 'gangwon'];
Quill.register(Font, true);

const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="buri">Buri</option>
        <option value="gangwon">Gangwon</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>
      <select className="ql-header">
        <option value="1">Header 1</option>
        <option value="2">Header 2</option>
        <option value="3">Header 3</option>
        <option value="4">Header 4</option>
        <option value="5">Header 5</option>
        <option value="6">Header 6</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-blockquote" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="sub" />
      <button className="ql-script" value="super" />
    </span>
    <span className="ql-formats">
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-clean" />
    </span>
  </div>
);

const Editor = forwardRef(({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
  const containerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);
  const { uploadImage } = usePostFormAPI();

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      try {
        const imageUrl = await uploadImage(file);
        const range = ref.current.getSelection();
        ref.current.insertEmbed(range.index, 'image', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  };

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  }, [onTextChange, onSelectionChange]);

  useEffect(() => {
    if (ref.current) {
      ref.current.enable(!readOnly);
    }
  }, [ref, readOnly]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    );
    editorContainer.className = 'quill-editor';

    const quill = new Quill(editorContainer, {
      modules: {
        toolbar: {
          container: '#toolbar',
          handlers: {
            image: imageHandler
          }
        },
        history: {
          delay: 1000,
          maxStack: 500,
          userOnly: true
        },
      },
      theme: 'snow'
    });

    if (ref) {
      ref.current = quill;
    }

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    quill.on('text-change', (...args) => {
      onTextChangeRef.current?.(...args);
    });

    quill.on('selection-change', (...args) => {
      onSelectionChangeRef.current?.(...args);
    });

    return () => {
      if (ref.current) {
        ref.current = null;
      }
      container.innerHTML = '';
    };
  }, [ref]);

  return (
    <div>
      <QuillToolbar />
      <div ref={containerRef}></div>
    </div>
  );
});

Editor.displayName = 'Editor';

export default Editor;