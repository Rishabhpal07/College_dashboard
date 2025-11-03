"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebaseDb";
import { Announcement } from "@/utils/types/announcement";
import AnnouncementCard from "./AnnouncementCard";


export default function AnnouncementList({ allowEdit = false }: { allowEdit?: boolean }) {
  const [announcement, setAnnouncement] = useState<Announcement[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "announcement"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Announcement[];
      setAnnouncement(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {announcement.map((t) => (
        <AnnouncementCard key={t.id} data={t} editable={allowEdit} />
      ))}
    </div>
  );
}