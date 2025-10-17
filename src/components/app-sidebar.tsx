"use client";
import { Minus, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/service/logoutUser";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Blogs",
      url: "#",
      items: [
        {
          title: "Add Blogs",
          url: "/dashboard/blogs/add-blogs",
        },
        {
          title: "All Blogs",
          url: "/dashboard/blogs/all-blogs",
        },
        {
          title: "Blog Category",
          url: "/dashboard/blogs/blog-category",
        },
      ],
    },
    // {
    //   title: "Photo Gallery",
    //   url: "/dashboard/photo-gallery",
    // },
    {
      title: "Project",
      url: "#",
      items: [
        {
          title: "Add New",
          url: "/dashboard/project/add-new",
        },
        {
          title: "All Projects",
          url: "/dashboard/project/all",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex flex-col ">
                  <span className="font-bold text-2xl">Go Home</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => {
              const isActive = item.items?.length
                ? item.items.some((sub) => pathname === sub.url)
                : pathname === item.url;

              return item.items?.length ? (
                <Collapsible key={item.title} defaultOpen={isActive || index === 1} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className={isActive ? "bg-accent" : ""}>
                        {item.title} <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const isSubActive = pathname === subItem.url;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild className={isSubActive ? "bg-black/10" : ""}>
                                <Link href={subItem.url}>{subItem.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={isActive ? "bg-accent" : ""}>
                    <Link href={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="space-y-3">
            <SidebarMenuButton asChild>
              <Link href="/dashboard/profile" className="">
                <Button className="w-full text-left cursor-pointer hover:text-white ">Profile</Button>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Button
                variant={"destructive"}
                onClick={() => logoutUser(router)}
                className="w-full text-left hover:bg-red-800 cursor-pointer hover:text-white"
              >
                Logout
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
