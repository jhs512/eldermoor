import type { SVGProps } from "react";

export default function Unicorn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Horn */}
      <path d="M12 2L10 8" />
      {/* Head */}
      <path d="M10 8C10 8 8 8 7 10C6 12 7 14 9 14" />
      {/* Ear */}
      <path d="M10 8L11 6L12 8" />
      {/* Mane */}
      <path d="M12 8C12 8 14 9 14 12C14 14 13 16 12 17" />
      {/* Body */}
      <path d="M9 14C9 14 6 15 5 17C4 19 5 20 7 20" />
      <path d="M12 17C12 17 14 18 15 20" />
      {/* Legs */}
      <path d="M7 20L7 22" />
      <path d="M10 20L10 22" />
      <path d="M13 20L13 22" />
      <path d="M15 20L16 22" />
      {/* Tail */}
      <path d="M15 20C17 19 18 17 17 15" />
    </svg>
  );
}