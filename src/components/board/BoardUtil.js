import Quill from "quill";

export const convertToHtml = (delta) => {
  const tempContainer = document.createElement("div");
  const quill = new Quill(tempContainer);
  quill.setContents(delta);
  return quill.root.innerHTML;
};

export const extractImageUrls = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const images = doc.getElementsByTagName("img");
  return Array.from(images).map((img) => img.src);
};
