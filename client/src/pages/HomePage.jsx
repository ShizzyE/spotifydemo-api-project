import { useEffect, useState } from "react";
import { fetchHomeData } from "../utils/spotifyAPI";
import { logout } from "../utils/logout";
import Header from "../ components/Header";

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
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      {/*🔎 Navigation Bar */}
      <Header />

      {/* ✅ Expand Your Taste */}
      <section className="text-center mt-10 sm:mt-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8">
          Expand Your Taste
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-10 justify-items-center">
          {homeData.trending?.slice(0, 5).map((track) => (
            <a
              key={track.track.id}
              href={track.track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="w-36 sm:w-40 block hover:scale-105 transition-transform duration-200"
            >
              <img
                src={track.track.album.images?.[0]?.url}
                alt={track.track.name}
                className="w-full h-36 sm:h-40 rounded-md object-cover mb-2 sm:mb-3"
              />
              <p className="font-semibold truncate">{track.track.name}</p>
              <p className="text-xs sm:text-sm text-gray-300 truncate">
                {track.track.artists[0].name}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ✅ Latest Releases */}
      <section className="text-center mt-14 px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8">
          Latest Releases
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-10 md:gap-30 lg:gap-50 justify-items-center">
            {homeData.newAlbums?.slice(0, 3).map((album) => (
              <a
                key={album.id}
                href={album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="w-36 sm:w-40 block hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={album.images?.[0]?.url}
                  alt={album.name}
                  className="w-full h-36 sm:h-40 rounded-md object-cover mb-2 sm:mb-3"
                />
                <p className="font-semibold truncate">{album.name}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Trending For You */}
      <section className="text-center mt-14 mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8">
          Trending For You
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-10 justify-items-center">
          {homeData.userPlaylists?.playlists?.slice(0, 4).map((pl) => (
            <a
              key={pl.id}
              href={pl.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="w-36 sm:w-40 block hover:scale-105 transition-transform duration-200"
            >
              <img
                src={pl.images?.[0]?.url}
                alt={pl.name}
                className="w-full h-36 sm:h-40 rounded-md object-cover mb-2 sm:mb-3"
              />
              <p className="font-semibold truncate">{pl.name}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
