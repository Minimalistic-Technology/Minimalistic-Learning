"use client"; // Required for Next.js 13+ (remove for React projects)

import React, { useEffect, useState } from "react";
import axios from "axios";

const Page: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p className="text-blue-500">Loading countries...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Country List 🌍</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.slice(0, 20).map((country, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-24 h-16 object-cover mb-2 rounded-md"
            />
            <h2 className="text-lg font-semibold">{country.name.common}</h2>
            <p className="text-gray-600">🌍 Region: {country.region}</p>
            <p className="text-gray-600">👥 Population: {country.population.toLocaleString()}</p>
            <p className="text-gray-600">🏛 Capital: {country.capital?.[0] || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
