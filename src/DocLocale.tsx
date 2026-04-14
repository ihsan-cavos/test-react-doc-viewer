import { SheetViewer } from "react-office-viewer";
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

const DocLocale = () => (
  <div style={{ height: "200vh", display: "flex", flexDirection: "column", padding: "32px 24px", maxWidth: "960px", margin: "0 auto", fontFamily: "sans-serif", boxSizing: "border-box" }}>
    <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px", color: "#ffffff", flexShrink: 0 }}>Local</h1>

    <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px", flexShrink: 0 }}>projects.csv</p>
    <div style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", marginBottom: "24px", display: "flex", flexDirection: "column" }}>
      <DocViewer
        documents={[{ uri: "/docs/projects.csv" }]}
        pluginRenderers={DocViewerRenderers}
      />
    </div>

    <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px", flexShrink: 0 }}>test-sheet3.xlsx</p>
    <div style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <SheetViewer file="/docs/test-sheet3.xlsx" locale="en" width="100%" />
    </div>
  </div>
);

export default DocLocale;
