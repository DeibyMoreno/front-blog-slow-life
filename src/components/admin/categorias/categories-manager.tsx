"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";

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
import { deleteCategory } from "@/app/admin/categorias/actions";
import type { AdminCategory } from "@/lib/admin/api";
import { CategoryForm } from "./category-form";

export function CategoriesManager({
  categories,
}: {
  categories: AdminCategory[];
}) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [deleting, setDeleting] = useState<AdminCategory | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function openCreate() {
    setEditing(null);
    setFormKey((key) => key + 1);
    setFormOpen(true);
  }

  function openEdit(category: AdminCategory) {
    setEditing(category);
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
    const result = await deleteCategory(deleting.id);
    setIsDeleting(false);

    if (!result.ok) {
      toast.error(result.error ?? "No se pudo eliminar la categoría.");
      if (result.errorCode === "UNAUTHORIZED") {
        await signOut({ redirectTo: "/login" });
        return;
      }
      setDeleting(null);
      return;
    }

    toast.success("Categoría eliminada.");
    setDeleting(null);
    router.refresh();
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-stone">
          {categories.length}{" "}
          {categories.length === 1 ? "sección" : "secciones"}
        </p>
        <Button onClick={openCreate}>
          <PlusIcon />
          Nueva categoría
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-40 flex-col items-start justify-center gap-1.5 py-8">
            <p className="text-sm font-medium text-ink">
              Aún no hay categorías
            </p>
            <p className="text-sm text-stone">
              Crea la primera sección para empezar a organizar las historias.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Card size="sm">
                <CardContent className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-ink">
                        {category.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className="hidden font-mono text-xs lowercase sm:inline-flex"
                      >
                        /{category.slug}
                      </Badge>
                    </div>
                    {category.description ? (
                      <p className="mt-1 line-clamp-2 max-w-prose text-sm text-stone">
                        {category.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => openEdit(category)}
                      aria-label={`Editar ${category.name}`}
                    >
                      <PencilIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeleting(category)}
                      aria-label={`Eliminar ${category.name}`}
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
        <CategoryForm
          key={formKey}
          category={editing}
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
            <DialogTitle>Eliminar categoría</DialogTitle>
            <DialogDescription>
              ¿Seguro que quieres eliminar la categoría «{deleting?.name}»? Esta
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