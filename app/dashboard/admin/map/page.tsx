import CampusTourModal from "@/components/map/Campus3D";
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



//   'use client'

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import CampusTourModal from '@/components/map/Campus3D';


// export default function HomePage() {
//   const [showTour, setShowTour] = useState(false);

//   return (
//     <main className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      
//       {/* LEFT HALF — 360° Viewer */}
//       <div className="w-full md:w-1/2 h-full relative">
//         <iframe
//           src="https://momento360.com/e/u/45d19f52ca2e4df48835dca5957f6839?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true"
//           title="360° Campus View"
//           allowFullScreen
//           loading="lazy"
//           className="absolute top-0 left-0 w-full h-full border-none"
//           style={{
//             border: 'none',
//             display: 'block',
//           }}
//         ></iframe>
//       </div>

//       {/* RIGHT HALF — Text + Button */}
//       <div className="flex flex-col justify-center items-start px-12 md:w-1/2 bg-white relative">
//         {/* 360° Button */}
//         <div className="absolute top-8 right-8">
//           <Button
//             onClick={() => setShowTour(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-5 py-2"
//           >
//             🎥 360° Campus View
//           </Button>
//         </div>

//         {/* Heading & Text */}
//         <div className="max-w-md">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
//             Welcome to College Dashboard
//           </h1>
//           <p className="text-gray-600 text-lg md:text-xl">
//             Explore your college in an immersive 360° virtual tour.
//           </p>
//         </div>
//       </div>

//       {/* Modal (unchanged) */}
//       {showTour && <CampusTourModal onClose={() => setShowTour(false)} />}
//     </main>
//   );
// }