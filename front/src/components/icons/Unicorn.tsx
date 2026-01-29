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
      {/* Cute round face */}
      <circle cx="12" cy="14" r="8" />
      {/* Horn */}
      <path d="M12 6L10.5 2L13.5 2Z" fill="currentColor" />
      {/* Ears */}
      <path d="M6 9L4 5L8 8" />
      <path d="M18 9L20 5L16 8" />
      {/* Big cute eyes */}
      <circle cx="9" cy="13" r="1.5" fill="currentColor" />
      <circle cx="15" cy="13" r="1.5" fill="currentColor" />
      {/* Cute smile */}
      <path d="M9 17C10 18 14 18 15 17" />
    </svg>
  );
}