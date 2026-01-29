import type { SVGProps } from "react";

export default function Unicorn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Horn */}
      <path d="M12 2L10 9" />
      {/* Head outline */}
      <path d="M10 9C7 9 5 11.5 5 14.5C5 17 6.5 19 9 20L8 22" />
      <path d="M10 9C10 9 11.5 9 13 10C14.5 11 16 13 16 15.5C16 18 14 20 11 20" />
      {/* Mane */}
      <path d="M13 10C14 8 15 7 16 7" />
      <path d="M14 12C15 11 16 10 17 10" />
      {/* Eye */}
      <circle cx="9" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}