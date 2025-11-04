"use client";

import { useEffect, useRef, useState } from "react";

export default function PanoramaModal({
  open,
  onClose,
  imageUrl,
}: {
  open: boolean;
  onClose: () => void;
  imageUrl: string | null;
}) {
  const [mounted, setMounted] = useState(false);
  const viewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Mark client hydration complete
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !open || !imageUrl) return;
    if (typeof window === "undefined") return;

    // Load pannellum dynamically
    const existingCss = document.getElementById("pannellum-css");
    const existingScript = document.getElementById("pannellum-script");

    const initViewer = () => {
      try {
        // @ts-ignore
        viewerRef.current = window.pannellum.viewer(containerRef.current, {
          type: "equirectangular",
          panorama: imageUrl,
          autoLoad: true,
          showZoomCtrl: true,
          compass: false,
        });
      } catch (err) {
        console.error("Failed to load 360 view:", err);
      }
    };

    // @ts-ignore
    if (existingScript && window.pannellum) {
      initViewer();
      return;
    }

    if (!existingCss) {
      const link = document.createElement("link");
      link.id = "pannellum-css";
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.id = "pannellum-script";
    script.src =
      "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    script.async = true;
    script.onload = initViewer;
    document.body.appendChild(script);

    return () => {
      if (viewerRef.current?.destroy) viewerRef.current.destroy();
    };
  }, [mounted, open, imageUrl]);

  // ✅ Avoid hydration mismatch
  if (!mounted) return null;
  if (!open || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="relative w-[90vw] h-[75vh] bg-black rounded-lg overflow-hidden">
        <div ref={containerRef} className="w-full h-full" />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded shadow text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
