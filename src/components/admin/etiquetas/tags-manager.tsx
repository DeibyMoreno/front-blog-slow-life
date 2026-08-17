"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { PlusIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteTag } from "@/app/admin/etiquetas/actions";
import type { AdminTag } from "@/lib/admin/api";
import { TagForm } from "./tag-form";

export function TagsManager({ tags }: { tags: AdminTag[] }) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [deleting, setDeleting] = useState<AdminTag | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function openCreate() {
    setFormKey((key) => key + 1);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
  }

  function handleSuccess() {
    closeForm();
    router.refresh();
  }

  async function handleDelete() {
    if (!deleting) return;

    setIsDeleting(true);
    const result = await deleteTag(deleting.id);
    setIsDeleting(false);

    if (!result.ok) {
      toast.error(result.error ?? "No se pudo eliminar la etiqueta.");
      if (result.errorCode === "UNAUTHORIZED") {
        await signOut({ redirectTo: "/login" });
        return;
      }
      setDeleting(null);
      return;
    }

    toast.success("Etiqueta eliminada.");
    setDeleting(null);
    router.refresh();
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-stone">
          {tags.length} {tags.length === 1 ? "etiqueta" : "etiquetas"}
        </p>
        <Button onClick={openCreate}>
          <PlusIcon />
          Nueva etiqueta
        </Button>
      </div>

      {tags.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-40 flex-col items-start justify-center gap-1.5 py-8">
            <p className="text-sm font-medium text-ink">
              Aún no hay etiquetas
            </p>
            <p className="text-sm text-stone">
              Crea la primera etiqueta para empezar a conectar historias.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-2">
          {tags.map((tag) => (
            <li key={tag.id}>
              <Card size="sm">
                <CardContent className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <p className="truncate text-sm font-medium text-ink">
                      {tag.name}
                    </p>
                    <Badge
                      variant="secondary"
                      className="hidden font-mono text-xs lowercase sm:inline-flex"
                    >
                      /{tag.slug}
                    </Badge>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeleting(tag)}
                      aria-label={`Eliminar ${tag.name}`}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <Dialog
        open={formOpen}
        onOpenChange={(open) => {
          if (!open) closeForm();
        }}
      >
        <TagForm
          key={formKey}
          onCancel={closeForm}
          onSuccess={handleSuccess}
        />
      </Dialog>

      <Dialog
        open={deleting != null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeleting(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Eliminar etiqueta</DialogTitle>
            <DialogDescription>
              ¿Seguro que quieres eliminar la etiqueta «{deleting?.name}»? Esta
              acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleting(null)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando…" : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}