"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebaseDb";
import { Timetable } from "@/utils/types/timetable";
import TimetableCard from "./TableCard";

export default function TimetableList({ allowEdit = false }: { allowEdit?: boolean }) {
  const [timetables, setTimetables] = useState<Timetable[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "timetables"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Timetable[];
      setTimetables(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {timetables.map((t) => (
        <TimetableCard key={t.id} data={t} />
      ))}
    </div>
  );
}
