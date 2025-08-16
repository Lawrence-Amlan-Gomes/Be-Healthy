"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateNutrition } from "@/app/actions";

export default function NutritionTracker() {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const router = useRouter();
  const [nutritionArray, setNutritionArray] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("");
  const [buttonState, setButtonState] = useState("default"); // default, updating, success

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]; // e.g., "2025-08-15"

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  // Initialize nutritionArray based on auth.nutrition for today
  useEffect(() => {
    if (auth && auth.recipe && auth.recipe.length > 0) {
      if (auth.nutrition && auth.nutrition.length > 0) {
        // Filter meals from auth.nutrition that match today's date
        const todayMeals = auth.nutrition.filter((meal) => meal.date === today);
        setNutritionArray(todayMeals);
      } else {
        // If no nutrition data or no meals for today, reset to empty
        setNutritionArray([]);
      }
    }
  }, [auth, today]);

  // Handle meal selection
  const handleSelectMeal = (meal) => {
    setNutritionArray((prev) => {
      if (prev.some((item) => item.mealTime === meal.mealTime)) {
        return prev.filter((item) => item.mealTime !== meal.mealTime);
      }
      return [
        ...prev,
        {
          mealTime: meal.mealTime,
          name: meal.name,
          description: meal.description,
          ingredients: meal.ingredients,
          instructions: meal.instructions,
          nutritionalInfo: meal.nutritionalInfo,
          date: today, // Always set to today's date
        },
      ];
    });
  };

  // Handle update nutrition
  const handleUpdateNutrition = async () => {
    if (nutritionArray.length > 0) {
      setButtonState("updating");
      try {
        setAuth({ ...auth, nutrition: nutritionArray });
        await updateNutrition(auth.email, nutritionArray);
        setButtonState("success");
        setUpdateStatus("Nutrition updated successfully!");
        setTimeout(() => {
          setButtonState("default");
        }, 2000);
      } catch (error) {
        console.error("Failed to update nutrition:", error);
        setUpdateStatus("Failed to update nutrition. Please try again.");
        setButtonState("default");
      }
    } else {
      setUpdateStatus("Please select at least one meal.");
      setButtonState("default");
    }
  };

  // Calculate total calories and combined ingredients
  const calculateNutritionSummary = () => {
    let totalCalories = 0;
    const allIngredients = [];

    nutritionArray.forEach((meal) => {
      // Parse calories from nutritionalInfo (e.g., "Approx. 450 kcal, ...")
      const caloriesMatch = meal.nutritionalInfo.match(/(\d+)\s*kcal/);
      if (caloriesMatch) {
        totalCalories += parseInt(caloriesMatch[1], 10);
      }
      // Combine ingredients, avoiding duplicates
      meal.ingredients.forEach((ingredient) => {
        if (!allIngredients.includes(ingredient)) {
          allIngredients.push(ingredient);
        }
      });
    });

    return { totalCalories, allIngredients };
  };

  const { totalCalories, allIngredients } = calculateNutritionSummary();

  // Define meal order for sorting
  const mealOrder = ["Breakfast", "Brunch", "Lunch", "Linner", "Dinner"];

  // Sort auth.recipe and nutritionArray by meal time
  const sortedRecipes = auth?.recipe
    ? [...auth.recipe].sort((a, b) => mealOrder.indexOf(a.mealTime) - mealOrder.indexOf(b.mealTime))
    : [];
  const sortedNutritionArray = [...nutritionArray].sort((a, b) => mealOrder.indexOf(a.mealTime) - mealOrder.indexOf(b.mealTime));

  return (
    <div
      className={`w-full h-full overflow-y-auto scrollbar ${
        theme
          ? "bg-[#ffffff] text-[#0a0a0a] scrollbar-track-[#eeeeee] scrollbar-thumb-[#333333]"
          : "bg-[#000000] text-[#ebebeb] scrollbar-track-[#222222] scrollbar-thumb-[#eeeeee]"
      }`}
    >
      <div
        className={`w-full py-10 font-bold float-left text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[50px] flex justify-center items-center`}
      >
        Nutrition Tracker
      </div>

      <div className={`w-full md:px-10 px-5 pb-10 flex flex-col gap-10`}>
        {/* Show button if no recipes */}
        {!auth?.recipe || auth.recipe.length === 0 ? (
          <div className="w-full flex justify-center items-center">
            <div
              onClick={() => router.push("/healthy-recipe-suggestions")}
              className="bg-red-600 hover:bg-red-700 w-[250px] text-center text-white rounded-lg p-3 flex justify-center items-center cursor-pointer"
            >
              You have to set your recipe first
            </div>
          </div>
        ) : (
          <>
            {/* Update Status Message */}
            {updateStatus && (
              <div
                className={`w-full p-5 text-center rounded-lg ${
                  updateStatus.includes("successfully")
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {updateStatus}
              </div>
            )}

            {/* Meal Selection and Display */}
            <div className="w-full flex flex-col gap-5">
              <div
                className={`w-full p-5 text-center rounded-lg ${
                  theme
                    ? "bg-[#ececec] text-[#0a0a0a]"
                    : "bg-[#0f0f0f] text-[#f0f0f0]"
                }`}
              >
                Select the meals you completed today from your saved recipes.
              </div>

              {/* Display Saved Recipes with Checkboxes */}
              <div className="w-full flex flex-col gap-5">
                <div
                  className={`w-full p-5 text-center rounded-lg font-bold text-[20px] ${
                    theme
                      ? "bg-[#d4d4d4] text-[#0a0a0a]"
                      : "bg-[#1a1a1a] text-[#f0f0f0]"
                  }`}
                >
                  Your Saved Recipes
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                  {sortedRecipes.map((recipe, index) => (
                    <div
                      key={index}
                      className={`p-5 rounded-lg flex flex-col justify-center items-center ${
                        theme
                          ? "bg-[#ececec] text-[#0a0a0a]"
                          : "bg-[#0f0f0f] text-[#f0f0f0]"
                      }`}
                    >
                      <div className="w-full lg:text-[18px] font-bold flex justify-center items-center p-3">
                        {recipe.mealTime}: {recipe.name}
                      </div>
                      <div className="w-full text-[16px] flex justify-center items-center p-2">
                        {recipe.description}
                      </div>
                      <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                        <span className="font-bold">Ingredients:</span>
                        <ul className="list-disc pl-5">
                          {recipe.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                        <span className="font-bold">Instructions:</span>
                        <ol className="list-decimal pl-5">
                          {recipe.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div className="w-full text-[16px] flex justify-center items-center p-2">
                        <span className="font-bold">Nutritional Info:</span>
                        <span className="ml-1">{recipe.nutritionalInfo}</span>
                      </div>
                      <div className="w-full flex justify-center items-center p-2">
                        <input
                          type="checkbox"
                          checked={nutritionArray.some((item) => item.mealTime === recipe.mealTime)}
                          onChange={() => handleSelectMeal(recipe)}
                          className="w-5 h-5"
                        />
                        <span className="ml-2">Completed Today</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Nutrition Summary */}
              {nutritionArray.length > 0 && (
                <div className="w-full flex flex-col gap-5">
                  <div
                    className={`w-full p-5 text-center rounded-lg font-bold text-[20px] ${
                      theme
                        ? "bg-[#d4d4d4] text-[#0a0a0a]"
                        : "bg-[#1a1a1a] text-[#f0f0f0]"
                    }`}
                  >
                    {`Today's Nutrition Summary`}
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                    {sortedNutritionArray.map((meal, index) => (
                      <div
                        key={index}
                        className={`p-5 rounded-lg flex flex-col justify-center items-center ${
                          theme
                            ? "bg-[#ececec] text-[#0a0a0a]"
                            : "bg-[#0f0f0f] text-[#f0f0f0]"
                        }`}
                      >
                        <div className="w-full lg:text-[18px] font-bold flex justify-center items-center p-3">
                          {meal.mealTime}: {meal.name}
                        </div>
                        <div className="w-full text-[16px] flex justify-center items-center p-2">
                          {meal.description}
                        </div>
                        <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                          <span className="font-bold">Ingredients:</span>
                          <ul className="list-disc pl-5">
                            {meal.ingredients.map((ingredient, i) => (
                              <li key={i}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-full text-[16px] flex justify-center items-center p-2">
                          <span className="font-bold">Nutritional Info:</span>
                          <span className="ml-1">{meal.nutritionalInfo}</span>
                        </div>
                        <div className="w-full text-[16px] flex justify-center items-center p-2">
                          <span className="font-bold">Date:</span>
                          <span className="ml-1">{meal.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`w-full p-5 rounded-lg flex flex-col justify-center items-center ${
                      theme
                        ? "bg-[#ececec] text-[#0a0a0a]"
                        : "bg-[#0f0f0f] text-[#f0f0f0]"
                    }`}
                  >
                    <div className="w-full text-[16px] flex justify-center items-center p-2">
                      <span className="font-bold">Total Calories:</span>
                      <span className="ml-1">{totalCalories} kcal</span>
                    </div>
                    <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                      <span className="font-bold">All Ingredients Eaten:</span>
                      <ul className="list-disc pl-5">
                        {allIngredients.map((ingredient, i) => (
                          <li key={i}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Update Nutrition Button */}
              <div className="w-full flex justify-center items-center">
                <div
                  onClick={handleUpdateNutrition}
                  className={`w-[200px] text-center rounded-lg p-3 flex justify-center items-center ${
                    nutritionArray.length === 0 || buttonState === "updating"
                      ? theme
                        ? "bg-[#dddddd] text-[#888888] cursor-not-allowed"
                        : "bg-[#222222] text-[#888888] cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                  }`}
                  disabled={nutritionArray.length === 0 || buttonState === "updating"}
                >
                  {buttonState === "updating"
                    ? "Updating..."
                    : buttonState === "success"
                    ? "Success!"
                    : "Update Nutrition"}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}