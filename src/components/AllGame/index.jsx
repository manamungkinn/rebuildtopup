import React from "react";
import { data } from "@/data/data"; // Import data dari file eksternal
import Image from "next/image";
import Link from "next/link";

const AllGame = () => {
  return (
    <div className="p-4">
      {/* Grid Responsif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div key={index} className="w-full">
            {/* Card Wrapper */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Bagian Gambar */}
              <div className="relative w-full h-40 md:h-48">
                <Image
                  src={item.image} // Pastikan gambar tersedia di data Anda
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              {/* Bagian Konten */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.company}</p>
              </div>

              {/* Tombol */}
              <div className="flex justify-center pb-4">
                <Link href={`/games/${item.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition">
                  Top Up
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGame;
