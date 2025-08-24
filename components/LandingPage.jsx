"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { motion } from "framer-motion";
import Image from "next/image";
import features from "@/app/features/features";
import EachFeatureName from "./EachFeatureName";
import { useAuth } from "@/app/hooks/useAuth";

export default function LandingPage() {
  const {auth} = useAuth();
  const { theme } = useTheme();

  return (
    <div
      className={`w-full h-full ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <div className="w-full h-full hidden sm:grid grid-cols-12 grid-rows-12 gap-5 p-5 md:p-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "just" }}
          className="col-span-2 row-span-3 md:col-span-3 md:row-span-12 pl-5 py-10 pr-5 flex justify-center items-center overflow-hidden"
        >
          <div className=" w-full max-h-full overflow-y-auto overflow-x-hidden scrollbar-none">
            {features.map((feature) => (
              <EachFeatureName key={feature.id} feature={feature} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "just" }}
          className={` md:col-span-9 md:row-span-5 p-10 flex justify-center items-center font-bold text-center text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[50px] ${
            theme ? "text-black" : "text-white"
          }`}
        >
          Your Path to a Healthier Life Starts Here
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: +50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "just" }}
          className={` md:col-span-6 md:row-span-7 p-10 flex justify-center items-center text-justify text-[13px] sm:text-[16px] md:text-[17px] lg:text-[20px] xl:text-[25px] 2xl:text-[35px] ${
            theme ? "text-[#111111]" : "text-[#eeeeee]"
          }`}
        >
          Stay Fit, Eat Right, and Live Better with Smart Health Insights –
          Personalized Wellness Tips, Balanced Nutrition, and Fitness Tracking
          for a Healthier You!
        </motion.div>

        <div className="md:col-span-3 md:row-span-7 p-2">
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
                src={
                  theme ? "/landingPagePicLight.png" : "/landingPagePicDark.png"
                }
                alt="Landing Page"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="w-full h-full sm:hidden grid grid-cols-12 grid-rows-12 gap-5 p-5 md:p-10">
        
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "just" }}
          className={`col-span-12 row-span-4 p-10 flex justify-center items-center font-bold text-center text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[50px] ${
            theme ? "text-black" : "text-white"
          }`}
        >
          Your Path to a Healthier Life Starts Here
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "just" }}
          className="col-span-5 row-span-5 md:col-span-3 md:row-span-12  pl-10 flex justify-center items-center overflow-hidden"
        >
          <div className=" w-full max-h-full overflow-y-auto overflow-x-hidden scrollbar-none">
            {features.map((feature) => (
              <EachFeatureName key={feature.id} feature={feature} />
            ))}
          </div>
        </motion.div>

        <div className="col-span-7 row-span-5  p-2">
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
                src={
                  theme ? "/landingPagePicLight.png" : "/landingPagePicDark.png"
                }
                alt="Landing Page"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: +50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "just" }}
          className={` row-span-3 col-span-12 p-10 flex justify-center items-center text-justify text-[13px] sm:text-[16px] md:text-[17px] lg:text-[20px] xl:text-[25px] 2xl:text-[35px] ${
            theme ? "text-[#111111]" : "text-[#eeeeee]"
          }`}
        >
          Stay Fit, Eat Right, and Live Better with Smart Health Insights –
          Personalized Wellness Tips, Balanced Nutrition, and Fitness Tracking
          for a Healthier You!
        </motion.div>
      </div>
    </div>
  );
}
