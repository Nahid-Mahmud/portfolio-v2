"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFileUpload } from "@/hooks/use-file-upload";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

const formSchema = z.object({
  alt: z.string(),
});

interface AddPhotoDialogProps {
  onSubmit: (values: { url: string; alt: string }) => void;
  loading: boolean;
  setOpen: (open: boolean) => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddPhotoDialog({ onSubmit, loading, setOpen }: AddPhotoDialogProps) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

  const [
    { files, isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: false,
    maxFiles: 1,
    initialFiles: [],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { alt: "" },
  });

  const handleSubmit = () => {
    if (files.length === 0) return;
    const file = files[0].file as File;
    const reader = new FileReader();
    reader.onload = () => {
      onSubmit({ url: reader.result as string, alt: form.getValues("alt") });
      form.reset();
      removeFile(files[0].id);
    };
    reader.readAsDataURL(file);
  };

  return (
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Upload Photo</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
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
                <h3 className="truncate text-sm font-medium">Uploaded Photo</h3>
                <Button variant="outline" size="sm" onClick={openFileDialog} disabled={files.length >= 1}>
                  <UploadIcon className="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
                  Replace
                </Button>
              </div>

              <div className="flex justify-center">
                <div className="bg-accent relative aspect-square w-32 rounded-md">
                  <img src={files[0].preview} alt="Uploaded" className="size-full rounded-[inherit] object-cover" />
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

        {errors.length > 0 && (
          <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
            <AlertCircleIcon className="size-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}

        <Form {...form}>
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
        </Form>

        <Button onClick={handleSubmit} disabled={loading || files.length === 0}>
          {loading ? "Uploading..." : "Upload Photo"}
        </Button>
      </div>
    </DialogContent>
  );
}
