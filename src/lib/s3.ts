import "server-only";

import { randomUUID } from "crypto";
import path from "path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const DEFAULT_MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export function maxUploadBytes(): number {
  const raw = Number(process.env.S3_MAX_UPLOAD_BYTES);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_MAX_UPLOAD_BYTES;
}

export function isAllowedImageType(contentType: string): boolean {
  return ALLOWED_IMAGE_TYPES.has(contentType.toLowerCase());
}

export function isValidUploadSize(size: number): boolean {
  return Number.isFinite(size) && size > 0 && size <= maxUploadBytes();
}

/**
 * Construye una key segura en el bucket a partir del nombre original del
 * archivo: un UUID como nombre (evita colisiones y path traversal) y solo la
 * extensión original saneada.
 */
export function buildObjectKey(fileName: string): string {
  const extension = path.extname(fileName).toLowerCase().replace(/[^a-z0-9.]/g, "");
  return `uploads/${randomUUID()}${extension}`;
}

/**
 * Genera una URL firmada de tipo PUT para que el navegador suba el archivo
 * directamente a S3, sin que pase por el servidor de Next.js.
 */
export async function createPresignedUploadUrl(options: {
  key: string;
  contentType: string;
  expiresIn?: number;
}): Promise<string> {
  const bucket = process.env.S3_BUCKET_NAME;
  if (!bucket) {
    throw new Error("S3_BUCKET_NAME no está configurado.");
  }

  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
  });

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: options.key,
    ContentType: options.contentType,
  });

  return getSignedUrl(client, command, {
    expiresIn: options.expiresIn ?? 120,
  });
}

/**
 * URL pública de lectura de un objeto dentro del bucket (sin CloudFront).
 */
export function publicUrlForKey(key: string): string {
  const baseUrl = process.env.S3_PUBLIC_BASE_URL?.replace(/\/+$/, "");
  if (!baseUrl) {
    throw new Error("S3_PUBLIC_BASE_URL no está configurado.");
  }
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  return `${baseUrl}/${encodedKey}`;
}
