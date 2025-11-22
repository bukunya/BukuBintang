"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "./navcontents";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

export function Navigation() {
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setWishlistCount(wishlist.length);
      setCartCount(cart.length);
    };
    updateCounts();
    window.addEventListener("storage", updateCounts);
    window.addEventListener("cartWishlistUpdate", updateCounts);
    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("cartWishlistUpdate", updateCounts);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  const handleSearch = () => {
    if (showSearch) {
      if (keyword.trim()) {
        window.location.href = `/search?keyword=${encodeURIComponent(keyword)}`;
        setShowSearch(false);
        setKeyword("");
      }
    } else {
      setShowSearch(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && keyword.trim()) {
      window.location.href = `/search?keyword=${encodeURIComponent(keyword)}`;
      setShowSearch(false);
      setKeyword("");
    }
  };

  return (
    <header className="w-full font-sans sticky top-0 z-50">
      <div className="bg-white py-4 px-4 md:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-16">
            <Link
              href={navLinks.home}
              className="text-2xl font-bold text-foreground"
            >
              {navLinks.app}
            </Link>

            <nav className="hidden lg:flex items-center gap-6 text-muted-foreground font-bold text-sm">
              <Link
                href={navLinks.home}
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="hover:text-foreground transition-colors"
              >
                Shop
              </Link>
              <Link
                href={navLinks.about}
                className="hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href={navLinks.blog}
                className="hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <Link
                href={navLinks.contact}
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href={navLinks.pages}
                className="hover:text-foreground transition-colors"
              >
                Pages
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 text-primary text-sm font-medium">
            <div className="hidden md:flex items-center gap-1 cursor-pointer hover:text-blue-600">
              <User className="h-4 w-4" />
              <span>Login / Register</span>
            </div>
            <div ref={searchRef} className="flex items-center gap-2">
              {showSearch && (
                <Input
                  type="text"
                  placeholder="Search books..."
                  className="w-48"
                  autoFocus
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:text-blue-600 hover:bg-blue-50"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <Link
              href="/cart"
              className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{cartCount}</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
            >
              <Heart className="h-5 w-5" />
              <span>{wishlistCount}</span>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-foreground"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8 text-lg font-medium text-muted-foreground">
                  <Link href="/" className="hover:text-foreground">
                    Home
                  </Link>
                  <Link href="/shop" className="hover:text-foreground">
                    Shop
                  </Link>
                  <Link href="/cart" className="hover:text-foreground">
                    Cart ({cartCount})
                  </Link>
                  <Link href="/wishlist" className="hover:text-foreground">
                    Wishlist ({wishlistCount})
                  </Link>
                  <Link href="/about" className="hover:text-foreground">
                    About
                  </Link>
                  <Link href="/blog" className="hover:text-foreground">
                    Blog
                  </Link>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                  <div className="flex items-center gap-2 mt-4 text-primary">
                    <User className="h-5 w-5" />
                    <span>Login / Register</span>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
