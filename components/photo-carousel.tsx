"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
}

export function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className="relative my-8">
        <Carousel
          opts={{ align: "start", dragFree: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {photos.map((photo, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-auto"
              >
                <div
                  className="cursor-pointer group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative h-[280px] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      height={280}
                      width={400}
                      className="h-full w-auto object-cover transition-opacity group-hover:opacity-90"
                      style={{ height: '280px', width: 'auto' }}
                    />
                  </div>
                  {photo.caption && (
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-[300px]">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Bottom-right navigation buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-0 bg-transparent shadow-none">
          {selectedPhoto && (
            <div className="relative">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
              {selectedPhoto.caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-3 text-center">
                  {selectedPhoto.caption}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
