import { StaticImageData } from "next/image";

export interface Project {
  id: string;
  name: string;
  description: string;
  image: StaticImageData;
  liveUrl: string;
  clientRepo?: string;
  serverRepo?: string;
  tags: string[];
  category: string;
}
