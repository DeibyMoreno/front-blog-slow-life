import Image from "next/image";

import type { ImageRef } from "@/lib/blog/types";
import { Reveal, MOTION_STAGGER_S } from "@/components/ui/reveal";

interface PhotoStripProps {
  images: ImageRef[];
  altFallback: string;
}

export function PhotoStrip({ images, altFallback }: PhotoStripProps) {
  if (images.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-4xl px-5 pt-14 sm:px-8 sm:pt-20">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-linen" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra">
          En imágenes · {images.length}
        </p>
        <span className="h-px flex-1 bg-linen" aria-hidden />
      </div>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
        {images.map((image, i) => (
          <Reveal
            key={`${image.url}-${i}`}
            delay={MOTION_STAGGER_S * i}
            amount={0.5}
          >
            <div className="relative aspect-4/3 w-40 shrink-0 overflow-hidden rounded-lg border border-linen bg-sand sm:w-44">
              <Image
                src={image.url}
                alt={image.alt ?? altFallback}
                fill
                sizes="(min-width: 640px) 176px, 160px"
                className="object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
