declare module "react-office-viewer" {
  import { FC } from "react";

  interface ViewerProps {
    file: string | File;
    fileName?: string;
    locale?: "zh" | "en";
    width?: string | number;
    height?: string | number;
    timeout?: number;
  }

  export const SheetViewer: FC<ViewerProps>;
  export const PdfViewer: FC<ViewerProps>;
  export const DocxViewer: FC<ViewerProps>;
  const Viewer: FC<ViewerProps>;
  export default Viewer;
}
