import Link from "next/link";
import { TiArrowMinimise, TiArrowMaximise } from "react-icons/ti";
import { IoMenuSharp } from "react-icons/io5";

import React from "react";

const Logo = ({ open, setOpen }) => {
  return (
    <div className="fixed bg-main-secondary top-0 shadow-lg container min-[1300px]:max-w-screen-2xl">
      <div className="px-6 items-end flex">
        {/* <button
        className=""
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
            <IoMenuSharp size={45} className={`bg-slate-100  my-1 rounded p-2 text-3xl border duration-300 hover:bg-slate-200 cursor-pointer`} />

        </button> */}
        <Link href="/" className="ml-20 py-[22px] text-2xl font-bold text-main-primary">
          TopUp
        </Link>
      </div>
    </div>
  );
};

export default Logo;
