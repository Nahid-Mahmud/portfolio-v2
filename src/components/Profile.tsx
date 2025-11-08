"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Save, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const { updateMyProfile } = await import("@/actions/user.actions");

const profileSchema = z.object({
  bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
  photo: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

type ProfileProps = {
  profile?: {
    bio?: string;
    photo?: string;
  } | null;
};

export default function Profile({ profile }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(profile?.photo || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: profile?.bio || "",
      photo: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldOnChange: (file: File | null) => void) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // 5MB max
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        e.target.value = "";
        setSelectedFile(null);
        setPreviewImage(profile?.photo || "");
        fieldOnChange(null);
        return;
      }
      setSelectedFile(file);
      fieldOnChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewImage(profile?.photo || "");
      fieldOnChange(null);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const updateData: {
        bio?: string;
        photo?: File | undefined;
        deletePhoto?: string | undefined;
      } = {
        bio: data.bio,
        photo: selectedFile || undefined,
      };
      if (selectedFile && profile?.photo) {
        updateData.deletePhoto = profile.photo;
      }
      const result = await updateMyProfile(updateData);
      if (result.success) {
        toast.success("Profile updated — Your changes have been saved successfully.");
        setIsEditing(false);
      } else {
        toast.error(result.error || "Failed to update profile.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred while updating profile.");
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">Profile</CardTitle>
        <CardDescription className="text-muted-foreground">Manage your profile photo and bio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <Avatar className="h-24 w-24 border-2 border-border">
                            <AvatarImage src={previewImage} alt="Profile photo" />
                          </Avatar>
                          <label
                            htmlFor="photo-upload"
                            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity hover:opacity-100"
                          >
                            <Camera className="h-6 w-6 text-white" />
                            <Input
                              id="photo-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => handleImageChange(e, field.onChange)}
                              disabled={isLoading}
                            />
                          </label>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            Click on the photo to upload a new image. Recommended size: 400x400px.
                          </p>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        className="min-h-32 resize-none"
                        maxLength={500}
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground">{field.value?.length || 0}/500 characters</div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="gap-2" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 bg-transparent"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <div className="space-y-4">
              <div className="text-sm font-medium">Profile Photo</div>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-2 border-border">
                    <AvatarImage src={previewImage} alt="Profile photo" />
                  </Avatar>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-sm font-medium">Bio</div>
              <p className="text-sm leading-relaxed text-foreground">
                {profile?.bio ? profile.bio : "No bio available."}
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
