"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function EachFeatureName({ feature }) {
  const { theme } = useTheme();
  return (
    <Link href={feature.linkTo}>
      <div
        className={`w-full hover:cursor-pointer h-[50px] sm:h-[80px] md:h-[100px] sm:text-[15px] lg:text-[18px] p-3 mb-5 text-center rounded-lg border-[1px] border-[#888888] ${
          theme
            ? "hover:border-[#000000] text-[#333333]"
            : "hover:border-[#cccccc] text-[#dddddd]"
        }`}
      >
        <div className="h-full lg:w-[30%] w-full float-left overflow-hidden flex justify-end items-center">
          <div className="h-full w-full relative">
            <Image
              src={theme ? feature.imageLight : feature.imageDark}
              alt={feature.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="h-full lg:w-[70%] w-0 pl-1 float-left overflow-hidden flex justify-start items-center">
          {feature.title}
        </div>
      </div>
    </Link>
  );
}
