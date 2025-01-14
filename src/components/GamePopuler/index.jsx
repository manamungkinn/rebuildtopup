import React from "react";
import { populer } from "@/data/data";
import Link from "next/link";
import Image from "next/image";

const GamePopuler = () => {
  return (
    <div className="w-full overflow-x-auto flex scroll-smooth">
      {/* Container Flex untuk Item */}
      <div className="flex gap-4 px-4">
        {populer.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-64">
            {/* Card DaisyUI */}
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

export default GamePopuler;
