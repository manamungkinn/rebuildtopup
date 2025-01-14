"use client";
import React, { useState } from "react";
import { data } from "@/data/data";
import Image from "next/image";

const TopUpGame = ({ id }) => {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    id: "",
    amount: "",
  });

  // Cari game berdasarkan id
  const selectedGame = data.find((game) => game.id === parseInt(id));

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Top-Up:", formData);
    const message = `https://api.whatsapp.com/send?phone=6282260547315&text=Bang Saya Mau Top Up ${selectedGame.name} Id Saya : *${formData.id}*, Saya Mau Ingisi : *${formData.amount}*`;
    window.open(message);
    // Lakukan sesuatu, seperti mengirim data ke backend
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        {/* Header dengan informasi game */}
        {selectedGame && (
          <div className="text-center mb-6">
            <Image src={selectedGame.image || "https://placehold.co/600x500"} alt={selectedGame.name} width={320} height={320} className="rounded-full mx-auto" />
            <h2 className="text-2xl font-bold mt-4">{selectedGame.name}</h2>
            <p className="text-gray-600">{selectedGame.company}</p>
          </div>
        )}

        {/* Form untuk Top-Up */}
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">Top Up {selectedGame ? `for ${selectedGame.name}` : ""}</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              ID/Nickname
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Masukkan ID atau Nickname"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Jumlah Top-Up
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Masukkan jumlah top-up"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition">
              Top Up Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopUpGame;
