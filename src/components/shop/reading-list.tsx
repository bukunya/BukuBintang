"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "../product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Book {
  _id: string;
  title: string;
  cover_image: string;
  category: { name: string };
  details: { price: string };
}

interface ReadingListProps {
  currentId?: string;
}

const ReadingList = ({ currentId }: ReadingListProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const viewed = JSON.parse(localStorage.getItem("viewedBooks") || "[]");
      let currentBooks = viewed.slice(0, 4);

      let attempts = 0;
      const maxAttempts = 10;

      while (currentBooks.length < 4 && attempts < maxAttempts) {
        attempts++;
        try {
          const response = await fetch(
            "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book",
            {
              headers: {
                "User-Agent": "Mozilla/5.0 (compatible; BukuApp/1.0)",
                Accept: "application/json",
              },
            }
          );
          if (response.ok) {
            const book = await response.json();
            const isDuplicate =
              currentBooks.some((b: Book) => b._id === book._id) ||
              (currentId && book._id === currentId);
            if (!isDuplicate) {
              currentBooks.push(book);
            }
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }

      setBooks(currentBooks);
      setLoading(false);
    };

    fetchBooks();
  }, [currentId]);

  return (
    <section className="bg-white py-12 border-t border-border">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">
            Your Reading List
          </h3>
          {books.length > 0 && (
            <Link href="/history">
              <Button className="bg-primary rounded-full cursor-pointer">
                Show More
              </Button>
            </Link>
          )}
        </div>

        <div className="flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory -mx-4 px-4 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-12 md:mx-0 md:px-0 md:pb-0 md:overflow-visible no-scrollbar">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="space-y-3 min-w-[250px] md:min-w-0 snap-center"
              >
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : books.length > 0 ? (
            books.map((book) => (
              <Link
                href={`/shop/${book._id}`}
                key={book._id}
                className="min-w-[250px] md:min-w-0 snap-center"
              >
                <ProductCard
                  id={book._id}
                  title={book.title}
                  category={book.category?.name || "Unknown"}
                  price=""
                  salePrice={book.details?.price || "N/A"}
                  image={book.cover_image || "/placeholder-img.png"}
                  clickable={false}
                />
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground w-full">
              No books available.
            </p>
          )}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ReadingList;
