"use client";

import { useEffect, useState } from "react";
import { Calendar, Home, Inbox, LayoutDashboard, Search, Settings, UserRoundPen, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

export function AppSidebar() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/user?email=${session.user.email}`);
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [session]);

  if (!session) return null;

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col items-center p-6">
        <div className="mb-6">
          <img
            src={session?.user?.image || "/profile.png"}
            alt="Profile"
            className="rounded-full border w-10 h-13 object-cover"
          />
        </div>

        <SidebarGroup className="gap-4 text-center">
          <SidebarGroupLabel className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-2">
              <UserRoundPen />
              <div className="text-lg font-semibold">{session?.user?.Role}</div>
            </div>

            <div className="flex items-center gap-2">
              <User />
              <div className="text-lg font-semibold">{user?.name || "Loading..."}</div>
            </div>

            <div className="flex items-center gap-2">
              <User />
              <div className="text-lg font-semibold">{user?.Branch || "Loading..."}</div>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-6">
              {/* Add menu links here */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
