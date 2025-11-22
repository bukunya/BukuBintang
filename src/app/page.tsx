"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  cover_image: string;
  author: { name: string };
  category: { name: string };
  details: { price: string };
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [randomBooks, setRandomBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRandomBooks = async () => {
      setLoading(true);
      const books: Book[] = [];
      for (let i = 0; i < 4; i++) {
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
            books.push(book);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
      setRandomBooks(books);
      setLoading(false);
    };

    fetchRandomBooks();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-[60vh] flex flex-col justify-center items-center px-4">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Bookstar</h1>
        <p className="text-xl text-gray-600 mb-12">
          Bookstar website by afif.dev
        </p>

        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full h-12 text-lg px-4 pr-12 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring-0"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : randomBooks.map((book) => (
                  <Link href={`/shop/${book._id}`} key={book._id}>
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
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
