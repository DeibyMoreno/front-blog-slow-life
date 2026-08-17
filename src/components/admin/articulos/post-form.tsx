"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createPost,
  updatePost,
} from "@/app/admin/articulos/actions";
import {
  POST_STATUSES,
  postFormSchema,
  type PostFormValues,
} from "@/app/admin/articulos/schemas";
import type {
  AdminCategory,
  AdminPostDetail,
  AdminTag,
} from "@/lib/admin/api";

const STATUS_LABELS: Record<(typeof POST_STATUSES)[number], string> = {
  DRAFT: "Borrador",
  PUBLISHED: "Publicado",
  ARCHIVED: "Archivado",
};

const selectClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm";

interface PostFormProps {
  post?: AdminPostDetail | null;
  categories: AdminCategory[];
  tags: AdminTag[];
}

export function PostForm({ post, categories, tags }: PostFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const editing = post != null;

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      coverImage: post?.coverImage ?? "",
      status: post?.status ?? "DRAFT",
      categoryId: post?.category?.id ?? "",
      tagIds: post?.tags.map((tag) => tag.id) ?? [],
    },
  });

  async function onSubmit(values: PostFormValues) {
    setSubmitting(true);

    const payload: PostFormValues = {
      ...values
    };

    const result = editing
      ? await updatePost(post.id, payload)
      : await createPost(payload);

    setSubmitting(false);

    if (!result.ok) {
      toast.error(result.error ?? "No se pudo guardar el artículo.");
      if (result.errorCode === "UNAUTHORIZED") {
        await signOut({ redirectTo: "/login" });
        return;
      }
      return;
    }

    toast.success(editing ? "Artículo actualizado." : "Artículo creado.");
    router.push("/admin/articulos");
    router.refresh();
  }

  const tagIds = useWatch({ control: form.control, name: "tagIds" }) ?? [];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-8">
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Título</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="El título de la historia"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="excerpt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Resumen</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Breve adelanto de la historia (opcional)."
                className="min-h-20 resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="content"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Contenido</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="El cuerpo del artículo (opcional)."
                className="min-h-48 resize-y"
              />
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="coverImage"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Imagen de portada</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="https://…/portada.jpg"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />


      </FieldGroup>

      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Estado</FieldLabel>
                <select
                  id={field.name}
                  {...field}
                  className={selectClassName}
                >
                  {POST_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          />

          <Controller
            name="categoryId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Categoría</FieldLabel>
                <select
                  id={field.name}
                  value={field.value ?? ""}
                  onChange={(event) =>
                    field.onChange(event.target.value || "")
                  }
                  aria-invalid={fieldState.invalid}
                  className={selectClassName}
                >
                  <option value="">Sin categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Field>
          <span className="text-sm font-medium">Etiquetas</span>
          {tags.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aún no hay etiquetas disponibles.
            </p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {tags.map((tag) => (
                <label
                  key={tag.id}
                  className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
                >
                  <input
                    type="checkbox"
                    value={tag.id}
                    checked={tagIds.includes(tag.id)}
                    onChange={(event) => {
                      const next = event.target.checked
                        ? [...tagIds, tag.id]
                        : tagIds.filter((id) => id !== tag.id);
                      form.setValue("tagIds", next);
                    }}
                    className="size-4 rounded accent-terra"
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          )}
        </Field>
      </FieldGroup>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting
            ? "Guardando…"
            : editing
              ? "Guardar cambios"
              : "Crear artículo"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/articulos")}
          disabled={submitting}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}