"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;
  const isOpen = selectedIndex !== null;

  const goToPrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < photos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex, photos.length]);

  const handleClose = () => setSelectedIndex(null);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToPrev, goToNext]);

  const canGoPrev = selectedIndex !== null && selectedIndex > 0;
  const canGoNext = selectedIndex !== null && selectedIndex < photos.length - 1;

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
                  onClick={() => setSelectedIndex(index)}
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
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-0 bg-transparent shadow-none [&>button]:hidden">
          {selectedPhoto && (
            <div className="relative flex items-center justify-center">
              {/* Previous button */}
              {canGoPrev && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* Image */}
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain"
              />

              {/* Next button */}
              {canGoNext && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 text-white transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}

              {/* Caption */}
              {selectedPhoto.caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-3 text-center">
                  {selectedPhoto.caption}
                </p>
              )}

              {/* Photo counter */}
              <p className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1">
                {selectedIndex! + 1} / {photos.length}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
