"use client";  //made by sandip

import React, { useEffect, useState } from "react";

const DogImage: React.FC = () => {
  const [dogImage, setDogImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => setDogImage(data.message))
      .catch((error) => console.error("Error fetching dog image:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Random Dog Image</h2>
      {dogImage ? <img src={dogImage} alt="Dog" className="mt-2 w-64 h-64" /> : <p>Loading...</p>}
    </div>
  );
};

export default DogImage;
