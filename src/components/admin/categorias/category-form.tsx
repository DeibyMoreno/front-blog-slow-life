"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createCategory,
  updateCategory,
} from "@/app/admin/categorias/actions";
import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/app/admin/categorias/schemas";
import type { AdminCategory } from "@/lib/admin/api";

const FORM_ID = "category-form";

interface CategoryFormProps {
  category?: AdminCategory | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function CategoryForm({ category, onCancel, onSuccess }: CategoryFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const editing = category != null;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
    },
  });

  async function onSubmit(values: CategoryFormValues) {
    setSubmitting(true);

    const result = editing
      ? await updateCategory(category.id, values)
      : await createCategory(values);

    setSubmitting(false);

    if (!result.ok) {
      toast.error(result.error ?? "No se pudo guardar la categoría.");
      if (result.errorCode === "UNAUTHORIZED") {
        await signOut({ redirectTo: "/login" });
        return;
      }
      return;
    }

    toast.success(editing ? "Categoría actualizada." : "Categoría creada.");
    onSuccess();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {editing ? "Editar categoría" : "Nueva categoría"}
        </DialogTitle>
        <DialogDescription>
          {editing
            ? "Actualiza el nombre y la descripción de la sección."
            : "Crea una sección para agrupar las historias del blog."}
        </DialogDescription>
      </DialogHeader>

      <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Por ejemplo: Moda lenta"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Descripción</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Breve descripción de la sección (opcional)."
                  className="min-h-24 resize-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel} disabled={submitting}>
          Cancelar
        </Button>
        <Button type="submit" form={FORM_ID} disabled={submitting}>
          {submitting
            ? "Guardando…"
            : editing
              ? "Guardar cambios"
              : "Crear categoría"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}