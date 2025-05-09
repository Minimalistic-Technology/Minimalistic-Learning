"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/quotes/latest");
        setQuotes(response.data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-[#daf0ff] dark:bg-blue-200 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={quotes}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

