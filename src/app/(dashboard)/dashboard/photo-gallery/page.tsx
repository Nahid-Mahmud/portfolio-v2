import PhotoGalleryClient from "@/components/PhotoGalleryClient";
import fs from "fs";
import path from "path";

interface Photo {
  url: string;
  alt: string;
}

async function fetchPhotos(): Promise<Photo[]> {
  try {
    const dataFilePath = path.join(process.cwd(), "src", "data", "photos.json");
    const data = fs.readFileSync(dataFilePath, "utf8");
    const photos: Photo[] = JSON.parse(data);
    return photos;
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    return [];
  }
}

export default async function PhotoGallery() {
  const photos = await fetchPhotos();
  return <PhotoGalleryClient initialPhotos={photos} />;
}
