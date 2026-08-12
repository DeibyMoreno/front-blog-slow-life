import Image from "next/image";

import type { ImageRef } from "@/lib/blog/types";

interface PhotoCollageProps {
  images: ImageRef[];
  altFallback: string;
}

export function PhotoCollage({ images, altFallback }: PhotoCollageProps) {
  if (images.length === 0) return null;

  const featured = images[0];
  const rest = images.slice(1, 3);

  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5">
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-sand ring-1 ring-linen">
        <Image
          src={featured.url}
          alt={featured.alt ?? altFallback}
          fill
          priority={false}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between gap-4 sm:mt-20 sm:gap-5">
        {rest.map((image, i) => (
          <div
            key={`${image.url}-${i}`}
            className="relative aspect-4/3 overflow-hidden rounded-2xl bg-sand ring-1 ring-linen"
          >
            <Image
              src={image.url}
              alt={image.alt ?? altFallback}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
