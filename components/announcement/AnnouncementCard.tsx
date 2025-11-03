"use client";

import { Announcement } from "@/utils/types/announcement";

export default function AnnouncementCard({
  data,
  editable = false,
  onEdit,
}: {
  data: Announcement;
  editable?: boolean;
  onEdit?: (id: string) => void;
}) {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{data["title"]}</h2>
      <p>Venue: {data["venue"]}</p>
      <p>Date: {data["date"]}</p>
      <p>Time: {data["time"]}</p>
      <p>Description: {data["description"]}</p>
    </div>
  );
}
