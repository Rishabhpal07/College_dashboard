import MapClient from "@/components/map/MapClient";

export default function Home() {
    return (
      <div className="space-y-4">
        <p className="text-zinc-600">
          Explore the campus by zooming and panning the custom map. Click markers
          to view photos and descriptions.
        </p>
        <MapClient />
      </div>
    );
  }
