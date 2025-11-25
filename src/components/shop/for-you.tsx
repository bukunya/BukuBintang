"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "../product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ForYouProps {
  tags?: { name: string; url: string }[];
  id: string;
}

const ForYou = ({ tags, id }: ForYouProps) => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const genre = tags?.[0]?.name;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      let currentList: any[] = [];
      const BASE_URL = "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1";

      if (genre) {
        try {
          const response = await fetch(
            `${BASE_URL}/book?genre=${encodeURIComponent(genre)}&page=1`,
            { headers: { Accept: "application/json" } }
          );
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              const validBooks = data.filter((b) => b._id !== id);
              currentList = validBooks.slice(0, 8);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }

      let attempts = 0;
      const maxAttempts = 16;

      while (currentList.length < 8 && attempts < maxAttempts) {
        attempts++;
        try {
          let url = `${BASE_URL}/random_book`;

          if (genre && attempts <= 6) {
            url += `?genre=${encodeURIComponent(genre)}`;
          }

          const response = await fetch(url, {
            headers: { Accept: "application/json" },
          });

          if (response.ok) {
            const book = await response.json();
            const isDuplicate =
              book._id === id || currentList.some((b) => b._id === book._id);

            if (!isDuplicate) {
              currentList.push(book);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }

      setBooks(currentList);
      setLoading(false);
    };

    fetchBooks();
  }, [genre, id]);

  return (
    <section className="bg-white py-12 border-t border-border">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">
            Books For You
          </h3>
          {genre && (
            <Link href={`/search?keyword=${encodeURIComponent(genre)}`}>
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
                <Skeleton className="h-[300px] w-full rounded-lg" />
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
            <p className="col-span-full text-center text-muted-foreground">
              No recommendations available.
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

export default ForYou;
