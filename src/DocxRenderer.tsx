import { useEffect, useState } from "react";
import mammoth from "mammoth";
import type { DocRenderer } from "@iamjariwala/react-doc-viewer";

const DocxRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentDocument?.uri) return;
    setHtml("");
    setError("");

    fetch(currentDocument.uri)
      .then((r) => r.arrayBuffer())
      .then((buf) => mammoth.convertToHtml({ arrayBuffer: buf }))
      .then((result) => setHtml(result.value))
      .catch(() => setError("Failed to load document."));
  }, [currentDocument?.uri]);

  if (error) return <p style={{ color: "red", padding: "16px" }}>{error}</p>;
  if (!html) return <p style={{ padding: "16px", color: "#9ca3af" }}>Loading…</p>;

  return (
    <div
      style={{ padding: "32px", overflowY: "auto", height: "100%", boxSizing: "border-box", fontFamily: "Georgia, serif", lineHeight: 1.7, color: "#111" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

DocxRenderer.fileTypes = [
  "docx",
  "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];
DocxRenderer.weight = 2;

export default DocxRenderer;
