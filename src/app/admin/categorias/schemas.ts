import * as z from "zod";

export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio.")
    .max(60, "El nombre no puede superar los 60 caracteres."),
  description: z
    .string()
    .trim()
    .max(500, "La descripción no puede superar los 500 caracteres.")
    .optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;