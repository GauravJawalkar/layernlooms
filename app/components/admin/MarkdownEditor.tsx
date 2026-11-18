"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { Loader2 } from "lucide-react";

const emptySubscribe = () => () => {};
const mobileQuery = "(max-width: 767px)";
const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia(mobileQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getIsMobile = () => window.matchMedia(mobileQuery).matches;

const subscribeColorMode = (cb: () => void) => {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};
const getColorMode = (): "light" | "dark" =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

export default function MarkdownEditor({ value, onChange, height = 400 }: Props) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isMobile = useSyncExternalStore(subscribeMobile, getIsMobile, () => false);
  const colorMode = useSyncExternalStore(subscribeColorMode, getColorMode, () => "light");

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
        preview={isMobile ? "edit" : "live"}
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
