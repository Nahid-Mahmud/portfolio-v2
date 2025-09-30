"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
});

const editFormSchema = z.object({
  alt: z.string(),
});

interface Photo {
  url: string;
  alt: string;
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "", alt: "" },
  });

  const editForm = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: { alt: "" },
  });

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch("/api/photos");
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Failed to fetch photos:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast.success("Photo added successfully!");
        setOpen(false);
        form.reset();
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
    editForm.setValue("alt", photo.alt);
    setEditDialogOpen(true);
  };

  const onEditSubmit = async (values: z.infer<typeof editFormSchema>) => {
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
        setEditDialogOpen(false);
        setEditingPhoto(null);
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
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add Photo</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Image URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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

                <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
                  {loading ? "Adding..." : "Add Photo"}
                </Button>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

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
                <Button onClick={editForm.handleSubmit(onEditSubmit)} disabled={loading}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="relative w-full h-48 mb-4">
                <Image src={photo.url} alt={photo.alt} fill className="object-cover rounded" />
              </div>
              <p className="text-sm text-gray-600 mb-2">{photo.alt}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(photo.url)}>
                  Copy URL
                </Button>
                <Button variant="outline" size="sm" onClick={() => startEditAlt(photo)}>
                  Edit Alt
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
