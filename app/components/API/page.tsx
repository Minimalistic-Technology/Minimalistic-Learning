"use client"; //made by Sandip

import React from "react";
import DogImage from "./dog/page";
import CarImage from "./image/page";

const Page: React.FC = () => {
  return (
    <div className="p-32 flex gap-40">
      <DogImage />
      <CarImage />
    </div>
  );
};

export default Page;
