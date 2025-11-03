"use client";
import TimetableForm from "@/components/timetable/TableForm";
import TimetableList from "@/components/timetable/TimetableList";
import { WeeklyTimetable } from "@/components/WeeklyTimetable";
import { useState } from "react";

export default function AdminDashboard() {
  const [editId, setEditId] = useState<string | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Timetable Management</h1>

      <TimetableForm editId={editId || undefined} onClose={() => setEditId(null)} />
      <TimetableList allowEdit />
      <WeeklyTimetable/>
    </div>
  );
}
