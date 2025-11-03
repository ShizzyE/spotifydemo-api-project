import React, { useState } from "react";
import { searchTracks } from "../utils/spotifyAPI";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    try {
      const tracks = await searchTracks(query);
      setResults(tracks);
    } catch (err) {
      console.error(err);
      setError("Could not fetch songs. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search for a Song 🎵</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
          placeholder="Enter song name"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((track) => (
          <a
            key={track.id}
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:scale-105 transition-transform duration-200"
          >
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              className="w-full h-36 rounded-md object-cover mb-2"
            />
            <p className="font-semibold truncate">{track.name}</p>
            <p className="text-sm text-gray-300 truncate">
              {track.artists[0]?.name}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
