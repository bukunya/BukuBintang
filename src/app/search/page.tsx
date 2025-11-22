"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Book {
  _id: string;
  title: string;
  cover_image: string;
  author: { name: string };
  category: { name: string };
  details: { price: string };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    params.append("page", page.toString());

    try {
      const response = await fetch(
        `https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?${params.toString()}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; BukuApp/1.0)",
            Accept: "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const results = Array.isArray(data) ? data : data.books || [];
        setBooks(results);
        setTotalPages(Math.ceil(results.length / 10) || 1);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setBooks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (keyword) {
      fetchBooks();
    }
  }, [keyword, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getPageNumbers = (current: number, total: number) => {
    const pages: (number | string)[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 4) pages.push("...");
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < total - 3) pages.push("...");
      pages.push(total);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="bg-muted/30 pb-10">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 py-8">
          <section className="bg-white py-12">
            <div className="container max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl font-bold mb-8">
                {loading ? "Loading..." : `Search Results (${books.length})`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                {books.map((book) => (
                  <ProductCard
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    category={book.category?.name || "Unknown"}
                    price=""
                    salePrice={book.details?.price || "N/A"}
                    image={book.cover_image || "/placeholder-img.png"}
                  />
                ))}
              </div>
              {books.length === 0 && !loading && (
                <p className="text-center text-muted-foreground">
                  No books found.
                </p>
              )}
            </div>
          </section>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => page > 1 && handlePageChange(page - 1)}
                      className={
                        page <= 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {getPageNumbers(page, totalPages).map((p, index) => (
                    <PaginationItem key={index}>
                      {p === "..." ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(p as number)}
                          isActive={p === page}
                          className={`cursor-pointer ${
                            p === page ? "text-secondary underline" : ""
                          } hover:text-secondary rounded-full`}
                        >
                          {p}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        page < totalPages && handlePageChange(page + 1)
                      }
                      className={
                        page >= totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white font-sans flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
