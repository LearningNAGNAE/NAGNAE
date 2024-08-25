import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../../assets/styles/board/quillstyle.css";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "medium", "large", "huge"];
Quill.register(Size, true);

const Font = Quill.import("attributors/class/font");
Font.whitelist = ["arial", "buri", "gangwon"];
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

const BoardQuillCustom = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onImageUpload }, ref) => {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useImperativeHandle(ref, () => ({
      getEditor: () => quillInstance.current,
    }));

    const imageHandler = useCallback(() => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (file) {
          try {
            const range = quillInstance.current.getSelection(true);
            const reader = new FileReader();
            reader.onload = async (e) => {
              const tempImageUrl = e.target.result;
              quillInstance.current.insertEmbed(
                range.index,
                "image",
                tempImageUrl
              );

              try {
                const uploadedImageUrl = await onImageUpload(file);
                quillInstance.current.deleteText(range.index, 1);
                quillInstance.current.insertEmbed(
                  range.index,
                  "image",
                  uploadedImageUrl
                );
              } catch (error) {
                console.error("Error uploading image:", error);
                quillInstance.current.deleteText(range.index, 1);
                quillInstance.current.insertText(
                  range.index,
                  "Image upload failed",
                  {
                    color: "red",
                    italic: true,
                  }
                );
              }
            };
            reader.readAsDataURL(file);
          } catch (error) {
            console.error("Error handling image:", error);
          }
        }
      };
    }, [onImageUpload]);

    useEffect(() => {
      if (!quillInstance.current) {
        quillInstance.current = new Quill(editorRef.current, {
          modules: {
            toolbar: {
              container: "#toolbar",
              handlers: {
                image: imageHandler,
              },
            },
            history: {
              delay: 1000,
              maxStack: 500,
              userOnly: true,
            },
            imageResize: {
              parchment: Quill.import("parchment"),
              modules: ["Resize", "DisplaySize"],
            },
          },
          theme: "snow",
        });

        if (defaultValue) {
          quillInstance.current.root.innerHTML = defaultValue;
        }

        quillInstance.current.on("text-change", () => {
          if (onTextChange) {
            onTextChange(quillInstance.current.root.innerHTML);
          }
        });
      }
    }, [defaultValue, onTextChange, imageHandler]);

    useEffect(() => {
      if (quillInstance.current) {
        quillInstance.current.enable(!readOnly);
      }
    }, [readOnly]);

    return (
      <div>
        <QuillToolbar />
        <div ref={editorRef} className="quill-editor"></div>
      </div>
    );
  }
);

BoardQuillCustom.displayName = "BoardQuillCustom";

export default BoardQuillCustom;
