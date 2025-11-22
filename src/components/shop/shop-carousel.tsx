"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

const ShopCarousel = ({ coverImage }: { coverImage: string }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const images = [coverImage || "/placeholder.webp", "/placeholder.webp"];

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        setApi={setApi}
        className="w-full mb-8"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-4">
              <div className="relative w-full aspect-square overflow-hidden bg-white">
                <Image
                  src={image}
                  alt={`Book Cover ${index + 1}`}
                  fill
                  priority={true}
                  unoptimized
                  style={{ objectFit: "contain" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-img.png";
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <CarouselNext
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </Carousel>

      <div className="flex justify-center gap-2 -mt-4">
        {images.map((_, index) => {
          const isCurrent = index === current;
          return (
            <div
              key={index}
              className={`rounded-full transition-all duration-300 ${
                isCurrent ? "w-8 h-2 bg-black" : "w-2 h-2 bg-gray-400"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShopCarousel;
