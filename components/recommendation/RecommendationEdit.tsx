"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { Recommendation } from "@/utils/types/recommendation";
import { db } from "@/utils/firebaseDb";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  data: Recommendation;
}

export default function RecommendationEdit({ open, setOpen, data }: Props) {
  const [formData, setFormData] = useState({
    total_seat: data.total_seat,
    unavilable_sheet: data.unavilable_sheet,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    //@ts-ignore
    const ref = doc(db, "recommendation", data.id);
    await updateDoc(ref, {
      total_seat: Number(formData.total_seat),
      unavilable_sheet: Number(formData.unavilable_sheet),
    });
    setOpen(false);
  };

  // ✅ Important: RETURN JSX
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Recommendation</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          <Label>Total Seats</Label>
          <Input
            name="total_seat"
            type="number"
            value={formData.total_seat}
            onChange={handleChange}
          />

          <Label>Occupied Seats</Label>
          <Input
            name="unavilable_sheet"
            type="number"
            value={formData.unavilable_sheet}
            onChange={handleChange}
          />
          <Button onClick={handleUpdate} className="mt-2">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
