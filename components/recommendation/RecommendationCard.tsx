"use client";

import { Recommendation } from "@/utils/types/recommendation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import RecommendationEdit from "./RecommendationEdit";
import { useSession } from "next-auth/react";

export default function RecommendationCard({ data }: { data: Recommendation }) {
  const [open, setOpen] = useState(false);
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
    <div className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition flex flex-col gap-3">
      <h2 className="text-lg font-semibold">{data.venue}</h2>
      <img
        src={data.image}
        alt={data.venue}
        className="w-full h-40 object-cover rounded-lg"
      />
      <p>Total Seats: {data.total_seat}</p>
      <p>Occupied: {data.unavilable_sheet}</p>
 
      {session.user.Role=='admin'?
      <Button onClick={() => setOpen(true)} className="w-full">
        Edit
      </Button>:''}

      {/* Pass props to dialog */}
      <RecommendationEdit open={open} setOpen={setOpen} data={data} />
    </div>
  );
}
