import { useEffect, useState } from "react";
import { fetchHomeData } from "../utils/spotifyAPI";

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function init() {
      try {
        // Capture ?loggedIn=token from the URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get("loggedIn");

        if (token) {
          localStorage.setItem("token", token);

          // Clean up URL
          window.history.replaceState({}, document.title, "/");
        }

        // Now safely get token from localStorage
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          console.warn("No token found, redirecting to login...");
          window.location.href = "http://localhost:3002/auth/login";
          return;
        }

        // Fetch data
        const data = await fetchHomeData();
        setHomeData(data);
      } catch (err) {
        console.error("Error loading homepage:", err);
        setError("Failed to load homepage data");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  if (loading) return <p>Loading your Spotify data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="homepage">
      <h1>🎧 Welcome back!</h1>

      <section>
        <h2>🔥 Trending in the U.S.</h2>
        <ul>
          {homeData.trending?.map((track) => (
            <li key={track.track.id}>
              {track.track.name} — {track.track.artists[0].name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>💿 New Releases</h2>
        <ul>
          {homeData.newAlbums?.map((album) => (
            <li key={album.id}>
              {album.name} — {album.artists[0].name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>🎶 Your Playlists</h2>
        <ul>
          {homeData.userPlaylists?.playlists?.map((pl) => (
            <li key={pl.id}>{pl.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
