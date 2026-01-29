import Link from "next/link";

import { usePagination } from "@/global/hooks/usePagination";

export interface PaginationProps {
  className?: string;
  baseQueryString: string;
  totalPages: number;
  currentPageNumber: number;
  paginationArmSize?: number;
}

export default function PaginationType1({
  className,
  baseQueryString,
  totalPages,
  currentPageNumber,
  paginationArmSize = 1,
}: PaginationProps) {
  const {
    pageButtonUrl,
    prevEllipsisButtonPageNumber,
    nextEllipsisButtonPageNumber,
    middlePages,
  } = usePagination({
    baseQueryString,
    totalPages,
    currentPageNumber,
    paginationArmSize,
  });

  if (totalPages <= 1) return null;

  const renderPageLink = (pageNum: number) => (
    <Link
      key={pageNum}
      href={pageButtonUrl(pageNum)}
      style={{
        marginRight: "10px",
        fontWeight: pageNum === currentPageNumber ? "bold" : "normal",
      }}
    >
      {pageNum}
    </Link>
  );

  return (
    <nav className={className} style={{ marginTop: "20px" }}>
      {renderPageLink(1)}

      {prevEllipsisButtonPageNumber && (
        <Link
          href={pageButtonUrl(prevEllipsisButtonPageNumber)}
          style={{ marginRight: "10px" }}
        >
          ...
        </Link>
      )}

      {middlePages.map((pageNum) => renderPageLink(pageNum))}

      {nextEllipsisButtonPageNumber && (
        <Link
          href={pageButtonUrl(nextEllipsisButtonPageNumber)}
          style={{ marginRight: "10px" }}
        >
          ...
        </Link>
      )}

      {renderPageLink(totalPages)}
    </nav>
  );
}
