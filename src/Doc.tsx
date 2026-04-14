import { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";
import XlsxRenderer from "./XlsxRenderer";
import DocxRenderer from "./DocxRenderer";
import OfficeIframeRenderer from "./OfficeIframeRenderer";

const FILE_TYPES = [
  { label: "PDF",                value: "pdf"  },
  { label: "CSV",                value: "csv"  },
  { label: "Image",              value: "png"  },
  { label: "Excel (.xlsx)",      value: "xlsx" },
  { label: "Excel (.xls)",       value: "xls"  },
  { label: "Word (.docx)",       value: "docx" },
  { label: "Word (.doc)",        value: "doc"  },
  { label: "PowerPoint (.pptx)", value: "pptx" },
  { label: "PowerPoint (.ppt)",  value: "ppt"  },
  { label: "ODT",                value: "odt"  },
];

const Doc = () => {
  const [input, setInput]           = useState("");
  const [fileType, setFileType]     = useState(FILE_TYPES[0].value);
  const [link, setLink]             = useState("");
  const [activeType, setActiveType] = useState(FILE_TYPES[0].value);

  const handleLoad = () => {
    if (input.trim()) {
      setLink(input.trim());
      setActiveType(fileType);
    }
  };

  const handleClear = () => {
    setLink("");
    setInput("");
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", padding: "32px 24px", maxWidth: "960px", margin: "0 auto", fontFamily: "sans-serif", boxSizing: "border-box" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px", color: "#ffffff", flexShrink: 0 }}>Online</h1>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexShrink: 0 }}>
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", background: "#fff", color: "#111", cursor: "pointer" }}
        >
          {FILE_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter document URL"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }}
        />
        <button
          onClick={handleLoad}
          style={{ padding: "8px 18px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 500 }}
        >
          Load
        </button>
        <button
          onClick={handleClear}
          style={{ padding: "8px 18px", borderRadius: "6px", border: "1px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer", fontSize: "14px" }}
        >
          Clear
        </button>
      </div>

      {link ? (
        <div style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <DocViewer
            documents={[{ uri: link, fileType: activeType }]}
            pluginRenderers={[XlsxRenderer, DocxRenderer, OfficeIframeRenderer, ...DocViewerRenderers]}
          />
        </div>
      ) : (
        <p style={{ color: "#9ca3af", fontSize: "14px" }}>Select a file type, enter a URL and click Load.</p>
      )}
    </div>
  );
};

export default Doc;
