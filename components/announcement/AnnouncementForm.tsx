"use client";

import { useState, useEffect } from "react";
import { doc, updateDoc, addDoc, collection, getDoc } from "firebase/firestore";

import { db } from "@/utils/firebaseDb";
import { Announcement } from "@/utils/types/announcement";

export default function AnnouncementForm({ editId, onClose }: { editId?: string; onClose?: () => void }) {
  const [formData, setFormData] = useState<Announcement>({
    "title": "",
    "venue": "",
    "date": "",
    "time": "",
    "description":""
  });

  useEffect(() => {
    const fetchData = async () => {
      if (editId) {
        const docRef = doc(db, "announcement", editId);
        const snap = await getDoc(docRef);
        if (snap.exists()) setFormData(snap.data() as Announcement);
      }
    };
    fetchData();
  }, [editId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      const ref = doc(db, "announcement", editId);
      await updateDoc(ref, formData);
    } else {
      await addDoc(collection(db, "announcement"), formData);
    }

    alert("Timetable saved successfully!");
    onClose && onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 max-w-md mt-6">
      {Object.entries(formData).map(([key, value]) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={value}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Save
      </button>
    </form>
  );
}
