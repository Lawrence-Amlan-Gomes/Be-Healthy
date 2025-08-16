"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashBoard() {
  const { theme } = useTheme();
  const { auth } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  // Helper function to get BMI category
  const getBmiCategory = (bmi) => {
    if (!bmi || bmi === 0) return "Not Set";
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 25) return "Normal";
    if (bmi >= 25 && bmi < 30) return "Overweight";
    return "Obese";
  };

  // Calculate nutrition summary
  const calculateNutritionSummary = () => {
    if (!auth?.nutrition || auth.nutrition.length === 0) return { totalCalories: 0, mealCount: 0 };
    const today = new Date().toISOString().split("T")[0];
    const todayMeals = auth.nutrition.filter((meal) => meal.date === today);
    let totalCalories = 0;
    todayMeals.forEach((meal) => {
      const caloriesMatch = meal.nutritionalInfo.match(/(\d+)\s*kcal/);
      if (caloriesMatch) {
        totalCalories += parseInt(caloriesMatch[1], 10);
      }
    });
    return { totalCalories, mealCount: todayMeals.length };
  };

  const { totalCalories, mealCount } = calculateNutritionSummary();

  return (
    <div
      className={`h-full overflow-auto scrollbar ${
        theme
          ? "bg-gray-100 text-gray-900 scrollbar-track-gray-200 scrollbar-thumb-gray-500"
          : "bg-[#000000] text-[#ebebeb] scrollbar-track-[#222222] scrollbar-thumb-[#eeeeee]"
      }`}
    >
      {/* Header */}
      <div
        className={`w-full py-8 px-4 sm:px-6 md:px-8 lg:px-10 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl flex justify-center items-center ${
          theme ? "bg-white shadow-md" : "bg-[#0f0f0f]"
        }`}
      >
        Wellness Dashboard
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10 flex flex-col gap-8">
        {/* Welcome Message */}
        <div
          className={`w-full p-6 rounded-lg shadow-lg text-center ${
            theme ? "bg-white text-gray-900" : "bg-[#0f0f0f] text-[#ebebeb]"
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-semibold">
            Welcome, {auth?.name || "User"}!
          </h2>
          <p className="mt-2 text-sm sm:text-base">
            Track your wellness journey with tailored goals, workouts, nutrition, and meditation.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* BMI Summary */}
          <div
            className={`p-6 rounded-lg shadow-md flex flex-col items-center ${
              theme ? "bg-white text-gray-900" : "bg-[#0f0f0f] text-[#ebebeb]"
            }`}
          >
            <h3 className="text-lg font-bold">BMI Status</h3>
            <p className="mt-2 text-2xl font-semibold">{auth?.bmi || "Not Set"}</p>
            <p className="text-sm">{getBmiCategory(auth?.bmi)}</p>
            <button
              onClick={() => router.push("/bmi-calculator")}
              className={`mt-4 px-4 py-2 rounded-lg text-white ${
                auth?.bmi ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {auth?.bmi ? "Recalculate BMI" : "Calculate BMI"}
            </button>
          </div>

          {/* Goals Summary */}
          <div
            className={`p-6 rounded-lg shadow-md flex flex-col items-center ${
              theme ? "bg-white text-gray-900" : "bg-[#0f0f0f] text-[#ebebeb]"
            }`}
          >
            <h3 className="text-lg font-bold">Wellness Goals</h3>
            <p className="mt-2 text-2xl font-semibold">{auth?.goals?.length || 0}</p>
            <p className="text-sm">Active Goals</p>
            <button
              onClick={() => router.push("/wellness-goal-setting")}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Goals
            </button>
          </div>

          {/* Workout Summary */}
          <div
            className={`p-6 rounded-lg shadow-md flex flex-col items-center ${
              theme ? "bg-white text-gray-900" : "bg-[#0f0f0f] text-[#ebebeb]"
            }`}
          >
            <h3 className="text-lg font-bold">Workout Plan</h3>
            <p className="mt-2 text-2xl font-semibold">{auth?.workout?.title || "None"}</p>
            <p className="text-sm">{auth?.workout?.stream || "Not Set"}</p>
            <button
              onClick={() => router.push("/workOut")}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Workout
            </button>
          </div>

          {/* Nutrition Summary */}
          <div
            className={`p-6 rounded-lg shadow-md flex flex-col items-center ${
              theme ? "bg-white text-gray-900" : "bg-[#0f0f0f] text-[#ebebeb]"
            }`}
          >
            <h3 className="text-lg font-bold">{`Today's Nutrition`}</h3>
            <p className="mt-2 text-2xl font-semibold">{totalCalories} kcal</p>
            <p className="text-sm">{mealCount} Meals Tracked</p>
            <button
              onClick={() => router.push("/nutrition")}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Nutrition
            </button>
          </div>
        </div>

        {/* Quick Access Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meditation Summary */}
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme ? "bg-white text-gray-900" : "bg-[#0f0f0f] text-[#ebebeb]"
            }`}
          >
            <h3 className="text-lg font-bold mb-4">Meditation Sessions</h3>
            {auth?.meditation?.length > 0 ? (
              <div className="flex flex-col gap-4">
                {auth.meditation.slice(0, 2).map((session, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-semibold">{session.sessionType}: {session.title}</p>
                    <p>{session.description}</p>
                  </div>
                ))}
                {auth.meditation.length > 2 && (
                  <p className="text-sm italic">+ {auth.meditation.length - 2} more sessions</p>
                )}
                <button
                  onClick={() => router.push("/meditation")}
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View All Sessions
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm">No meditation sessions selected.</p>
                <button
                  onClick={() => router.push("/meditation")}
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Select Sessions
                </button>
              </div>
            )}
          </div>

          {/* Workout Plan Preview */}
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme ? "bg-white text-gray-900" : "bg-[#0f0f0f] text-[#ebebeb]"
            }`}
          >
            <h3 className="text-lg font-bold mb-4">Current Workout Plan</h3>
            {auth?.workout && auth.workout.days && Array.isArray(auth.workout.days) ? (
              <div className="flex flex-col gap-4">
                <p className="font-semibold">{auth.workout.stream}: {auth.workout.title}</p>
                <p className="text-sm">{auth.workout.description}</p>
                <p className="text-sm font-bold">{`Today's Workout:`}</p>
                {auth.workout.days
                  .filter((day) => day.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }))
                  .map((day, index) => (
                    <div key={index} className="text-sm">
                      <ul className="list-disc pl-5">
                        {day.exercises.slice(0, 2).map((exercise, i) => (
                          <li key={i}>
                            {exercise.name} - {exercise.sets} sets, {exercise.reps} reps
                          </li>
                        ))}
                      </ul>
                      {day.exercises.length > 2 && (
                        <p className="text-sm italic">+ {day.exercises.length - 2} more exercises</p>
                      )}
                    </div>
                  ))}
                {auth.workout.days.filter((day) => day.day === new Date().toLocaleDateString('en-US', { weekday: 'long' })).length === 0 && (
                  <p className="text-sm">No workout scheduled for today.</p>
                )}
                <button
                  onClick={() => router.push("/workout")}
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View Full Plan
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm">No workout plan selected.</p>
                <button
                  onClick={() => router.push("/workout")}
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Select Workout Plan
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress Overview */}
        <div
          className={`p-6 rounded-lg shadow-md ${
            theme ? "bg-white text-gray-900" : "bg-[#0f0f0f] text-[#ebebeb]"
          }`}
        >
          <h3 className="text-lg font-bold mb-4">Your Progress</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <p className="font-semibold">Goals Completed:</p>
              <p className="text-sm">{auth?.goals?.length || 0} goals set</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Nutrition Tracked:</p>
              <p className="text-sm">{mealCount} meals today</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Meditation Sessions:</p>
              <p className="text-sm">{auth?.meditation?.length || 0} sessions selected</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Workout Progress:</p>
              <p className="text-sm">{auth?.workout ? "Plan Active" : "No Plan Selected"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}