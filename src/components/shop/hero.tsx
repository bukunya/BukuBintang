"use client";

import { Eye, HeartIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShopCarousel from "./shop-carousel";
import { Badge } from "../ui/badge";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroProductPage({
  id,
  title,
  coverImage,
  author,
  summary,
  details,
  tags,
  buy,
  publisher,
}: {
  id: string;
  title: string;
  coverImage: string;
  author?: { name: string; url: string };
  summary?: string;
  details?: {
    price: string;
    total_pages: string;
    isbn: string;
    published_date: string;
  };
  tags?: { name: string; url: string }[];
  buy?: { store: string; url: string }[];
  publisher: string;
}) {
  const [values, setValues] = useState<string[]>([]);

  const book = {
    id,
    title,
    coverImage,
    author,
    summary,
    details,
    tags,
    buy,
    publisher,
  };

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newValues: string[] = [];
    if (wishlist.some((b: any) => b.id === id)) newValues.push("heart");
    if (cart.some((b: any) => b.id === id)) newValues.push("cart");
    setValues(newValues);
  }, [id]);

  const handleValueChange = (newValues: string[]) => {
    setValues(newValues);

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (newValues.includes("heart")) {
      if (!wishlist.some((b: any) => b.id === id)) {
        wishlist.push(book);
      }
    } else {
      const index = wishlist.findIndex((b: any) => b.id === id);
      if (index > -1) wishlist.splice(index, 1);
    }

    if (newValues.includes("cart")) {
      if (!cart.some((b: any) => b.id === id)) {
        cart.push(book);
      }
    } else {
      const index = cart.findIndex((b: any) => b.id === id);
      if (index > -1) cart.splice(index, 1);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartWishlistUpdate"));
  };
  const truncateSummary = (text: string | undefined, maxWords: number) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 md:px-8 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex items-center justify-center overflow-hidden">
          <ShopCarousel coverImage={coverImage} />
        </div>

        <div className="flex flex-col gap-6 py-2">
          <div className="flex w-full flex-wrap gap-2">
            {tags?.map((tag: { name: string; url: string }, index: number) => (
              <Badge
                key={index}
                className="text-foreground bg-muted-foreground/30"
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-foreground tracking-wide">
              {title}
            </h1>

            <h2 className="text-2xl font-semibold text-foreground">
              {details?.price || "Price not available"}
            </h2>

            <div className="flex items-center gap-2 text-sm font-bold">
              <span className="text-muted-foreground">Availability :</span>
              <span className="text-primary">In Stock</span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-md">
            {truncateSummary(summary, 30)}
          </p>

          {/* Book Info Group */}
          <div>
            <div>
              <span className="font-semibold">Pages: </span>
              <span className="font-normal">
                {details?.total_pages || "N/A"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Publisher: </span>
              <span className="font-normal">{publisher}</span>
            </div>
            <div>
              <span className="font-semibold">ISBN: </span>
              <span className="font-normal">{details?.isbn || "N/A"}</span>
            </div>
            <div>
              <span className="font-semibold">Published: </span>
              <span className="font-normal">
                {details?.published_date || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <Link
              href={buy?.[0]?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary p-6 text-xl rounded-xl">
                Buy Now
              </Button>
            </Link>
            <ToggleGroup
              type="multiple"
              variant="outline"
              spacing={2}
              size="sm"
              value={values}
              onValueChange={handleValueChange}
            >
              <ToggleGroupItem
                value="heart"
                aria-label="Toggle heart"
                className="data-[state=on]:bg-primary/30 data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500 rounded-full size-10"
              >
                <HeartIcon />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="cart"
                aria-label="Toggle cart"
                className="data-[state=on]:bg-primary/30 data-[state=on]:*:[svg]:fill-green-500 data-[state=on]:*:[svg]:stroke-green-500 rounded-full size-10"
              >
                <ShoppingCart />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="bookmark"
                aria-label="Toggle bookmark"
                className="data-[state=on]:bg-primary/30 data-[state=on]:*:[svg]:fill-black data-[state=on]:*:[svg]:stroke-white rounded-full size-10"
              >
                <Eye />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
