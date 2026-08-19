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
          className="fixed inset-0 z-50 flex flex-col bg-ink outline-none"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") goTo(index - 1);
            if (event.key === "ArrowRight") goTo(index + 1);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid place-items-center"
          >
            <div className="size-[60vmin] rounded-full bg-linen/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8">
            {count > 1 ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </p>
            ) : (
              <span />
            )}

            <DialogPrimitive.Close
              aria-label="Cerrar galería"
              className="grid size-11 place-items-center rounded-full border border-cream/25 text-cream/60 transition-colors hover:border-cream/60 hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              <X className="size-5" />
            </DialogPrimitive.Close>
          </div>

          <div className="relative min-h-0 flex-1 mb-10 motion-safe:data-open:animate-in motion-safe:data-open:fade-in-0 motion-safe:data-open:zoom-in-95 sm:px-10">
            {image ? (
              <Image
                src={image.url}
                alt={image.alt ?? altFallback}
                fill
                priority
                sizes="100vw"
                className="object-contain drop-shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
              />
            ) : null}

            {count > 1 ? (
              <>
                <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2 sm:left-6">
                  <button
                    type="button"
                    onClick={() => goTo(index - 1)}
                    aria-label="Imagen anterior"
                    className="grid size-11 place-items-center rounded-full border border-cream/25 bg-ink/40 text-cream/80 backdrop-blur-sm transition-colors hover:border-cream/60 hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                  >
                    <ArrowLeft className="size-5" />
                  </button>
                </div>
                <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2 sm:right-6">
                  <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    aria-label="Imagen siguiente"
                    className="grid size-11 place-items-center rounded-full border border-cream/25 bg-ink/40 text-cream/80 backdrop-blur-sm transition-colors hover:border-cream/60 hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                  >
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              </>
            ) : null}
          </div>

          {image?.alt ? (
            <div className="relative z-10 mx-auto max-w-2xl px-5 pb-6 pt-2 text-center sm:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-terra">
                Fotografía
              </p>
              <p className="mt-1 font-display text-lg italic text-cream/70">
                {image.alt}
              </p>
            </div>
          ) : null}

          {count > 1 ? (
            <div className="relative z-10 pb-6 sm:pb-8">
              <div className="mx-auto flex max-w-full gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
                {images.map((thumb, i) => (
                  <button
                    key={`${thumb.url}-${i}`}
                    type="button"
                    onClick={() => onIndexChange(i)}
                    aria-label={`Ver ${thumb.alt ?? altFallback}`}
                    aria-current={i === index}
                    className={`relative cursor-pointer aspect-4/3 w-16 shrink-0 overflow-hidden rounded-md border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${i === index
                      ? "scale-[1.05] border-transparent opacity-100 ring-2 ring-terra"
                      : "border-cream/15 opacity-60 transition-opacity hover:opacity-90"
                      }`}
                  >
                    <Image
                      src={thumb.url}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}