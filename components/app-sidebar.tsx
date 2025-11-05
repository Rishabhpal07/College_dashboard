"use client";

import { useEffect, useState } from "react";
import { Calendar, Home, Inbox, LayoutDashboard, Search, Settings, UserRoundPen, User, GraduationCap, Bot, Calendar1, Contact2, LocateIcon, IdCard, Mail } from "lucide-react";
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
      <SidebarContent className="flex flex-col items-center p-4 md:p-6">
        <div className="mb-6">
          <img
            src={session?.user?.image || "/profile.png"}
            alt="Profile"
            className="rounded-full border w-12 h-12 object-cover"
          />
        </div>

        <SidebarGroup className="gap-7 text-center">
          {session.user.Role=='student' ?
          <SidebarGroupLabel className="flex flex-col gap-10 items-center">
            <div className="flex items-center gap-2">
              <UserRoundPen />
              <div className="text-lg font-semibold">{session?.user?.Role}</div>
            </div>

            <div className="flex items-center gap-2">
              <User />
              <div className="text-lg font-semibold">{user?.name || "Loading..."}</div>
            </div>

            <div className="flex items-center gap-2">
              <GraduationCap />
              <div className="text-lg font-semibold">{user?.course || "Loading..."}</div>
            </div>
            <div className="flex items-center gap-2">
              <Bot/>
              <div className="text-lg font-semibold">{user?.Branch || "Loading..."}</div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar1 />
              <div className="text-lg font-semibold">{user?.Academic_Year || "Loading..."}</div>
            </div>


            <div className="flex items-center gap-2">
              <Contact2/>
              <div className="text-lg font-semibold">{user?.Contacts || "Loading..."}</div>
            </div>


            <div className="flex items-center gap-2">
              <LocateIcon />
              <div className="text-lg font-semibold">{user?.Address || "Loading..."}</div>
            </div>
          </SidebarGroupLabel>:<SidebarGroupLabel className="flex flex-col gap-10 items-center">
            <div className="flex items-center gap-2">
              <UserRoundPen />
              <div className="text-lg font-semibold">{session?.user?.Role}</div>
            </div>

            <div className="flex items-center gap-2">
              <User />
              <div className="text-lg font-semibold">{user?.name || "Loading..."}</div>
            </div>

            <div className="flex items-center gap-2">
              <IdCard/>
              <div className="text-lg font-semibold">{user?.EmployeeId || "Loading..."}</div>
            </div>
            <div className="flex items-center gap-2">
              <Mail/>
              <div className="text-lg font-semibold">{user?.OfficialEmail || "Loading..."}</div>
            </div>

            <div className="flex items-center gap-2">
            <LocateIcon />
              <div className="text-lg font-semibold">{user?.PermanentAddress || "Loading..."}</div>
            </div>
          </SidebarGroupLabel>
       }

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
