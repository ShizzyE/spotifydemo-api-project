import axios from "axios";

const BASE_URL = "http://localhost:3002"; // your backend

// Fetch home data from backend
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