"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/Modal";
import { deleteBlog } from "@/actions/blog.actions";
import { toast } from "sonner";

interface Blog {
  id: string;
  title: string;
  description: string;
  photo: string;
  altText: string;
  slug: string;
  categoryId: string;
  createdAt: string;
}

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteBlog(blog.id);
      if (result.success) {
        toast.success("Blog deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Card key={blog.slug} className="z-10 flex flex-col h-full pt-0">
        {blog.photo && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            <Image src={blog.photo} alt={blog.altText} fill className="object-cover" />
          </div>
        )}
        <CardContent className="space-y-2 pt-4 flex-1">
          <CardTitle>{blog.title}</CardTitle>
          <CardDescription>{blog.description}</CardDescription>
          <p className="text-sm text-muted-foreground">Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
        </CardContent>
        <CardFooter className="items-end flex w-full justify-end gap-2.5">
          <Button variant={"outline"} asChild>
            <Link href={`/dashboard/blogs/edit-blogs/${blog.id}`} className="text-primary font-medium">
              Edit Blog
            </Link>
          </Button>
          <Button
            className="hover:bg-red-900 cursor-pointer"
            variant={"destructive"}
            onClick={() => setIsModalOpen(true)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>

      <Modal
        className="bg-white max-w-md"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete Blog"
      >
        <ModalHeader>
          <ModalTitle>Confirm Deletion</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete the blog "{blog.title}"? This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
