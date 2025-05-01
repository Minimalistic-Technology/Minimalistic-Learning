"use client"; // Required for Next.js 13+ (if using React, remove this line)

import React, { useEffect, useState } from "react";
import axios from "axios";

const Page: React.FC = () => {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10");
        setPokemon(response.data.results); // API returns { results: [...] }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <p className="text-blue-500">Loading Pokémon...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Pokémon List</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemon.map((poke, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold capitalize">{poke.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
