"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ShoppingCart, Eye } from "lucide-react";

interface Book {
  id: string;
  title: string;
  coverImage: string;
  author?: { name: string };
  summary?: string;
  details?: { price: string };
  tags?: { name: string; url: string }[];
  buy?: { store: string; url: string }[];
  publisher: string;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [cart, setCart] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const updateWishlist = () => {
      const storedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      setWishlist(storedWishlist);
    };
    updateWishlist();
    window.addEventListener("storage", updateWishlist);
    window.addEventListener("cartWishlistUpdate", updateWishlist);
    return () => {
      window.removeEventListener("storage", updateWishlist);
      window.removeEventListener("cartWishlistUpdate", updateWishlist);
    };
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(stored);
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    window.addEventListener("cartWishlistUpdate", updateCart);
    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("cartWishlistUpdate", updateCart);
    };
  }, []);

  const removeFromWishlist = (id: string) => {
    const newWishlist = wishlist.filter((book) => book.id !== id);
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    window.dispatchEvent(new Event("cartWishlistUpdate"));
  };

  const addToCart = (book: Book) => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = storedCart.findIndex((b: Book) => b.id === book.id);
    if (index > -1) {
      storedCart.splice(index, 1);
    } else {
      storedCart.push(book);
    }
    localStorage.setItem("cart", JSON.stringify(storedCart));
    window.dispatchEvent(new Event("cartWishlistUpdate"));
  };

  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWishlist = wishlist.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="bg-muted/30 pb-10">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Wishlist</h1>

          {wishlist.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your wishlist is empty.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-8">
                {paginatedWishlist.map((book) => (
                  <div
                    key={book.id}
                    className="relative border flex flex-col h-full"
                  >
                    <div className="flex-1">
                      <ProductCard
                        id={book.id}
                        title={book.title}
                        category={book.author?.name || "Unknown"}
                        price=""
                        salePrice={book.details?.price || "N/A"}
                        image={book.coverImage || "/placeholder-img.png"}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-4 -right-4 rounded-full cursor-pointer"
                      onClick={() => removeFromWishlist(book.id)}
                    >
                      X
                    </Button>
                    <div className="w-full flex flex-row items-center justify-center mt-auto gap-6 pb-4">
                      <Button
                        variant={
                          cart.some((b) => b.id === book.id)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="rounded-full"
                        onClick={() => addToCart(book)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {cart.some((b) => b.id === book.id)
                          ? "In Cart"
                          : "Add to Cart"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            currentPage > 1 && setCurrentPage(currentPage - 1)
                          }
                          className={
                            currentPage <= 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={page === currentPage}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            currentPage < totalPages &&
                            setCurrentPage(currentPage + 1)
                          }
                          className={
                            currentPage >= totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
