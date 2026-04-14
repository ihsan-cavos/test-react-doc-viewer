import { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

const Doc=()=> {
  const [input, setInput] = useState("")
  const [link, setLink] = useState("")

  const handleSubmit = () => {
    if (input.trim()) setLink(input.trim())
  }

  const docs = [{ uri: link }];

  return(
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", width: "100%", maxWidth: "700px" }}>
        <input
          type="text"
          placeholder="Enter document URL"
          onChange={(e)=> setInput(e.target.value)}
          value={input}
          style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" }}
        />
        <button
          onClick={handleSubmit}
          style={{ padding: "8px 16px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", cursor: "pointer", fontSize: "14px" }}
        >
          Load
        </button>
        <button
          onClick={()=>{ setLink("") ;setInput("") }}
          style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #ccc", background: "#ff0000", cursor: "pointer", fontSize: "14px" }}
        >
          Clear
        </button>
      </div>
      {link ? (
        <div style={{ width: "100%", maxWidth: "900px", border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
          <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
        </div>
      ) : (
        <p style={{ color: "#9ca3af", fontSize: "14px" }}>Enter a document URL and click Load.</p>
      )}
    </div>
    )
}

export default Doc;