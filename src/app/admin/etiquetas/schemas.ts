import * as z from "zod";

export const tagFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio.")
    .max(50, "El nombre no puede superar los 50 caracteres."),
});

export type TagFormValues = z.infer<typeof tagFormSchema>;
