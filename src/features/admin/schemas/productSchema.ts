import * as z from "zod";

export const productFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Name is required").max(255),
  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price is required",
    })
    .min(1)
    .max(1000),
  description: z
    .string({ required_error: "Description is required" })
    .min(20, "Description must contain at least 20 character(s)"),
  category: z.string({
    required_error: "Category is required",
  }),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
