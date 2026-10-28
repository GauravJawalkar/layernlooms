"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useSyncExternalStore } from "react";
import { Loader2 } from "lucide-react";

const emptySubscribe = () => () => {};

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

export default function MarkdownEditor({ value, onChange, height = 400 }: Props) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    function update() {
      setColorMode(document.documentElement.classList.contains("dark") ? "dark" : "light");
    }
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center border border-border rounded-xl" style={{ height }}>
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div data-color-mode={colorMode}>
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={height}
        preview="live"
        previewOptions={{
          components: {
            img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
              if (!props.src) return null;
              // eslint-disable-next-line @next/next/no-img-element
              return <img alt={alt || ""} {...props} />;
            },
          },
        }}
      />
    </div>
  );
}

