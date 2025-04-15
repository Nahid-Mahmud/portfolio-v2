"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);

    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        toast.error(`Failed to send message: ${errorData.message}`);
      }
    } catch {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }

    // setFormData({ name: "", email: "", message: "" });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="h-12 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="h-12 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          className="min-h-[155px] border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 resize-none"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-[#101828] text-white hover:bg-[#101828] dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 cursor-pointer transition-all duration-200"
      >
        {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
        Send Message
      </Button>
    </form>
  );
}

export default ContactForm;
