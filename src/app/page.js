"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import Link from "next/link";
import MainComponents from "@/components/MainComponents";
import { FaHome } from "react-icons/fa";

export default function Home() {
  useEffect(() => {
    // render midtrans snap token
    const script = document.createElement("script");
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_CLIENT);
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const [open, setOpen] = useState(false);
  const divKosong = useRef();
  const aside = useRef();

  useEffect(() => {
    const preventScroll = (event) => {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };

    const div = divKosong.current;

    if (div) {
      div.addEventListener("wheel", preventScroll, { passive: false });
      div.addEventListener("touchmove", preventScroll, { passive: false });
    }

    return () => {
      if (div) {
        div.removeEventListener("wheel", preventScroll);
        div.removeEventListener("touchmove", preventScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aside.current && !aside.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="container">
      {/*  min-[1300px]:max-w-screen-2xl */}
      <nav className="fixed container z-[1]">
        <div className="ml-20  shadow-lg bg-green-700 bg-opacity-70 backdrop-blur-sm top-0 ">
          <div className="px-6 items-end flex">
            <Link href="/" className="py-[22px] text-2xl font-bold text-main-secondary">
              TopUp
            </Link>
          </div>
        </div>
      </nav>
      <aside ref={aside} className={`fixed top-0 z-10 ${open ? ` backdrop-blur-md` : ``}`}>
        <div className={`duration-300 relative bg-green-700 bg-opacity-70 h-svh py-[14px] px-[19px] ${open ? ` w-72` : `w-20`}`}>
          <div className="flex gap-10">
            <button
              className=""
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              <IoMenuSharp size={45} className={`bg-green-700  my-1 rounded p-2 text-3xl border duration-300 hover:bg-main-dark cursor-pointer`} />
            </button>
            <Link href="/" className={`duration-[8ms] ease-in py-[8px] text-2xl font-bold text-main-secondary ${open ? `scale-100 ` : `scale-0`}`}>
              TopUp
            </Link>
          </div>

          {/* Menu side */}
          <>
            <Link href={"/"} className="flex items-center justify-start m-4">
              <div className={`duration-300 origin-left font-medium ${!open ? `scale-0` : ``}`}>
                <FaHome size={25} />
              </div>
              <div className={`ml-2 duration-300 origin-left font-medium ${!open ? `scale-0` : ``}`}>Home</div>
            </Link>
          </>
        </div>
      </aside>

      {/* Div Kosong */}
      <div ref={divKosong} className={`${open ? `block` : `hidden`} z-[1] bg-white ml-72 w-full h-svh fixed bg-opacity-[0.02]`}></div>
      {/*  ${open? ` ml-72`:`ml-20`} */}

      {/* Main */}
      <div className={`p-2 duration-300 ml-20`}>
        <div className="text-blue-700  mt-[76px]">
          <MainComponents />
        </div>
      </div>
    </header>
  );
}
