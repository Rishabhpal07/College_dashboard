"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import L, { CRS, LatLngExpression, LatLngBoundsExpression } from "leaflet";

// Fix Leaflet's default icon paths under bundlers like Next.js
import markerIcon2xUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

type Location = {
  name: string;
  position: LatLngExpression;
  image: string;
  description: string;
};

export default function CampusMap() {
  // Define the intrinsic pixel size of the campus map image
  // Adjust if you replace the placeholder with your real image size
  const imageWidth = 2000; // px
  const imageHeight = 1400; // px

  const bounds = useMemo<LatLngBoundsExpression>(() => {
    // Using CRS.Simple where coordinates are in image pixels with origin at top-left
    return [
      [0, 0],
      [imageHeight, imageWidth],
    ];
  }, [imageHeight, imageWidth]);

  const locations = useMemo<Location[]>(
    () => [
      {
        name: "Main Building",
        position: [350, 900],
        image: "/college-images/main-building.jpg",
        description: "Administrative offices and central auditorium.",
      },
      {
        name: "Library",
        position: [800, 1200],
        image: "/college-images/library.jpg",
        description: "Quiet study spaces and extensive collections.",
      },
      {
        name: "Canteen",
        position: [820, 700],
        image: "/college-images/canteen.jpg",
        description: "Snacks, meals, and coffee all day.",
      },
      {
        name: "Hostel",
        position: [1005, 400],
        image: "/college-images/hostel.jpg",
        description: "On-campus student accommodation.",
      },
      {
        name: "Playground",
        position: [500, 1500],
        image: "/college-images/playground.jpg",
        description: "Open field for sports and events.",
      },
    ],
    []
  );

  useEffect(() => {
    // Ensure Leaflet's default icon URLs are correctly configured
    const DefaultIcon = L.Icon.Default as any;
    DefaultIcon.mergeOptions({
      iconRetinaUrl: markerIcon2xUrl.src ?? markerIcon2xUrl,
      iconUrl: markerIconUrl.src ?? markerIconUrl,
      shadowUrl: markerShadowUrl.src ?? markerShadowUrl,
    });
  }, []);

  return (
    <div className="w-full h-[70vh] rounded-lg overflow-hidden border border-zinc-200">
      <MapContainer
        crs={CRS.Simple}
        zoom={-1}
        minZoom={-4}
        maxZoom={2}
        center={[imageHeight / 2, imageWidth / 2]}
        bounds={bounds}
        style={{ width: "100%", height: "100%" }}
      >
        <ImageOverlay url="/map/campus-map.png" bounds={bounds} />
        {locations.map((loc) => (
          <Marker key={loc.name} position={loc.position}>
            <Popup>
              <div className="w-56">
                <h3 className="font-semibold mb-2">{loc.name}</h3>
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-sm text-zinc-700 mt-2">{loc.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}


