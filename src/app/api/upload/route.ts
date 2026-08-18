import { NextResponse } from "next/server";

import { auth } from "@/auth";
import {
  buildObjectKey,
  createPresignedUploadUrl,
  isAllowedImageType,
  isValidUploadSize,
  maxUploadBytes,
  publicUrlForKey,
} from "@/lib/s3";

interface UploadRequestBody {
  fileName?: unknown;
  contentType?: unknown;
  size?: unknown;
}

function parsePositiveNumber(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }
  return value;
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  let body: UploadRequestBody;
  try {
    body = (await request.json()) as UploadRequestBody;
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la petición no es JSON válido." },
      { status: 400 }
    );
  }

  const fileName = typeof body.fileName === "string" ? body.fileName.trim() : "";
  const contentType =
    typeof body.contentType === "string" ? body.contentType.trim().toLowerCase() : "";
  const size = parsePositiveNumber(body.size);

  if (!fileName || !contentType || size === null) {
    return NextResponse.json(
      { error: "Faltan datos: fileName, contentType o size." },
      { status: 400 }
    );
  }

  if (!isAllowedImageType(contentType)) {
    return NextResponse.json(
      { error: "El formato de imagen no está permitido." },
      { status: 400 }
    );
  }

  if (!isValidUploadSize(size)) {
    return NextResponse.json(
      {
        error: `La imagen supera el tamaño máximo de ${Math.round(maxUploadBytes() / (1024 * 1024))} MB.`,
      },
      { status: 400 }
    );
  }

  try {
    const key = buildObjectKey(fileName);
    const uploadUrl = await createPresignedUploadUrl({ key, contentType });
    return NextResponse.json({ uploadUrl, publicUrl: publicUrlForKey(key) });
  } catch (error) {
    console.error("[upload] no se pudo firmar la URL de S3:", error);
    return NextResponse.json(
      { error: "No se pudo preparar la subida de la imagen." },
      { status: 500 }
    );
  }
}
