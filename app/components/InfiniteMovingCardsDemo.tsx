
// "use client";

// import React, { useEffect, useState } from "react";
// import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

// // Define the type for a single testimonial item
// interface Testimonial {
//   id?: string;
//   quote: string;
//   name: string;
//   title: string;
// }

// export function InfiniteMovingCardsDemo() {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:5000/quotes/latest")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch quotes");
//         }
//         return response.json();
//       })
//       .then((data: Testimonial[]) => {
//         // Add unique ids for each item based on index
//         const withUniqueIds = data.map((item: Testimonial, index: number) => ({
//           ...item,
//           id: item.id ?? `${item.name}-${index}`, // fallback to name + index
//         }));
//         setTestimonials(withUniqueIds);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching quotes:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="h-[20rem] rounded-md flex flex-col antialiased bg-[#daf0ff] dark:bg-blue-200 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
//       <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

// Define the type for a single testimonial item
interface Testimonial {
  id: string;        // Made `id` required now after processing
  quote: string;
  name: string;
  title: string;
}

export function InfiniteMovingCardsDemo() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/quotes/latest")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quotes");
        }
        return response.json();
      })
      .then((data: Omit<Testimonial, 'id'>[]) => {
        // Ensure every testimonial has a unique `id`
        const withUniqueIds: Testimonial[] = data.map((item, index) => ({
          ...item,
          id: `${item.name.replace(/\s+/g, "-").toLowerCase()}-${index}`
        }));
        setTestimonials(withUniqueIds);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="h-[20rem] flex items-center justify-center text-gray-600">
        Loading quotes...
      </div>
    );
  }
return (
  <div
  className="h-[20rem] rounded-md flex flex-col antialiased bg-[#daf0ff] dark:bg-blue-200 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden"
  style={{
    maskImage: 'linear-gradient(to right, transparent 1%, black 10%, black 90%, transparent 99%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 1%, black 10%, black 90%, transparent 99%)'
  }}
>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
