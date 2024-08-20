"use client";

import { useTheme } from "@/app/hooks/useTheme";

export default function StartingPage({ setIsGetStarted }) {
  const { theme } = useTheme();
  return (
    <div
      className={`h-full w-full flex justify-center items-center ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <div className="w-full">
        <div
          className={`w-full relative break-words pl-10 pr-10 text-[70px] text-center font-bold`}
        >
          Set and achieve your goals with Time Track
        </div>
        <div className="w-full flex justify-center items-center mt-5">
          <button
            className={`text-[18px] py-3 px-10 shadow-lg rounded-full ${
              theme
                ? "bg-[#cfcfcf] hover:bg-[#bebebe] text-black"
                : "bg-[#1f1f1f] hover:bg-[#272727] text-zinc-300"
            }`}
            onClick={() => {
              setIsGetStarted(true);
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
