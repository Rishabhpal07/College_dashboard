"use client";

import { Timetable } from "@/utils/types/timetable";

export default function TimetableCard({
  data,
  editable = false,
  onEdit,
}: {
  data: Timetable;
  editable?: boolean;
  onEdit?: (id: string) => void;
}) {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{data["subject"]}</h2>
      <p>Code: {data["code"]}</p>
      <p>Faculty: {data["faculty"]}</p>
      <p>Room: {data["location"]}</p>
      <p>Start: {data["time"]}</p>
      <p>Duration: {data.duration}</p>
    </div>
  );
}
