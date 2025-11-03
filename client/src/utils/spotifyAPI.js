import axios from "axios";

const BASE_URL = "http://localhost:3002";

export async function fetchHomeData() {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found — user might not be logged in.");

  const res = await axios.get(`${BASE_URL}/spotify/home`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function searchTracks(query) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found — user might not be logged in.");

  const res = await axios.get(`${BASE_URL}/spotify/search`, {
    params: { query, type: "track" },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.tracks?.items || [];
}
