import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
import '../../assets/styles/board/quillstyle.css';

Quill.register('modules/ImageResize', ImageResize);

const Size = Quill.import('formats/size');
Size.whitelist = ['small', 'medium', 'large', 'huge'];
Quill.register(Size, true);

const Font = Quill.import('attributors/class/font');
Font.whitelist = ['arial', 'buri', 'gangwon'];
Quill.register(Font, true);

const QuillToolbar = () => (
  <div id="toolbar">
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
  </div>
);

const Editor = forwardRef(({ readOnly, defaultValue, onTextChange, onSelectionChange, onImageSelect }, ref) => {
  const containerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

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
        toolbar: '#toolbar',
        history: {
          delay: 1000,
          maxStack: 500,
          userOnly: true
        },
        ImageResize: {
          parchment: Quill.import('parchment')
        }
      },
      theme: 'snow'
    });

    quill.getModule('toolbar').addHandler('image', () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
    
      input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const range = quill.getSelection();
          const tempUrl = e.target.result;
          quill.insertEmbed(range.index, 'image', tempUrl);
          onImageSelect({ file, tempUrl });
        };
        reader.readAsDataURL(file);
      };
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
  }, [ref, onImageSelect]);

  return (
    <div>
      <QuillToolbar />
      <div ref={containerRef}></div>
    </div>
  );
});

Editor.displayName = 'Editor';

export default Editor;