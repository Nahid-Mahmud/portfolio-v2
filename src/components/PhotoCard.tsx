"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Photo {
  url: string;
  alt: string;
}

interface PhotoCardProps {
  photo: Photo;
  copyToClipboard: (text: string) => void;
  startEditAlt: (photo: Photo) => void;
}

export default function PhotoCard({ photo, copyToClipboard, startEditAlt }: PhotoCardProps) {
  return (
    <Card>
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
  );
}
