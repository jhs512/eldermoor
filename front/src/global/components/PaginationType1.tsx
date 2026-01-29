import Link from "next/link";

import { usePagination } from "@/global/hooks/usePagination";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  const hasPreviousPage = currentPageNumber > 1;
  const hasNextPage = currentPageNumber < totalPages;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hasPreviousPage ? pageButtonUrl(currentPageNumber - 1) : "#"}
            aria-disabled={!hasPreviousPage}
            className={!hasPreviousPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={pageButtonUrl(1)}
            isActive={currentPageNumber === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {prevEllipsisButtonPageNumber && (
          <PaginationItem>
            <Link href={pageButtonUrl(prevEllipsisButtonPageNumber)}>
              <PaginationEllipsis />
            </Link>
          </PaginationItem>
        )}

        {middlePages.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href={pageButtonUrl(pageNum)}
              isActive={pageNum === currentPageNumber}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {nextEllipsisButtonPageNumber && (
          <PaginationItem>
            <Link href={pageButtonUrl(nextEllipsisButtonPageNumber)}>
              <PaginationEllipsis />
            </Link>
          </PaginationItem>
        )}

        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              href={pageButtonUrl(totalPages)}
              isActive={currentPageNumber === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={hasNextPage ? pageButtonUrl(currentPageNumber + 1) : "#"}
            aria-disabled={!hasNextPage}
            className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
