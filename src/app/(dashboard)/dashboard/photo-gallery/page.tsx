import PhotoGalleryClient from "@/components/PhotoGalleryClient";

interface Photo {
  url: string;
  alt: string;
}

async function fetchPhotos(): Promise<Photo[]> {
  try {
    const response = await fetch("/api/photos");
    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    return [];
  }
}

export default async function PhotoGallery() {
  const photos = await fetchPhotos();
  return <PhotoGalleryClient initialPhotos={photos} />;
}
