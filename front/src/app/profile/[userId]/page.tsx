"use client"

import ProfileAvatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function Tabs() {
  return (
    <div className="mt-8">
      <nav className="flex gap-6 text-gray-400 border-b border-gray-700">
        <a href="#" className="border-b-2 border-white pb-2">
          Playlists
        </a>
        <a href="#" className="pb-2">Community</a>
        <a href="#" className="pb-2">Search</a>
      </nav>
    </div>
  )
}

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only runs on the client
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log("Token from localStorage:", storedToken);
  }, []);

  const playlists = [
    {
      id: 1,
      title: "운동",
      videos: 3,
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <ProfileAvatar
            image={token.image || undefined}
            name={token.name as string}
            sx={{ width: 100, height: 100, marginRight: 2, }}
            fontSize={50}
          />
          <div>
            <h1 className="text-3xl font-bold">{token.name}</h1>
            <p className="text-gray-400">{(token.email as string)}</p>
            <p className="mt-2">
              <Button className="mr-2">
                Customize channel
              </Button>
              <Button>
                Manage videos
              </Button>
            </p>
          </div>
        </div>

        <Tabs />

        {/* Playlist Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Created playlists</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
              >
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="w-full h-32 object-cover rounded"
                />
                <h3 className="mt-4 font-semibold">{playlist.title}</h3>
                <p className="text-sm text-gray-400">{playlist.videos} videos</p>
                <a
                  href="#"
                  className="mt-2 inline-block text-blue-400 text-sm"
                >
                  View full playlist
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
  // return (
  //   <>
  //     <div>{params.userId}</div>
  //     <div>{session?.user?.name}</div>
  //   </>
  // )
}