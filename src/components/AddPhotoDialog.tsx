"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
});

interface AddPhotoDialogProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  loading: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddPhotoDialog({ onSubmit, loading, setOpen }: AddPhotoDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "", alt: "" },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
  };

  return (
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

          <Button onClick={form.handleSubmit(handleSubmit)} disabled={loading}>
            {loading ? "Adding..." : "Add Photo"}
          </Button>
        </div>
      </Form>
    </DialogContent>
  );
}
