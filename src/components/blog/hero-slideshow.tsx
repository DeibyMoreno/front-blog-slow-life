"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { ImageRef } from "@/lib/blog/types";

const SLIDE_DURATION_MS = 6000;
const CROSSFADE_MS = 1200;

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface HeroSlideshowProps {
  images: ImageRef[];
  altFallback: string;
}

export function HeroSlideshow({ images, altFallback }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const count = images.length;

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (reducedMotion || paused || count <= 1) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % count),
      SLIDE_DURATION_MS
    );
    return () => clearInterval(timer);
  }, [reducedMotion, paused, count, index]);

  if (count === 0) return null;

  if (count === 1) {
    return (
      <Image
        src={images[0].url}
        alt={images[0].alt ?? altFallback}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    );
  }

  const isAutoplaying = !reducedMotion && !paused;

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label="Imágenes del artículo"
      className="absolute inset-0"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {images.map((image, i) => (
        <Image
          key={`${image.url}-${i}`}
          src={image.url}
          alt={image.alt ?? altFallback}
          fill
          priority={i === 0}
          sizes="100vw"
          aria-hidden={i !== index}
          className={`object-cover ${
            i === index
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          } ${isAutoplaying && i === index ? "animate-[hero-zoom_6s_ease-out_forwards]" : ""}`}
          style={{ transition: `opacity ${CROSSFADE_MS}ms ease-in-out` }}
        />
      ))}

      <div
        aria-hidden
        className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-2 sm:flex"
      >
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Imagen anterior"
          className="grid size-11 place-items-center rounded-full border border-cream/30 text-cream/80 transition-colors hover:border-cream/60 hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Imagen siguiente"
          className="grid size-11 place-items-center rounded-full border border-cream/30 text-cream/80 transition-colors hover:border-cream/60 hover:bg-cream/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>

      {isAutoplaying ? (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-cream/15">
          <div
            key={index}
            className="h-full bg-cream/70"
            style={{
              animation: `hero-progress ${SLIDE_DURATION_MS}ms linear forwards`,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
