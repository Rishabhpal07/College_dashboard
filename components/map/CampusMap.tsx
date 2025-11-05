"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import L, { CRS, LatLngExpression, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";


// Fix Leaflet marker icons for Next.js bundling
import markerIcon2xUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

type Location = {
  name: string;
  position: LatLngExpression;
  image: string;
  pano: string;
  description: string;
};


export default function CampusMap() {
  const [show360, setShow360] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageWidth = 2000;
  const imageHeight = 1400;

  const bounds = useMemo<LatLngBoundsExpression>(
    () => [
      [0, 0],
      [imageHeight, imageWidth],
    ],
    [imageHeight, imageWidth]
  );

  const locations = useMemo<Location[]>(
    () => [
      {
        name: "Main Building",
        position: [350, 900],
        image: "/college-images/main-building.jpg",
        pano: "/pano/main-building-360.jpg",
        description: "Administrative offices and central auditorium.",
      },
      {
        name: "Library",
        position: [800, 1200],
        image: "/college-images/library.jpg",
        pano: "/pano/library-360.jpg",
        description: "Quiet study spaces and extensive collections.",
      },
      {
        name: "Canteen",
        position: [820, 700],
        image: "/college-images/canteen.jpg",
        pano: "/pano/canteen-360.jpg",
        description: "Snacks, meals, and coffee all day.",
      },
      {
        name: "Hostel",
        position: [1005, 400],
        image: "/college-images/hostel.jpg",
        pano: "/pano/hostel-360.jpg",
        description: "On-campus student accommodation.",
      },
    ],
    []
  );

  useEffect(() => {
    const DefaultIcon = L.Icon.Default as any;
    DefaultIcon.mergeOptions({
      iconRetinaUrl: markerIcon2xUrl.src ?? markerIcon2xUrl,
      iconUrl: markerIconUrl.src ?? markerIconUrl,
      shadowUrl: markerShadowUrl.src ?? markerShadowUrl,
    });
  }, []);

  return (
    <>
      {/* Map Section */}
      <div className="w-full h-[60vh] md:h-[70vh] rounded-lg overflow-hidden border border-zinc-200 relative z-0">
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
          {locations.map((loc, index) => (
            <Marker key={loc.name} position={loc.position}>
              <Popup>
                <div className="w-56">
                  <h3 className="font-semibold mb-2">{loc.name}</h3>
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-32 object-cover rounded cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(index);
                      setShow360(true);
                    }}
                  />
                  <p className="text-sm text-zinc-700 mt-2">
                    {loc.description}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {show360 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-6xl h-[70vh] md:h-[80vh] rounded-lg overflow-hidden shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setShow360(false)}
              className="absolute top-3 right-3 z-[10000] bg-white text-black rounded-full px-3 py-1 font-semibold shadow hover:bg-gray-200"
            >
              ✕
            </button>

            {/* Prev Button */}
            <button
              onClick={() =>
                setCurrentIndex(
                  (currentIndex - 1 + locations.length) % locations.length
                )
              }
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[10000] bg-white/90 text-black px-3 py-2 rounded-full shadow hover:bg-gray-200"
            >
              ◀ Prev
            </button>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentIndex((currentIndex + 1) % locations.length)
              }
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[10000] bg-white/90 text-black px-3 py-2 rounded-full shadow hover:bg-gray-200"
            >
              Next ▶
            </button>

            {/* 360 Viewer */}
            <ReactPhotoSphereViewer
              src={locations[currentIndex].pano}
              height="100%"
              width="100%"
            />
          </div>
        </div>
      )}
    </>
  );
}
