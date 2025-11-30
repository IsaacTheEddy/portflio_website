"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure the worker to use the version from unpkg matching the installed pdfjs-dist version
// This avoids issues with local file serving in Next.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  file: string;
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // ResizeObserver to handle responsive width
  if (typeof window !== "undefined" && containerRef && !containerWidth) {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(containerRef);
  }

  return (
    <div
      className="flex w-full max-w-xl items-center justify-center"
      ref={setContainerRef}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="text-white">Loading PDF...</div>}
        error={<div className="text-red-500">Failed to load PDF.</div>}
        className="flex justify-center"
      >
        <Page
          pageNumber={pageNumber}
          width={containerWidth ? Math.min(containerWidth, 1000) : undefined}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}
