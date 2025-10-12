"use client";

import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { deleteBlogCategory } from "@/actions/blog.category.actions";
import { toast } from "sonner";

type Category = {
  id?: string;
  name: string;
  description?: string | null;
};

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

export default function DeleteCategoryModal({ isOpen, onClose, category }: DeleteCategoryModalProps) {
  const handleDelete = async () => {
    if (!category?.id) return;

    try {
      const res = await deleteBlogCategory(category.id);
      if (res.success) {
        toast.success("Category deleted successfully!");
        onClose();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="bg-white max-w-md" title="Delete Blog Category">
      <ModalHeader>
        <ModalTitle>Delete Blog Category</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete the category <strong>"{category?.name}"</strong>? This action cannot be
          undone.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}
