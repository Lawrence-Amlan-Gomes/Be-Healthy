"use client";

import { useTheme } from "@/app/hooks/useTheme";

export default function TimeDetails({ side, setSide }) {
  const { theme } = useTheme();
  return (
    <div
      className={`h-full w-[20%] float-left ${
        theme ? "bg-[#b1b1b1] text-[#0a0a0a]" : "bg-[#131313] text-[#ebebeb]"
      }`}
    >
      <div className="w-full p-10">
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => setSide((prev) => !prev)}
            className={`text-[18px] py-3 px-6 w-full shadow-lg ${
              theme
                ? "bg-[#bdbdbd] hover:bg-[#c9c9c9] text-black"
                : "bg-[#252525] hover:bg-[#353535] text-zinc-300"
            } ${
              side
                ? "rounded-r-full"
                : "rounded-l-full"
            }`}
          >
            {side ? "Move Right" : "Move Left"}
          </button>
        </div>
      </div>
    </div>
  );
}
