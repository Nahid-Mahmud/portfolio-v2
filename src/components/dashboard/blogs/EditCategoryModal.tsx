"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBlogCategoryZodSchema } from "@/lib/blog-category-schemas";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { updateBlogCategory } from "@/actions/blog.category.actions";

type UpdateCategoryFormData = {
  name?: string;
};

type Category = {
  id?: string;
  name: string;
  description?: string | null;
};

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

export default function EditCategoryModal({ isOpen, onClose, category }: EditCategoryModalProps) {
  const form = useForm<UpdateCategoryFormData>({
    resolver: zodResolver(updateBlogCategoryZodSchema),
    defaultValues: {
      name: category?.name || "",
    },
  });

  // Update form when category changes
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
      });
    }
  }, [category, form]);

  const onSubmit = async (data: UpdateCategoryFormData) => {
    if (!category?.id) return;

    try {
      const res = await updateBlogCategory(category.id, data);
      if (res.success) {
        toast.success("Category updated successfully!");
        form.reset();
      } else {
        toast.error("Failed to update category");
      }
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update category");
      // console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="bg-white max-w-96" title="Edit Blog Category">
      <ModalHeader>
        <ModalTitle>Edit Blog Category</ModalTitle>
      </ModalHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalBody>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Updating..." : "Update Category"}
            </Button>
          </ModalFooter>
        </form>
      </Form>
    </Modal>
  );
}
