"use client"; //("made by sandip")

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

const ElectronicsStore: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/category/electronics") // Fetching only electronics
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔌 Electronics Store</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition">
            <img src={product.image} alt={product.title} className="h-40 w-full object-contain mb-2" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-blue-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsStore;