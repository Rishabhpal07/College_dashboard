"use client";

import dynamic from "next/dynamic";

const CampusMap = dynamic(() => import("@/components/map/CampusMap"), {
  ssr: false,
});

export default function MapClient() {
  return <CampusMap />;
}


