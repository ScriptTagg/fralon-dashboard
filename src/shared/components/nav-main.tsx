"use client";

import { Button } from "@/shared/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Button size="icon" className="size-8 group-data-[collapsible=icon]:opacity-0" variant="outline">
              <MailIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className=" gap-y-1">
          {items.map((item) => (
            <SidebarMenuItem className="flex" key={item.title}>
              <SidebarMenuButton className="py-2" onClick={() => router.push(item.url)} tooltip={item.title}>
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
