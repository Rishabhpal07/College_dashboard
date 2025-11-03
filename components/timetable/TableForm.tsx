"use client";

import { useState, useEffect } from "react";
import { doc, updateDoc, addDoc, collection, getDoc } from "firebase/firestore";
import { Timetable } from "@/utils/types/timetable";
import { db } from "@/utils/firebaseDb";

export default function TimetableForm({ editId, onClose }: { editId?: string; onClose?: () => void }) {
  const [formData, setFormData] = useState<Timetable>({
    "code": "",
    "location": "",
    "subject": "",
    "time": "",
    duration: "",
    "faculty": "",
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (editId) {
        const docRef = doc(db, "timetables", editId);
        const snap = await getDoc(docRef);
        if (snap.exists()) setFormData(snap.data() as Timetable);
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
      const ref = doc(db, "timetables", editId);
      await updateDoc(ref, formData);
    } else {
      await addDoc(collection(db, "timetables"), formData);
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
