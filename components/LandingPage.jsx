"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { motion } from "framer-motion";
import Image from "next/image";
import features from "@/app/features/features";
import EachFeatureName from "./EachFeatureName";
import landingPageLight from "/public/landingPagePicLight.png";
import landingPageDark from "/public/landingPagePicDark.png";

export default function LandingPage() {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full h-full ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, type: "just" }}
        className="h-full w-[25%] float-left pl-10 py-10 pr-5 flex justify-center items-center overflow-hidden"
      >
        <div className="w-full max-h-full overflow-y-auto overflow-x-hidden scrollbar-none">
          {features.map((feature) => (
            <EachFeatureName key={feature.id} feature={feature} />
          ))}
        </div>
      </motion.div>
      <div className="h-full w-[50%] float-left flex justify-center items-center p-5">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "just" }}
            className={`font-bold mb-10 text-center text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[50px] ${
              theme ? "text-black" : "text-white"
            }`}
          >
            Your Path to a Healthier Life Starts Here
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: +50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "just" }}
            className={`text-justify text-[13px] sm:text-[16px] md:text-[17px] lg:text-[20px] xl:text-[25px] 2xl:text-[35px] ${
              theme ? "text-[#111111]" : "text-[#eeeeee]"
            }`}
          >
            Stay Fit, Eat Right, and Live Better with Smart Health Insights –
            Personalized Wellness Tips, Balanced Nutrition, and Fitness Tracking
            for a Healthier You!
          </motion.div>
        </div>
      </div>
      <div className="h-full w-[25%] float-left p-10">
        {" "}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "just" }}
          className="float-left h-full w-full relative rounded-xl overflow-hidden"
        >
          <div className="relative h-full w-full">
            <Image
              priority
              src={theme ? landingPageLight : landingPageDark}
              alt="Landing Page"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
