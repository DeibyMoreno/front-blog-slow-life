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
import { createTag } from "@/app/admin/etiquetas/actions";
import {
  tagFormSchema,
  type TagFormValues,
} from "@/app/admin/etiquetas/schemas";

const FORM_ID = "tag-form";

interface TagFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function TagForm({ onCancel, onSuccess }: TagFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: { name: "" },
  });

  async function onSubmit(values: TagFormValues) {
    setSubmitting(true);

    const result = await createTag(values);

    setSubmitting(false);

    if (!result.ok) {
      toast.error(result.error ?? "No se pudo crear la etiqueta.");
      if (result.errorCode === "UNAUTHORIZED") {
        await signOut({ redirectTo: "/login" });
        return;
      }
      return;
    }

    toast.success("Etiqueta creada.");
    onSuccess();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Nueva etiqueta</DialogTitle>
        <DialogDescription>
          Crea una etiqueta para conectar historias relacionadas entre sí.
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
                  placeholder="Por ejemplo: Vida tranquila"
                  autoComplete="off"
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
          {submitting ? "Guardando…" : "Crear etiqueta"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}