"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const home = "/";
  const service = "/service";
  const about = "/about";
  const karyawan = "/karyawan";
  const contact = "/contact";
  const [menu, setMenu] = useState(true);
  const [isBlurred, setIsBlurred] = useState(false);
  const navMobile = useRef();
  const [dropDown, setDropDown] = useState(false);

  const handleClickOutside = (event) => {
    // Periksa apakah klik terjadi di luar elemen yang dirujuk oleh ref
    if (navMobile.current && !navMobile.current.contains(event.target)) {
      console.log("tess");
      setMenu(true);
      setDropDown(false);
    }
  };

  useEffect(() => {
    // Tambahkan event listener pada document
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("wheel", handleClickOutside);

    return () => {
      // Bersihkan event listener saat komponen dilepas
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("wheel", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("navbar"); // Ganti dengan ID elemen Anda
      if (element) {
        const { top } = element.getBoundingClientRect();
        const apa = top.top;
        if (top <= 0) {
          setIsBlurred(true);
          console.log("blooeee");
        } else {
          setIsBlurred(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const IsiLi = () => {
    return (
      <ul className="grid grid-cols-1 gap-2 text-sm px-2 md:gap-0 md:text-base md:px-0 md:grid-cols-5 md:h-fit ">
        <li
          className={`relative transition-all duration-300 ease-in-out ${
            pathname === home ? "bg-main-primary " : "hover:bg-main-accent  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-main-primary hover:after:w-full after:transition-all after:duration-300"
          }`}
        >
          <a href={home} className="px-5 text-ml text-textColor-primary font-semibold block py-2 md:py-3">
            Home
          </a>
        </li>
        <li
          className={`relative transition-all duration-300 ease-in-out ${
            pathname === about ? "bg-main-primary" : "hover:bg-main-accent  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-main-primary hover:after:w-full after:transition-all after:duration-300"
          }`}
        >
          <a href={about} className="px-5 text-ml text-textColor-primary font-semibold block py-2 md:py-3">
            About
          </a>
        </li>
        <li
          className={`relative transition-all duration-300 ease-in-out ${
            pathname === contact ? "bg-main-primary" : "hover:bg-main-accent  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-main-primary hover:after:w-full after:transition-all after:duration-300"
          }`}
        >
          <a href={contact} className="px-5 text-ml text-textColor-primary font-semibold block py-2 md:py-3">
            Contact
          </a>
        </li>
        <li
          className={`relative transition-all duration-300 ease-in-out ${
            pathname === karyawan ? "bg-main-primary" : "hover:bg-main-accent  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-main-primary hover:after:w-full after:transition-all after:duration-300"
          }`}
        >
          <a href={karyawan} className="px-5 text-ml text-textColor-primary font-semibold block py-2 md:py-3">
            Karyawan
          </a>
        </li>
        <li
          className={`relative transition-all duration-300 ease-in-out ${
            pathname === service ? "bg-main-primary" : "hover:bg-main-accent  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-main-primary hover:after:w-full after:transition-all after:duration-300"
          }`}
        >
          <a href={service} className="px-5 text-ml text-textColor-primary font-semibold block py-2 md:py-3">
            Service
          </a>
        </li>

      </ul>
    );
  };

  const NavbarMobile = () => {
    return (
      <div className="relative">
        <button className={`btn bg-gray-200 m-1 border ${isBlurred ? `border-slate-200` : ``} `} onClick={() => setMenu((prev) => !prev)}>
          {menu ? <RxHamburgerMenu /> : <MdOutlineClose />}
        </button>

        {/* Dropdown Menu */}
        {!menu && (
          <nav ref={navMobile} className="absolute z-50 dropdown-content w-52 bg-opacity-95 backdrop-blur-sm border bg-slate-300 mx-2 rounded p-2">
            <IsiLi />
          </nav>
        )}
      </div>
    );
  };

  const Navbar = () => {
    return (
      <nav>
        <div className={`flex  px-3 items-center bg-white ${isBlurred ? `shadow bg-opacity-40 backdrop-blur-sm` : ``}`}>
          <IsiLi />
        </div>
      </nav>
    );
  };

  return (
    <header id="navbar" className={`w-full container min-[1300px]:max-w-screen-2xl`}>
      <hr className="border-main-primary border-[3px]" />
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden">
        <NavbarMobile />
      </div>
    </header>
  );
};

export default Navbar;
