"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

interface CoverImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export function CoverImageUploader({
  value,
  onChange,
}: CoverImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [manual, setManual] = useState(false);

  async function handleFile(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Formato no permitido. Usa JPG, PNG, WebP, GIF o AVIF.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error("La imagen supera el tamaño máximo de 10 MB.");
      return;
    }

    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        uploadUrl?: string;
        publicUrl?: string;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? "No se pudo preparar la subida.");
      }
      if (!data.uploadUrl || !data.publicUrl) {
        throw new Error("El servidor no devolvió una URL de subida válida.");
      }

      const uploadRes = await fetch(data.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("No se pudo subir la imagen al almacenamiento.");
      }

      onChange(data.publicUrl);
      toast.success("Imagen subida correctamente.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo subir la imagen."
      );
    } finally {
      setUploading(false);
    }
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleFile(file);
          event.target.value = "";
        }}
      />

      {uploading ? (
        <div className="flex h-40 items-center justify-center gap-2 rounded-xl border border-dashed border-input bg-muted/40 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Subiendo imagen…
        </div>
      ) : manual ? (
        <div className="space-y-2">
          <Input
            value={value ?? ""}
            onChange={(event) => onChange(event.target.value)}
            placeholder="https://…/portada.jpg"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setManual(false)}
            className="text-xs font-medium text-terra underline-offset-4 hover:underline"
          >
            Volver a subir un archivo
          </button>
        </div>
      ) : value ? (
        <div className="space-y-3">
          <Input
            value={value ?? ""}
            readOnly
            placeholder="https://…/portada.jpg"
            autoComplete="off"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openFilePicker}
              disabled={uploading}
            >
              Reemplazar
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange("")}
              disabled={uploading}
            >
              <Trash2 />
              Quitar
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            type="button"
            role="button"
            tabIndex={0}
            onClick={openFilePicker}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              const file = event.dataTransfer.files?.[0];
              if (file) handleFile(file);
            }}
            className={`flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-sm text-muted-foreground transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${dragging ? "border-terra bg-terra/5 text-terra" : "border-input bg-muted/40 hover:border-terra/50"}`}
          >
            <ImagePlus className="size-5" />
            <span>Arrastra una imagen aquí o haz clic para elegir</span>
            <span className="text-xs">
              JPG, PNG, WebP, GIF o AVIF · máx. 10 MB
            </span>
          </button>
          <button
            type="button"
            onClick={() => setManual(true)}
            className="text-xs font-medium text-terra underline-offset-4 hover:underline"
          >
            ¿Prefieres pegar una URL?
          </button>
        </div>
      )}
    </div>
  );
}
