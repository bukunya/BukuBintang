"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  cover_image: string;
  author: { name: string };
  category: { name: string };
  details: { price: string };
  tags: { name: string; url: string }[];
}

export default function HistoryPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("viewedBooks") || "[]");
    setBooks(viewed);
  }, []);

  const removeBook = (id: string) => {
    const viewed = JSON.parse(localStorage.getItem("viewedBooks") || "[]");
    const updated = viewed.filter((b: Book) => b._id !== id);
    localStorage.setItem("viewedBooks", JSON.stringify(updated));
    setBooks(updated);
  };

  const clearHistory = () => {
    localStorage.setItem("viewedBooks", "[]");
    setBooks([]);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="bg-muted/30 pb-10">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Recently Viewed Books
            </h1>
            {books.length > 0 && (
              <Button
                variant="destructive"
                onClick={clearHistory}
                className="rounded-xl cursor-pointer"
              >
                Clear History
              </Button>
            )}
          </div>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
              {books.map((book) => (
                <div key={book._id} className="relative border">
                  <Link href={`/shop/${book._id}`}>
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
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-4 -right-4 rounded-full cursor-pointer"
                    onClick={() => removeBook(book._id)}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No recently viewed books.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
