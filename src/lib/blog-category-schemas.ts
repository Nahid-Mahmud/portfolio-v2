import z from "zod";

const createBlogCategoryZodSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(100, "Name is too long"),
});

const updateBlogCategoryZodSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(100, "Name is too long").optional(),
});

export { createBlogCategoryZodSchema, updateBlogCategoryZodSchema };
