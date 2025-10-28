import React from "react";
import axios from "axios";
import { useState } from "react";
import { logout } from "../utils/logout";


export default function Search() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get("http://localhost:3002/search", {
        params: {
          spotifyId: "",
          query: query,
          type: "track",
        },
      });
      setResults(res.data.track.items || []);
    } catch (error) {
      console.error(error.response?.data || err.message);
    }
  };
  return (
    <div>
        <h1>Search Page</h1>
        <button onClick={logout}>Logout</button>
    </div>
  );

}
