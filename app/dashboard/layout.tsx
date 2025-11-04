import { AppSidebar } from "@/components/app-sidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1">
          <AppHeader />
          <div className="p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
