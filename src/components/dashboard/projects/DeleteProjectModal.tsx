"use client";

import { deleteProject } from "@/actions/project.actions";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface ProjectData {
  id: string;
  title: string;
  shortDescription: string;
  liveLink: string;
  frontendLink: string;
  backendLink: string;
  photo: string;
  altText: string;
  category: "FullStack" | "Frontend";
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
  onDelete: (id: string) => void;
}

export default function DeleteProjectModal({ isOpen, onClose, project, onDelete }: DeleteProjectModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!project?.id) return;

    setIsDeleting(true);
    try {
      const result = await deleteProject(project.id);
      if (result.success) {
        toast.success("Project deleted successfully");
        onDelete(project.id);
        onClose();
      } else {
        toast.error(result.error || "Failed to delete project");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the project");
      // console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="bg-white max-w-md" title="Delete Project">
      <ModalHeader>
        <ModalTitle>Delete Project</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete the project <strong>&ldquo;{project?.title}&rdquo;</strong>? This action
          cannot be undone and will permanently remove all project data.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button type="button" variant="outline" onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
