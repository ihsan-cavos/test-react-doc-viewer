import type { DocRenderer } from "@iamjariwala/react-doc-viewer";

const OfficeIframeRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  if (!currentDocument?.uri) return null;

  const src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(currentDocument.uri)}`;

  return (
    <iframe
      src={src}
      style={{ width: "100%", height: "100%", border: "none" }}
      title="Office document viewer"
    />
  );
};

OfficeIframeRenderer.fileTypes = [
  "pptx",
  "ppt",
  "odt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
  "application/vnd.oasis.opendocument.text",
];
OfficeIframeRenderer.weight = 2;

export default OfficeIframeRenderer;
