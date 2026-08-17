import * as z from "zod";

export const POST_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""));

export const postFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "El título es obligatorio.")
    .max(150, "El título no puede superar los 150 caracteres."),
  excerpt: z
    .string()
    .trim()
    .max(300, "El resumen no puede superar los 300 caracteres.")
    .optional()
    .or(z.literal("")),
  content: z.string().optional(),
  coverImage: optionalUrl,
  status: z.enum(POST_STATUSES),
  categoryId: z
    .string()
    .trim()
    .uuid("Selecciona una categoría válida.")
    .optional()
    .or(z.literal("")),
  tagIds: z.array(z.string().trim()).optional(),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
