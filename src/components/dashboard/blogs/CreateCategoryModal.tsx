"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogCategoryZodSchema } from "@/lib/blog-category-schemas";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

type CreateCategoryFormData = {
  name: string;
};

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCategoryModal({ isOpen, onClose }: CreateCategoryModalProps) {
  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createBlogCategoryZodSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateCategoryFormData) => {
    try {
      // TODO: Call API to create category
      console.log("Creating category:", data);
      toast.success("Category created successfully!");
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Failed to create category");
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="bg-white max-w-96" title="Create Blog Category">
      <ModalHeader>
        <ModalTitle>Create New Blog Category</ModalTitle>
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
              {form.formState.isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </ModalFooter>
        </form>
      </Form>
    </Modal>
  );
}
