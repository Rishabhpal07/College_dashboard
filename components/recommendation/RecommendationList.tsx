"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebaseDb";
import { Recommendation } from "@/utils/types/recommendation";
import RecommendationCard from "./RecommendationCard";


export default function RecommendationList({ allowEdit = false }: { allowEdit?: boolean }) {
  const [announcement, setAnnouncement] = useState<Recommendation[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "recommendation"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Recommendation[];
      setAnnouncement(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {announcement.map((t) => (
        <RecommendationCard key={t.id} data={t} />
      ))}
    </div>
  );
}