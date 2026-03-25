"use client";

import { deleteBlog, togglePublishBlog } from "@/actions/blog.actions";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Blog {
  id: string;
  title: string;
  description: string;
  photo: string;
  altText: string;
  slug: string;
  categoryId: string;
  isPublished: boolean;
  createdAt: string;
}

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteBlog(blog.id);
      if (result.success) {
        toast.success("Blog deleted successfully!");
      }
      // eslint rule to disable unused variable error for result
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Error deleting blog:", error);
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  const handleTogglePublish = async () => {
    setIsToggling(true);
    try {
      const result = await togglePublishBlog(blog.id, !blog.isPublished);
      if (result.success) {
        toast.success(blog.isPublished ? "Blog unpublished successfully!" : "Blog published successfully!");
      }
      // eslint rule to disable unused variable error for result
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Error toggling publish:", error);
    } finally {
      setIsToggling(false);
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
          <div className="flex items-center justify-between">
            <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
            <Badge variant={blog.isPublished ? "default" : "secondary"}>
              {blog.isPublished ? "Published" : "Draft"}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">{blog.description}</CardDescription>
          <p className="text-sm text-muted-foreground">Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
        </CardContent>
        <CardFooter className="items-end flex w-full justify-end gap-2.5 flex-wrap">
          <Button variant={"outline"} asChild>
            <Link href={`/dashboard/blogs/preview/${blog.id}`} target="_blank">
              Preview
            </Link>
          </Button>
          <Button
            variant={blog.isPublished ? "secondary" : "default"}
            onClick={handleTogglePublish}
            disabled={isToggling}
          >
            {isToggling ? "..." : blog.isPublished ? "Unpublish" : "Publish"}
          </Button>
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
          <p>Are you sure you want to delete the blog &ldquo;{blog.title}&rdquo;? This action cannot be undone.</p>
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
