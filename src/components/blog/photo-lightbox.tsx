"use client";

import Image from "next/image";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import type { ImageRef } from "@/lib/blog/types";

interface PhotoLightboxProps {
  images: ImageRef[];
  altFallback: string;
  open: boolean;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export function PhotoLightbox({
  images,
  altFallback,
  open,
  index,
  onIndexChange,
  onClose,
}: PhotoLightboxProps) {
  const count = images.length;
  const image = images[index];

  const goTo = (next: number) => {
    onIndexChange(((next % count) + count) % count);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Popup
          aria-label="Galería de imágenes en pantalla completa"
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-sm outline-none data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") goTo(index - 1);
            if (event.key === "ArrowRight") goTo(index + 1);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8">
            {count > 1 ? (
              <p className="text-sm text-cream/70">
                {index + 1} / {count}
              </p>
            ) : (
              <span />
            )}

            <DialogPrimitive.Close
              aria-label="Cerrar galería"
              className="grid size-11 place-items-center rounded-full border border-cream/30 text-cream/80 transition-colors hover:border-cream/60 hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              <X className="size-5" />
            </DialogPrimitive.Close>
          </div>

          <div className="relative min-h-0 flex-1 px-4 sm:px-10">
            {image ? (
              <Image
                src={image.url}
                alt={image.alt ?? altFallback}
                fill
                sizes="100vw"
                className="object-contain"
              />
            ) : null}
          </div>

          {count > 1 ? (
            <>
              <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 sm:left-6">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Imagen anterior"
                  className="grid size-11 place-items-center rounded-full border border-cream/30 bg-ink/30 text-cream/80 transition-colors hover:border-cream/60 hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  <ArrowLeft className="size-5" />
                </button>
              </div>
              <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 sm:right-6">
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Imagen siguiente"
                  className="grid size-11 place-items-center rounded-full border border-cream/30 bg-ink/30 text-cream/80 transition-colors hover:border-cream/60 hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </>
          ) : null}

          {image?.alt ? (
            <p className="relative z-10 px-5 py-4 text-center text-sm text-cream/60 sm:px-8">
              {image.alt}
            </p>
          ) : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}