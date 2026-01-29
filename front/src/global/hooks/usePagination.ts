interface UsePaginationProps {
  baseQueryString: string;
  totalPages: number;
  currentPageNumber: number;
  paginationArmSize?: number;
}

export function usePagination({
  baseQueryString,
  totalPages,
  currentPageNumber,
  paginationArmSize = 1,
}: UsePaginationProps) {
  const pageButtonUrl = (pageNumber: number) => {
    const params = new URLSearchParams(baseQueryString);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const calculatePrevEllipsisNumber = () => {
    return currentPageNumber - paginationArmSize - 1 > 2
      ? currentPageNumber - paginationArmSize - 1
      : undefined;
  };

  const calculateNextEllipsisNumber = () => {
    return currentPageNumber + paginationArmSize + 1 < totalPages - 1
      ? currentPageNumber + paginationArmSize + 1
      : undefined;
  };

  const prevEllipsisButtonPageNumber = calculatePrevEllipsisNumber();
  const nextEllipsisButtonPageNumber = calculateNextEllipsisNumber();

  const isInCurrentRange = (pageNum: number) =>
    pageNum >= currentPageNumber - paginationArmSize &&
    pageNum <= currentPageNumber + paginationArmSize;

  const isInStartRange = (pageNum: number) =>
    !prevEllipsisButtonPageNumber && pageNum <= 2;

  const isInEndRange = (pageNum: number) =>
    !nextEllipsisButtonPageNumber && pageNum >= totalPages - 1;

  const middlePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  ).filter(
    (pageNum) =>
      pageNum > 1 &&
      pageNum < totalPages &&
      (isInCurrentRange(pageNum) ||
        isInStartRange(pageNum) ||
        isInEndRange(pageNum)),
  );

  return {
    pageButtonUrl,
    prevEllipsisButtonPageNumber,
    nextEllipsisButtonPageNumber,
    middlePages,
  };
}
