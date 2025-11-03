"use client";

import TimetableList from "@/components/timetable/TimetableList";
import { UpcomingClasses } from "@/components/UpcomingClasses";
import { WeeklyTimetable } from "@/components/WeeklyTimetable";

export default function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Class Timetable</h1>
      <UpcomingClasses/>
      <WeeklyTimetable/>
    </div>
  );
}
