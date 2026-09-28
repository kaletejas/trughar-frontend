"use client";
import { usePwaInstall } from "@/lib/pwaInstall";

interface PwaInstallButtonProps {
  text?: string;
  className?: string;
}

export default function PwaInstallButton({ text = "Install TruGhar", className = "" }: PwaInstallButtonProps) {
  const { canInstall, install } = usePwaInstall();

  if (!canInstall) return null;

  return (
    <button
      type="button"
      onClick={install}
      className={`flex items-center gap-2 cursor-pointer ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      {text}
    </button>
  );
}
