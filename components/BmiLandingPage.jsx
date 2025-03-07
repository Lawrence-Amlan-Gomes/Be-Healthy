"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { set } from "mongoose";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import { useEffect, useState } from "react";

export default function BmiLandingPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { auth } = useAuth();
  const [changeAble, setChangeAble] = useState(true);
  const [bmi, setBmi] = useState(0);
  const [bmiStatus, setBmiStatus] = useState("");
  const [height, setHeight] = useState({
    value1: "",
    value2: "",
    isError: true,
    error: "Height is required",
    type: "",
  });
  const [weight, setWeight] = useState({
    value: "",
    isError: true,
    error: "Weight is required",
    type: "",
  });
  const [gender, setGender] = useState({
    value: "",
    isError: true,
    error: "Gender is required",
  });
  const [age, setAge] = useState({
    value: "",
    isError: true,
    error: "Age is required",
  });
  const [noError, setNoError] = useState(false);

  useEffect(() => {
    if (!auth) {
      router.push("/login"); // Redirects to login if not authenticated
    }
  }, [auth, router]);

  useEffect(() => {
    const statusUpdateBmi = () => {
      let statusMessage = "";

      if (bmi < 16) {
        statusMessage =
          "You are Severely Underweight. You have to increase calorie intake with nutrient-dense foods and consult a doctor for underlying issues.";
      } else if (bmi >= 16 && bmi < 18.5) {
        statusMessage =
          "You are Underweight. You have to add more healthy fats & proteins, do strength training, and maintain balanced meals.";
      } else if (bmi >= 18.5 && bmi < 25) {
        statusMessage =
          "You are at a Normal (Healthy Weight). You have to maintain your current diet and exercise routine for a balanced lifestyle.";
      } else if (bmi >= 25 && bmi < 30) {
        statusMessage =
          "You are Overweight. You have to increase physical activity, focus on portion control, and eat balanced meals.";
      } else if (bmi >= 30 && bmi < 35) {
        statusMessage =
          "You are in Obese (Class 1 - Moderate). You have to adopt a structured diet plan, exercise regularly, and consider medical guidance.";
      } else if (bmi >= 35 && bmi < 40) {
        statusMessage =
          "You are in Obese (Class 2 - Severe). You have to work with a nutritionist or doctor, increase exercise, and monitor health conditions.";
      } else {
        statusMessage =
          "You are Morbidly Obese (Class 3). You have to seek medical consultation, consider major lifestyle changes, and possible medical interventions.";
      }

      setBmiStatus(statusMessage);
    };
    statusUpdateBmi();
  }, [bmi]);

  useEffect(() => {
    let trimmedValue = age.value.trim();
    if (age.value === "") {
      setAge((prev) => ({ ...prev, isError: true, error: "Age is required" }));
    } else if (!/^\d+$/.test(trimmedValue)) {
      setAge((prev) => ({
        ...prev,
        isError: true,
        error: "Your age must be in number",
      }));
    } else {
      setAge((prev) => ({ ...prev, isError: false, error: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age.value]);

  useEffect(() => {
    let trimmedValue1 = String(height.value1 || "").trim();
    let trimmedValue2 = String(height.value2 || "").trim();
    if (height.type == "feet") {
      if (height.value1 == "" || height.value2 == "") {
        setHeight((prev) => ({
          ...prev,
          isError: true,
          error: "Height is required",
        }));
      } else if (height.value1 != "" && height.value2 != "") {
        if (!/^\d+$/.test(trimmedValue1) || !/^\d+$/.test(trimmedValue2)) {
          setHeight((prev) => ({
            ...prev,
            isError: true,
            error: "Your height must be in number",
          }));
        } else {
          setHeight((prev) => ({ ...prev, isError: false, error: "" }));
        }
      } else {
        setHeight((prev) => ({ ...prev, isError: false, error: "" }));
      }
    } else if (height.type == "cm") {
      if (height.value1 == "") {
        setHeight((prev) => ({
          ...prev,
          isError: true,
          error: "Height is required",
        }));
      } else if (height.value1) {
        if (!/^\d+$/.test(trimmedValue1)) {
          setHeight((prev) => ({
            ...prev,
            isError: true,
            error: "Your height must be in number",
          }));
        } else {
          setHeight((prev) => ({ ...prev, isError: false, error: "" }));
        }
      } else {
        setHeight((prev) => ({ ...prev, isError: false, error: "" }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height.value1, height.value2, height.type]);

  useEffect(() => {
    let trimmedValue = weight.value.trim();
    if (weight.value === "") {
      setWeight((prev) => ({
        ...prev,
        isError: true,
        error: "Weight is required",
      }));
    } else if (!/^\d+$/.test(trimmedValue)) {
      setWeight((prev) => ({
        ...prev,
        isError: true,
        error: "Your Weight must be in number",
      }));
    } else {
      setWeight((prev) => ({ ...prev, isError: false, error: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weight.value]);

  useEffect(() => {
    if (!age.isError && !height.isError && !weight.isError && !gender.isError) {
      setNoError(true);
    } else {
      setNoError(false);
    }
  }, [age.isError, gender.isError, height.isError, weight.isError]);

  const calculateBmi = () => {
    if (noError) {
      let heightInMeters = 0;
      let weightInKg = 0;
      let genderFactor = gender.value == "Male" ? 0.1 : -0.1; // Corrected G: +5 for males, -5 for females
      // Convert height to meters
      if (height.type === "feet") {
        heightInMeters =
          parseFloat(height.value1) * 0.3048 +
          parseFloat(height.value2) * 0.0254;
      } else if (height.type === "cm") {
        heightInMeters = parseFloat(height.value1) / 100;
      }

      // Convert weight to kilograms
      if (weight.type === "lbs") {
        weightInKg = parseFloat(weight.value) * 0.453592; // Convert pounds to kg
      } else {
        weightInKg = parseFloat(weight.value);
      }
      // Apply the new BMI formula
      let bmiValue = weightInKg / Math.pow(heightInMeters, 2);
      bmiValue += 0.01 * parseFloat(age.value) + genderFactor;

      // Set the calculated BMI
      setBmi(bmiValue.toFixed(2));
      setChangeAble(false);
    }
  };

  return (
    <div
      className={`w-full h-full overflow-y-auto scrollbar ${
        theme
          ? "bg-[#ffffff] text-[#0a0a0a] scrollbar-track-[#eeeeee] scrollbar-thumb-[#333333]"
          : "bg-[#000000] text-[#ebebeb] scrollbar-track-[#222222] scrollbar-thumb-[#eeeeee]"
      }`}
    >
      <div
        className={`w-full h-[20%] font-bold float-left text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[50px] flex justify-center items-center`}
      >
        BMI Calculator
      </div>

      <div className={`w-full px-10 pb-10 flex flex-col gap-10`}>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {/* Age */}
          <div
            className={`p-5 rounded-lg flex flex-col justify-center items-center ${
              theme
                ? "bg-[#ececec] text-[#0a0a0a]"
                : "bg-[#0f0f0f] text-[#f0f0f0]"
            }`}
          >
            <div className="w-full lg:text-[20px] float-left flex justify-center items-center p-3">
              Age ( Years )
            </div>
            <div className="w-full float-left flex justify-center items-center p-3">
              <input
                value={age.value}
                onChange={(e) => {
                  if (changeAble) {
                    setAge({
                      value: e.target.value,
                      isError: false,
                      error: "",
                    });
                  }
                }}
                placeholder="Enter your age"
                className={`p-3 border-[2px] sm:text-[16px] xl:text-[18px] box-border w-full rounded-md focus:outline-none focus:outline-[1px] focus:shadow-none bg-transparent placeholder:text-zinc-400 ${
                  !age.isError
                    ? changeAble
                      ? "border-green-700 text-green-600 focus:outline-green-600"
                      : "border-green-700 text-green-600 focus:outline-none caret-transparent"
                    : "border-red-600 text-red-600 focus:outline-red-600"
                }`}
              />
            </div>
            {age.isError ? (
              <div className="w-full text-red-600 text-[16px] text-center float-left flex justify-center items-center p-2">
                {age.error}
              </div>
            ) : null}
          </div>
          {/* Height */}
          <div
            className={`p-5 rounded-lg flex flex-col justify-center items-center ${
              theme
                ? "bg-[#ececec] text-[#0a0a0a]"
                : "bg-[#0f0f0f] text-[#f0f0f0]"
            }`}
          >
            <div className="w-full lg:text-[20px] float-left flex justify-center items-center p-3">
              Height
            </div>
            <div className="w-full float-left flex justify-center items-center p-2">
              <div
                onClick={() => {
                  if (changeAble) {
                    setHeight((prev) => ({
                      ...prev,
                      type: "feet",
                      value1: "",
                      value2: "",
                    }));
                  }
                }}
                className={`border-[2px] hover:cursor-pointer rounded-full h-[20px] w-[20px] p-[3px] ${
                  height.type == "feet"
                    ? "border-green-600"
                    : height.type == "cm"
                    ? "border-[#888888]"
                    : "border-red-600"
                }`}
              >
                <div
                  className={`h-full w-full rounded-full ${
                    height.type == "feet" ? "bg-green-600" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <div className="ml-3">feet</div>
            </div>
            <div className="w-full float-left flex justify-center items-center p-2">
              <div
                onClick={() => {
                  if (changeAble) {
                    setHeight((prev) => ({
                      ...prev,
                      type: "cm",
                      value1: "",
                      value2: 0,
                    }));
                  }
                }}
                className={`border-[2px] hover:cursor-pointer rounded-full h-[20px] w-[20px] p-[3px] ${
                  height.type == "cm"
                    ? "border-green-600"
                    : height.type == "feet"
                    ? "border-[#888888]"
                    : "border-red-600"
                }`}
              >
                <div
                  className={`h-full w-full rounded-full ${
                    height.type == "cm" ? "bg-green-600" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <div className="ml-3">cm</div>
            </div>
            {height.type == "feet" ? (
              <div className="w-full float-left flex justify-center items-center gap-3 p-3">
                <input
                  value={height.value1}
                  onChange={(e) => {
                    if (changeAble) {
                      setHeight((prev) => ({
                        ...prev,
                        value1: e.target.value,
                      }));
                    }
                  }}
                  placeholder="feet"
                  className={`p-3 border-[2px] sm:text-[16px] xl:text-[18px] box-border w-full rounded-md focus:outline-none focus:outline-[1px] focus:shadow-none bg-transparent placeholder:text-zinc-400 ${
                    !height.isError
                      ? changeAble
                        ? "border-green-700 text-green-600 focus:outline-green-600"
                        : "border-green-700 text-green-600 focus:outline-none caret-transparent"
                      : "border-red-600 text-red-600 focus:outline-red-600"
                  }`}
                />
                <input
                  value={height.value2}
                  onChange={(e) => {
                    if (changeAble) {
                      setHeight((prev) => ({
                        ...prev,
                        value2: e.target.value,
                      }));
                    }
                  }}
                  placeholder="inch"
                  className={`p-3 border-[2px] sm:text-[16px] xl:text-[18px] box-border w-full rounded-md focus:outline-none focus:outline-[1px] focus:shadow-none bg-transparent placeholder:text-zinc-400 ${
                    !height.isError
                      ? changeAble
                        ? "border-green-700 text-green-600 focus:outline-green-600"
                        : "border-green-700 text-green-600 focus:outline-none caret-transparent"
                      : "border-red-600 text-red-600 focus:outline-red-600"
                  }`}
                />
              </div>
            ) : (
              <></>
            )}
            {height.type == "cm" ? (
              <div className="w-full float-left flex justify-center items-center p-3">
                <input
                  value={height.value1}
                  onChange={(e) => {
                    if (changeAble) {
                      setHeight((prev) => ({
                        ...prev,
                        value1: e.target.value,
                      }));
                    }
                  }}
                  placeholder="centi-meter"
                  className={`p-3 border-[2px] sm:text-[16px] xl:text-[18px] box-border w-full rounded-md focus:outline-none focus:outline-[1px] focus:shadow-none bg-transparent placeholder:text-zinc-400 ${
                    !height.isError
                      ? changeAble
                        ? "border-green-700 text-green-600 focus:outline-green-600"
                        : "border-green-700 text-green-600 focus:outline-none caret-transparent"
                      : "border-red-600 text-red-600 focus:outline-red-600"
                  }`}
                />
              </div>
            ) : (
              <></>
            )}
            {height.isError ? (
              <div className="w-full text-red-600 text-center float-left flex justify-center items-center p-2">
                {height.error}
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* Weight */}
          <div
            className={`p-5 rounded-lg flex flex-col justify-center items-center ${
              theme
                ? "bg-[#ececec] text-[#0a0a0a]"
                : "bg-[#0f0f0f] text-[#f0f0f0]"
            }`}
          >
            <div className="w-full lg:text-[20px] float-left flex justify-center items-center p-3">
              Weight
            </div>
            <div className="w-full float-left flex justify-center items-center p-2">
              <div
                onClick={() => {
                  if (changeAble) {
                    setWeight((prev) => ({
                      ...prev,
                      type: "kg",
                      value: "",
                    }));
                  }
                }}
                className={`border-[2px] hover:cursor-pointer rounded-full h-[20px] w-[20px] p-[3px] ${
                  weight.type == "kg"
                    ? "border-green-600"
                    : weight.type == "lbs"
                    ? "border-[#888888]"
                    : "border-red-600"
                }`}
              >
                <div
                  className={`h-full w-full rounded-full ${
                    weight.type == "kg" ? "bg-green-600" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <div className="ml-3">kg</div>
            </div>
            <div className="w-full float-left flex justify-center items-center p-2">
              <div
                onClick={() => {
                  if (changeAble) {
                    setWeight((prev) => ({
                      ...prev,
                      type: "lbs",
                      value: "",
                    }));
                  }
                }}
                className={`border-[2px] hover:cursor-pointer rounded-full h-[20px] w-[20px] p-[3px] ${
                  weight.type == "lbs"
                    ? "border-green-600"
                    : weight.type == "kg"
                    ? "border-[#888888]"
                    : "border-red-600"
                }`}
              >
                <div
                  className={`h-full w-full rounded-full ${
                    weight.type == "lbs" ? "bg-green-600" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <div className="ml-3">lbs</div>
            </div>
            {weight.type == "" ? (
              <></>
            ) : (
              <div className="w-full float-left flex justify-center items-center gap-3 p-3">
                <input
                  value={weight.value}
                  onChange={(e) => {
                    if (changeAble) {
                      setWeight((prev) => ({ ...prev, value: e.target.value }));
                    }
                  }}
                  placeholder={`${weight.type == "kg" ? "kg" : "lbs"}`}
                  className={`p-3 border-[2px] sm:text-[16px] xl:text-[18px] box-border w-full rounded-md focus:outline-none focus:outline-[1px] focus:shadow-none bg-transparent placeholder:text-zinc-400 ${
                    !weight.isError
                      ? changeAble
                        ? "border-green-700 text-green-600 focus:outline-green-600"
                        : "border-green-700 text-green-600 focus:outline-none caret-transparent"
                      : "border-red-600 text-red-600 focus:outline-red-600"
                  }`}
                />
              </div>
            )}

            {weight.isError ? (
              <div className="w-full text-red-600 text-center float-left flex justify-center items-center p-2">
                {weight.error}
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* Gender */}
          <div
            className={`p-5 rounded-lg flex flex-col justify-center items-center ${
              theme
                ? "bg-[#ececec] text-[#0a0a0a]"
                : "bg-[#0f0f0f] text-[#f0f0f0]"
            }`}
          >
            <div className="w-full lg:text-[20px] float-left flex justify-center items-center p-3">
              Gender
            </div>
            <div className="w-full float-left flex justify-center items-center p-2">
              <div
                onClick={() => {
                  if (changeAble) {
                    setGender({ value: "Male", isError: false, error: "" });
                  }
                }}
                className={`border-[2px] hover:cursor-pointer rounded-full h-[20px] w-[20px] p-[3px] ${
                  gender.value == "Male"
                    ? "border-green-600"
                    : gender.value == "Female"
                    ? "border-[#888888]"
                    : "border-red-600"
                }`}
              >
                <div
                  className={`h-full w-full rounded-full ${
                    gender.value == "Male" ? "bg-green-600" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <div className="ml-3">Male</div>
            </div>
            <div className="w-full float-left flex justify-center items-center p-2">
              <div
                onClick={() => {
                  if (changeAble) {
                    setGender({ value: "Female", isError: false, error: "" });
                  }
                }}
                className={`border-[2px] hover:cursor-pointer rounded-full h-[20px] w-[20px] p-[3px] ${
                  gender.value == "Female"
                    ? "border-green-600"
                    : gender.value == "Male"
                    ? "border-[#888888]"
                    : "border-red-600"
                }`}
              >
                <div
                  className={`h-full w-full rounded-full ${
                    gender.value == "Female" ? "bg-green-600" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <div className="ml-3">Female</div>
            </div>
            {gender.isError ? (
              <div className="w-full text-red-600 text-center float-left flex justify-center items-center p-2">
                {gender.error}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* Calculate Button */}
        <div className="w-full flex justify-center items-center">
          {changeAble ? (
            <div
              onClick={() => {
                calculateBmi();
              }}
              className={`text-[18px] rounded-lg p-3 cursor-pointer ${
                noError
                  ? "bg-green-800 hover:bg-green-700 text-white"
                  : theme
                  ? "bg-[#dbdbdb] text-[#808080]"
                  : "bg-[#1a1a1a] text-[#696969]"
              }`}
            >
              Calculate Your BMI
            </div>
          ) : (
            <div className="w-full h-full grid grid-cols-2 md:grid-cols-5 gap-5">
            {/* First Box */}
            <div
              className={`rounded-lg col-span-2 md:col-span-1 overflow-hidden flex flex-col justify-center items-center p-7 ${
                theme ? "bg-[#ececec] text-[#0a0a0a]" : "bg-[#0f0f0f] text-[#f0f0f0]"
              }`}
            >
              <div className="w-full">
                <div className="mb-3 w-full flex justify-center items-center text-center">
                  Your BMI is {bmi}
                </div>
                <div className="w-full flex justify-center items-center">
                  <div
                    onClick={() => setChangeAble((prev) => !prev)}
                    className="bg-blue-600 hover:bg-blue-700 w-[120px] text-white rounded-lg p-3 flex justify-center items-center cursor-pointer"
                  >
                    Recalculate
                  </div>
                </div>
              </div>
            </div>
          
            {/* Second Box (Auto Heights) */}
            <div
              className={`rounded-lg col-span-2 overflow-hidden p-7 flex justify-center items-center text-center ${
                theme ? "bg-[#ececec] text-[#0a0a0a]" : "bg-[#0f0f0f] text-[#f0f0f0]"
              }`}
            >
              {bmiStatus}
            </div>
          
            {/* Third Box */}
            <div
              className={`rounded-lg md:col-span-2 overflow-hidden flex flex-col justify-center items-center p-7 ${
                theme ? "bg-[#ececec] text-[#0a0a0a]" : "bg-[#0f0f0f] text-[#f0f0f0]"
              }`}
            >
              <div className="w-full">
                <div className="mb-3 w-full flex justify-center items-center text-center">
                  More Information and suggestions about your BMI and health
                </div>
                <div className="w-full flex justify-center items-center">
                  <div
                    className="bg-blue-600 hover:bg-blue-700 w-[120px] text-white rounded-lg p-3 flex justify-center items-center cursor-pointer"
                  >
                    Khow More
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
}
