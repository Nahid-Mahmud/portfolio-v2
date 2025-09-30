"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const editFormSchema = z.object({
  alt: z.string(),
});

interface Photo {
  url: string;
  alt: string;
}

interface EditAltDialogProps {
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
  editingPhoto: Photo | null;
  onEditSubmit: (values: z.infer<typeof editFormSchema>) => void;
  loading: boolean;
  setEditingPhoto: (photo: Photo | null) => void;
}

export default function EditAltDialog({
  editDialogOpen,
  setEditDialogOpen,
  editingPhoto,
  onEditSubmit,
  loading,
  setEditingPhoto,
}: EditAltDialogProps) {
  const editForm = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: { alt: "" },
  });

  useEffect(() => {
    if (editingPhoto) {
      editForm.setValue("alt", editingPhoto.alt);
    }
  }, [editingPhoto, editForm]);

  const handleSubmit = (values: z.infer<typeof editFormSchema>) => {
    onEditSubmit(values);
    setEditDialogOpen(false);
    setEditingPhoto(null);
    editForm.reset();
  };

  return (
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Alt Text</DialogTitle>
        </DialogHeader>
        <Form {...editForm}>
          <div className="flex flex-col gap-4">
            <FormField
              control={editForm.control}
              name="alt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Alt text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button onClick={editForm.handleSubmit(handleSubmit)} disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
