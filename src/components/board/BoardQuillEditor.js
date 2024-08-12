import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quill CSS 스타일을 임포트합니다.

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    // useLayoutEffect를 사용하여 최신 props를 refs에 업데이트합니다.
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    // readOnly prop이 변경될 때 ref의 enable 상태를 업데이트합니다.
    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    // Quill 인스턴스를 설정하고 이벤트 핸들러를 등록합니다.
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );
      
      const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
          ],
        }
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

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = 'Editor';

export default Editor;
