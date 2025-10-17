"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function FirstTimeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenDashboardNotice");
    if (!hasSeen) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenDashboardNotice", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white w-80">
        <DialogHeader>
          <DialogTitle className="font-bold">Important Notice</DialogTitle>
          <DialogDescription className="font-semibold text-red-600">
            Change the content responsibly. This is Live and used in Resume for JOB.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end">
          <Button onClick={handleClose} className="w-fit bg-green-600 hover:bg-green-800 cursor-pointer">
            I Understand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
