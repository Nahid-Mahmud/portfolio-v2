"use client";

import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateCategoryModal from "./CreateCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

type Category = {
  id?: string;
  name: string;
  description?: string | null;
};

interface CategoryListProps {
  categories?: Category[];
}

export default function CategoryList({ categories = [] }: CategoryListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    if (!category.id) return;
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  // console.log(categories);

  // Defensive: ensure we have an array to map over.
  const list: Category[] = Array.isArray(categories) ? categories : [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Categories</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {list.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No categories yet. Click &ldquo;Add Category&rdquo; to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((cat) => (
            <div key={cat.id ?? cat.name} className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <div className="font-medium">{cat.name}</div>
                {cat.description ? <div className="text-sm text-muted-foreground">{cat.description}</div> : null}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(cat)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(cat)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
      />
      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        category={categoryToDelete}
      />
    </div>
  );
}
