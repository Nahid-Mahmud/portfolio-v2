"use client";

import AddPhotoDialog from "@/components/AddPhotoDialog";
import EditAltDialog from "@/components/EditAltDialog";
import PhotoCard from "@/components/PhotoCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

interface Photo {
  url: string;
  alt: string;
}

type AddPhotoValues = {
  url: string;
  alt: string;
};

type EditAltValues = {
  alt: string;
};

interface PhotoGalleryClientProps {
  initialPhotos: Photo[];
}

export default function PhotoGalleryClient({ initialPhotos }: PhotoGalleryClientProps) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchPhotos = async () => {
    try {
      const response = await fetch("/api/photos");
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Failed to fetch photos:", error);
    }
  };

  const onSubmit = async (values: AddPhotoValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast.success("Photo added successfully!");
        fetchPhotos();
      } else {
        toast.error("Failed to add photo");
      }
    } catch (error) {
      console.error("Failed to add photo:", error);
      toast.error("Failed to add photo");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard!");
  };

  const startEditAlt = (photo: Photo) => {
    setEditingPhoto(photo);
    setEditDialogOpen(true);
  };

  const onEditSubmit = async (values: EditAltValues) => {
    if (!editingPhoto) return;
    setLoading(true);
    try {
      const response = await fetch("/api/photos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: editingPhoto.url, alt: values.alt }),
      });
      if (response.ok) {
        toast.success("Alt text updated successfully!");
        fetchPhotos();
      } else {
        toast.error("Failed to update alt text");
      }
    } catch (error) {
      console.error("Failed to update alt text:", error);
      toast.error("Failed to update alt text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Photo Gallery</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add New Photo</Button>
          </DialogTrigger>
          <AddPhotoDialog onSubmit={onSubmit} loading={loading} setOpen={setOpen} />
        </Dialog>
      </div>

      <EditAltDialog
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        editingPhoto={editingPhoto}
        onEditSubmit={onEditSubmit}
        loading={loading}
        setEditingPhoto={setEditingPhoto}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <PhotoCard key={index} photo={photo} copyToClipboard={copyToClipboard} startEditAlt={startEditAlt} />
        ))}
      </div>
    </div>
  );
}
