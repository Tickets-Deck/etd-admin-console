import React from "react"
import Button from "./button"
import { Icons } from "./icons"
import { PaginationProps } from "@/app/types/pagination"

export function Pagination({ meta, onPageChange }: PaginationProps) {
    const { page, totalPages } = meta

    const generatePageNumbers = () => {
        const pageNumbers = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            if (page <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push("ellipsis")
                pageNumbers.push(totalPages)
            } else if (page >= totalPages - 2) {
                pageNumbers.push(1)
                pageNumbers.push("ellipsis")
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i)
                }
            } else {
                pageNumbers.push(1)
                pageNumbers.push("ellipsis")
                for (let i = page - 1; i <= page + 1; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push("ellipsis")
                pageNumbers.push(totalPages)
            }
        }

        return pageNumbers
    }

    return (
        <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
            <Button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
                className="h-10 w-10 !p-0 rounded-full grid place-items-center bg-gray-300"
            >
                <Icons.ChevronLeft />
            </Button>
            {generatePageNumbers().map((pageNumber, index) => (
                <React.Fragment key={index}>
                    {pageNumber === "ellipsis" ? (
                        <Button disabled className="h-10 w-10 !p-0 rounded-full grid place-items-center bg-gray-300">
                            <Icons.MoreHorizontal className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => onPageChange(pageNumber as number)}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={pageNumber === page ? "page" : undefined}
                            className={`h-10 w-10 !p-0 rounded-full grid place-items-center ${pageNumber == page ? "!bg-primary pointer-events-none" : "!bg-gray-800"}`}
                        >
                            {pageNumber}
                        </Button>
                    )}
                </React.Fragment>
            ))}
            <Button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
                className="h-10 w-10 !p-0 rounded-full grid place-items-center bg-gray-300"
            >
                <Icons.ChevronRight className="h-4 w-4" />
            </Button>
        </nav>
    )
}