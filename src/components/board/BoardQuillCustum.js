import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import "../../assets/styles/board/quillstyle.css";
import ImageResize from 'quill-image-resize';

Quill.register('modules/ImageResize', ImageResize);

function imageHandler() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    
    // 이미지 업로드 함수 호출
    const url = await handleImageUpload(file);

    if (url) {
      // 이미지 URL을 에디터에 삽입
      const range = this.quill.getSelection();
      this.quill.insertEmbed(range.index, 'image', url);
    } else {
      console.error('Failed to upload image.');
    }
  };
}

// Size와 Font 설정
const Size = Quill.import("formats/size");
Size.whitelist = ["small", "medium", "large", "huge"];
Quill.register(Size, true);

const Font = Quill.import("attributors/class/font");
Font.whitelist = ["arial", "buri", "gangwon"];
Quill.register(Font, true);

// QuillToolbar 컴포넌트
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

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

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
          toolbar: '#toolbar',
          history: {
            delay: 1000,
            maxStack: 500,
            userOnly: true
          },
          handlers: {
            image: imageHandler // 이미지 핸들러 추가
          },    
          ImageResize: {
            parchment: Quill.import('parchment')
          }
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
  }
);

Editor.displayName = 'Editor';

export default Editor;