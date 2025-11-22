"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  price: string;
  salePrice: string;
  image: string;
  clickable?: boolean;
}

export function ProductCard({
  id,
  title,
  category,
  price,
  salePrice,
  image,
  clickable = true,
}: ProductCardProps) {
  console.log("ProductCard image:", image);
  const cardContent = (
    <Card className="border-none shadow-none rounded-none group cursor-pointer bg-transparent">
      <CardContent className="p-0">
        <div className="relative aspect-3/4 w-full overflow-hidden mb-4 rounded-md">
          <Image
            src={image}
            alt={title}
            fill
            className="transition-transform duration-300 group-hover:scale-105"
            unoptimized
            style={{ objectFit: "contain" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.webp";
            }}
          />
        </div>

        <div className="text-left px-2">
          <h3 className="font-bold text-foreground text-base mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground font-bold mb-2">
            {category}
          </p>
          <div className="flex items-center gap-2 font-bold">
            <span className="text-muted-foreground/60 line-through">
              {price}
            </span>
            <span className="text-secondary">{salePrice}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (clickable) {
    return <Link href={`/shop/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
}
