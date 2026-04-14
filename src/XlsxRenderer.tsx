import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import type { DocRenderer } from "@iamjariwala/react-doc-viewer";

type SheetData = (string | number | boolean)[][];

const XlsxRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  const [sheets, setSheets] = useState<Record<string, SheetData>>({});
  const [activeSheet, setActiveSheet] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentDocument?.uri) return;
    setSheets({});
    setActiveSheet("");
    setError("");

    fetch(currentDocument.uri)
      .then((r) => r.arrayBuffer())
      .then((buf) => {
        const wb = XLSX.read(buf, { type: "array" });
        const parsed: Record<string, SheetData> = {};
        wb.SheetNames.forEach((name) => {
          parsed[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 }) as SheetData;
        });
        setSheets(parsed);
        setActiveSheet(wb.SheetNames[0]);
      })
      .catch(() => setError("Failed to load file."));
  }, [currentDocument?.uri]);

  if (error) return <p style={{ color: "red", padding: "16px" }}>{error}</p>;
  if (!activeSheet) return <p style={{ padding: "16px", color: "#9ca3af" }}>Loading…</p>;

  const rows = sheets[activeSheet] ?? [];
  const sheetNames = Object.keys(sheets);

  return (
    <div style={{ fontFamily: "sans-serif", height: "100%", display: "flex", flexDirection: "column" }}>
      {sheetNames.length > 1 && (
        <div style={{ display: "flex", gap: "4px", padding: "8px 12px", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
          {sheetNames.map((name) => (
            <button
              key={name}
              onClick={() => setActiveSheet(name)}
              style={{
                padding: "4px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                background: activeSheet === name ? "#2563eb" : "#f3f4f6",
                color: activeSheet === name ? "#fff" : "#111",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
      <div style={{ overflowX: "auto", overflowY: "auto", flex: 1 }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri === 0 ? "#f8fafc" : ri % 2 === 0 ? "#fff" : "#f9fafb" }}>
                {(row as (string | number | boolean)[]).map((cell, ci) => {
                  const Tag = ri === 0 ? "th" : "td";
                  return (
                    <Tag
                      key={ci}
                      style={{
                        border: "1px solid #e5e7eb",
                        padding: "6px 12px",
                        textAlign: "left",
                        fontWeight: ri === 0 ? 600 : 400,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {String(cell ?? "")}
                    </Tag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

XlsxRenderer.fileTypes = [
  "xlsx",
  "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];
XlsxRenderer.weight = 2;

export default XlsxRenderer;
