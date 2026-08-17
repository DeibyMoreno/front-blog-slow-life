"use client";

import { useState } from "react";
import Link from "next/link";
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
import { deletePost } from "@/app/admin/articulos/actions";
import { POST_STATUSES } from "@/app/admin/articulos/schemas";
import type { AdminPost } from "@/lib/admin/api";
import { formatDate } from "@/lib/format";

const STATUS_LABELS: Record<(typeof POST_STATUSES)[number], string> = {
  DRAFT: "Borrador",
  PUBLISHED: "Publicado",
  ARCHIVED: "Archivado",
};

const STATUS_VARIANTS: Record<
  (typeof POST_STATUSES)[number],
  "secondary" | "default" | "outline"
> = {
  DRAFT: "secondary",
  PUBLISHED: "default",
  ARCHIVED: "outline",
};

export function PostsManager({ posts }: { posts: AdminPost[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<AdminPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!deleting) return;

    setIsDeleting(true);
    const result = await deletePost(deleting.id);
    setIsDeleting(false);

    if (!result.ok) {
      toast.error(result.error ?? "No se pudo eliminar el artículo.");
      if (result.errorCode === "UNAUTHORIZED") {
        await signOut({ redirectTo: "/login" });
        return;
      }
      setDeleting(null);
      return;
    }

    toast.success("Artículo eliminado.");
    setDeleting(null);
    router.refresh();
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-stone">
          {posts.length} {posts.length === 1 ? "artículo" : "artículos"}
        </p>
        <Button render={<Link href="/admin/articulos/nuevo" />}>
          <PlusIcon />
          Nuevo artículo
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-40 flex-col items-start justify-center gap-1.5 py-8">
            <p className="text-sm font-medium text-ink">
              Aún no hay artículos
            </p>
            <p className="text-sm text-stone">
              Crea la primera historia para empezar a llenar el blog.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Card size="sm">
                <CardContent className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-medium text-ink">
                        {post.title}
                      </p>
                      <Badge variant={STATUS_VARIANTS[post.status]}>
                        {STATUS_LABELS[post.status]}
                      </Badge>
                      <span className="hidden font-mono text-xs lowercase text-stone sm:inline">
                        /{post.slug}
                      </span>
                    </div>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-stone">
                      {post.author ? (
                        <span>{post.author.fullName}</span>
                      ) : null}
                      {post.category ? (
                        <span className="text-terra">{post.category.name}</span>
                      ) : null}
                      {post.publishedAt ?? post.updatedAt ? (
                        <span>
                          {formatDate(post.publishedAt ?? post.updatedAt)}
                        </span>
                      ) : null}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Editar ${post.title}`}
                      render={<Link href={`/admin/articulos/${post.id}/editar`} />}
                    >
                      <PencilIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeleting(post)}
                      aria-label={`Eliminar ${post.title}`}
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
        open={deleting != null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeleting(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Eliminar artículo</DialogTitle>
            <DialogDescription>
              ¿Seguro que quieres eliminar «{deleting?.title}»? Esta acción no
              se puede deshacer.
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