"use client"; //made by sandip

import React, { useState, useEffect } from "react";

const Image: React.FC = () => {
  const [Image, setImage] = useState<string>("");

  useEffect(() => {
    setImage("https://picsum.photos/400/300?random=1");
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Random Image</h2>
      {Image ? <img src={Image} alt="Image" className="mt-2 w-64 h-64" /> : <p>Loading...</p>}
    </div>
  );
};

export default Image;