import { AppSidebar } from "@/shared/components/app-sidebar";
import Footer from "@/shared/components/layout/blocks/Footer";
import Header from "@/shared/components/layout/blocks/Header";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-1 flex-col p-6">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
