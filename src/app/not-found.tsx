import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold  mb-4">404</h1>
        <h2 className="text-2xl font-semibold  mb-4">Page Not Found</h2>
        <p className=" mb-8 max-w-md">The page you're looking for doesn't exist or may have been moved.</p>
        <Link href="/" className="z-10 cursor-pointer">
          <Button variant={"outline"} className="cursor-pointer">
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
