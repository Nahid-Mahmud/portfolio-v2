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
import { useFileUpload } from "@/hooks/use-file-upload";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

const formSchema = z.object({
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { alt: "" },
  });

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 1;

  const [
    { files, isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: false,
    maxFiles,
    initialFiles: [],
  });

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (files.length > 0 && !form.getValues().alt) {
      form.setValue("alt", "");
    }
  }, [files, form]);

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
    console.log("Form values:", values);
    console.log("Files:", files);
    setOpen(false);
    form.reset();
    toast.success("Form submitted successfully!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard!");
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
              <div className="flex flex-col gap-2">
                {/* Drop area */}
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  data-dragging={isDragging || undefined}
                  data-files={files.length > 0 || undefined}
                  className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
                >
                  <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />
                  {files.length > 0 ? (
                    <div className="flex w-full flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-medium">Selected File</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={openFileDialog}
                          disabled={files.length >= maxFiles}
                        >
                          <UploadIcon className="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
                          Replace
                        </Button>
                      </div>

                      <div className="flex justify-center">
                        <div className="bg-accent relative flex flex-col gap-2 rounded-md p-2 max-w-xs">
                          <div className="relative aspect-square">
                            <img
                              src={files[0].preview}
                              alt={files[0].file.name}
                              className="size-full rounded-[inherit] object-cover"
                            />
                            <Button
                              onClick={() => removeFile(files[0].id)}
                              size="icon"
                              className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                              aria-label="Remove image"
                            >
                              <XIcon className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                      <div
                        className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                      >
                        <ImageIcon className="size-4 opacity-60" />
                      </div>
                      <p className="mb-1.5 text-sm font-medium">Drop your image here</p>
                      <p className="text-muted-foreground text-xs">SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)</p>
                      <Button variant="outline" className="mt-4" onClick={openFileDialog}>
                        <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
                        Select image
                      </Button>
                    </div>
                  )}
                </div>

                {files.length > 0 && (
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
                )}

                {errors.length > 0 && (
                  <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                  </div>
                )}

                <Button onClick={form.handleSubmit(onSubmit)} disabled={loading || files.length === 0}>
                  {loading ? "Adding..." : "Add Photo"}
                </Button>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="relative w-full h-48 mb-4">
                <Image src={photo.url} alt={photo.alt} fill className="object-cover rounded" />
              </div>
              <p className="text-sm text-gray-600 mb-2">{photo.alt}</p>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(photo.url)}>
                Copy URL
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
