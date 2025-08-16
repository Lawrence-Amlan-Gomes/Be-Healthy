"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateRecipe } from "@/app/actions";

// Mock recipe data with restricted ingredients
const mockRecipes = {
  underweight: {
    Breakfast: [
      {
        name: "Option 1: Banana Nut Rice Porridge",
        description: "A calorie-dense rice porridge to boost weight gain.",
        ingredients: ["50g rice", "1 banana", "20g nuts", "200ml milk"],
        instructions: [
          "Cook rice in milk over medium heat for 15 minutes.",
          "Mash banana and stir into porridge with nuts.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 450 kcal, 12g protein, 15g fat, 60g carbs",
      },
      {
        name: "Option 2: Egg and Veggie Bread",
        description: "A protein-rich breakfast for energy.",
        ingredients: ["2 slices bread", "2 eggs", "50g mixed vegetables"],
        instructions: [
          "Toast bread and scramble eggs with mixed vegetables.",
          "Place eggs on bread and serve.",
        ],
        nutritionalInfo: "Approx. 400 kcal, 15g protein, 12g fat, 50g carbs",
      },
      {
        name: "Option 3: Chicken Rice Bowl",
        description: "A hearty breakfast to support weight gain.",
        ingredients: ["100g chicken", "50g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 100ml water for 10 minutes.",
          "Grill chicken and sauté vegetables.",
          "Combine and serve warm.",
        ],
        nutritionalInfo: "Approx. 420 kcal, 20g protein, 10g fat, 55g carbs",
      },
    ],
    Brunch: [
      {
        name: "Option 1: Banana Nut Bread",
        description: "A calorie-dense brunch snack.",
        ingredients: ["2 slices bread", "1 banana", "20g nuts"],
        instructions: [
          "Toast bread, spread mashed banana on top.",
          "Sprinkle nuts and serve.",
        ],
        nutritionalInfo: "Approx. 380 kcal, 10g protein, 15g fat, 50g carbs",
      },
      {
        name: "Option 2: Egg and Veggie Rice",
        description: "A protein-packed brunch option.",
        ingredients: ["50g rice", "2 eggs", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 100ml water for 10 minutes.",
          "Scramble eggs with vegetables.",
          "Mix with rice and serve.",
        ],
        nutritionalInfo: "Approx. 350 kcal, 12g protein, 10g fat, 45g carbs",
      },
      {
        name: "Option 3: Chicken and Banana Wrap",
        description: "A high-calorie brunch wrap.",
        ingredients: ["100g chicken", "1 banana", "1 slice bread"],
        instructions: [
          "Grill chicken and mash banana.",
          "Spread banana on bread, add chicken, roll up, and serve.",
        ],
        nutritionalInfo: "Approx. 360 kcal, 18g protein, 8g fat, 50g carbs",
      },
    ],
    Lunch: [
      {
        name: "Option 1: Chicken and Rice Bowl",
        description: "A protein-rich lunch for weight gain.",
        ingredients: ["150g chicken", "100g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 200ml water for 10 minutes.",
          "Grill chicken and sauté vegetables.",
          "Combine and serve warm.",
        ],
        nutritionalInfo: "Approx. 500 kcal, 30g protein, 10g fat, 60g carbs",
      },
      {
        name: "Option 2: Fish and Potato Stew",
        description: "A hearty, calorie-dense lunch.",
        ingredients: ["150g fish", "1 potato", "50g mixed vegetables"],
        instructions: [
          "Boil potato until soft, then mash.",
          "Cook fish with vegetables in 200ml water for 10 minutes.",
          "Combine and serve warm.",
        ],
        nutritionalInfo: "Approx. 480 kcal, 25g protein, 12g fat, 55g carbs",
      },
      {
        name: "Option 3: Egg and Veggie Rice",
        description: "A nutrient-rich lunch option.",
        ingredients: ["100g rice", "2 eggs", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 200ml water for 10 minutes.",
          "Scramble eggs with vegetables.",
          "Mix with rice and serve.",
        ],
        nutritionalInfo: "Approx. 460 kcal, 15g protein, 10g fat, 65g carbs",
      },
    ],
    Linner: [
      {
        name: "Option 1: Banana and Nut Snack",
        description: "A quick, calorie-dense snack.",
        ingredients: ["1 banana", "20g nuts", "1 slice bread"],
        instructions: [
          "Slice banana and toast bread.",
          "Spread nuts on bread, top with banana slices, and serve.",
        ],
        nutritionalInfo: "Approx. 350 kcal, 8g protein, 12g fat, 50g carbs",
      },
      {
        name: "Option 2: Egg and Veggie Plate",
        description: "A protein-rich linner snack.",
        ingredients: ["2 eggs", "50g mixed vegetables", "1 slice bread"],
        instructions: [
          "Boil eggs for 10 minutes, peel, and slice.",
          "Sauté vegetables and toast bread.",
          "Serve together.",
        ],
        nutritionalInfo: "Approx. 320 kcal, 12g protein, 10g fat, 40g carbs",
      },
      {
        name: "Option 3: Chicken and Rice Snack",
        description: "A filling linner option.",
        ingredients: ["100g chicken", "50g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 100ml water for 10 minutes.",
          "Grill chicken and sauté vegetables.",
          "Combine and serve.",
        ],
        nutritionalInfo: "Approx. 340 kcal, 18g protein, 8g fat, 45g carbs",
      },
    ],
    Dinner: [
      {
        name: "Option 1: Fish and Potato Bake",
        description: "A hearty dinner for weight gain.",
        ingredients: ["150g fish", "1 potato", "50g mixed vegetables"],
        instructions: [
          "Bake fish and potato at 375°F for 20 minutes.",
          "Sauté vegetables.",
          "Combine and serve warm.",
        ],
        nutritionalInfo: "Approx. 480 kcal, 25g protein, 10g fat, 55g carbs",
      },
      {
        name: "Option 2: Chicken and Rice Stir-Fry",
        description: "A protein-packed dinner option.",
        ingredients: ["150g chicken", "100g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 200ml water for 10 minutes.",
          "Sauté chicken and vegetables.",
          "Mix with rice and serve hot.",
        ],
        nutritionalInfo: "Approx. 500 kcal, 30g protein, 10g fat, 60g carbs",
      },
      {
        name: "Option 3: Egg and Veggie Bread",
        description: "A nutrient-dense dinner option.",
        ingredients: ["2 eggs", "50g mixed vegetables", "2 slices bread"],
        instructions: [
          "Scramble eggs with vegetables.",
          "Toast bread and top with egg mixture.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 420 kcal, 15g protein, 12g fat, 50g carbs",
      },
    ],
  },
  normal: {
    Breakfast: [
      {
        name: "Option 1: Egg and Veggie Toast",
        description: "A balanced breakfast for maintenance.",
        ingredients: ["2 slices bread", "2 eggs", "50g mixed vegetables"],
        instructions: [
          "Toast bread and scramble eggs with vegetables.",
          "Place eggs on toast and serve.",
        ],
        nutritionalInfo: "Approx. 300 kcal, 12g protein, 10g fat, 35g carbs",
      },
      {
        name: "Option 2: Banana Rice Porridge",
        description: "A light, nutrient-rich breakfast.",
        ingredients: ["50g rice", "1 banana", "200ml milk"],
        instructions: [
          "Cook rice in milk for 15 minutes.",
          "Mash banana and stir into porridge.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 320 kcal, 10g protein, 8g fat, 50g carbs",
      },
      {
        name: "Option 3: Chicken and Veggie Wrap",
        description: "A protein-packed breakfast option.",
        ingredients: ["100g chicken", "50g mixed vegetables", "1 slice bread"],
        instructions: [
          "Grill chicken and sauté vegetables.",
          "Wrap in bread and serve.",
        ],
        nutritionalInfo: "Approx. 310 kcal, 18g protein, 8g fat, 40g carbs",
      },
    ],
    Brunch: [
      {
        name: "Option 1: Banana and Nut Snack",
        description: "A balanced brunch snack.",
        ingredients: ["1 banana", "20g nuts"],
        instructions: ["Slice banana and mix with nuts.", "Serve fresh."],
        nutritionalInfo: "Approx. 200 kcal, 5g protein, 10g fat, 25g carbs",
      },
      {
        name: "Option 2: Egg and Veggie Plate",
        description: "A light, protein-rich brunch.",
        ingredients: ["1 egg", "50g mixed vegetables"],
        instructions: [
          "Boil egg for 10 minutes, peel, and slice.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 8g protein, 8g fat, 15g carbs",
      },
      {
        name: "Option 3: Rice and Veggie Bowl",
        description: "A balanced brunch option.",
        ingredients: ["50g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 100ml water for 10 minutes.",
          "Sauté vegetables and mix with rice.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 190 kcal, 5g protein, 3g fat, 30g carbs",
      },
    ],
    Lunch: [
      {
        name: "Option 1: Chicken and Rice Salad",
        description: "A balanced lunch for health maintenance.",
        ingredients: ["150g chicken", "100g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 200ml water for 10 minutes.",
          "Grill chicken and sauté vegetables.",
          "Toss together and serve.",
        ],
        nutritionalInfo: "Approx. 400 kcal, 25g protein, 10g fat, 45g carbs",
      },
      {
        name: "Option 2: Fish and Veggie Plate",
        description: "A nutrient-rich lunch option.",
        ingredients: ["150g fish", "50g mixed vegetables", "1 potato"],
        instructions: [
          "Bake fish and potato at 375°F for 20 minutes.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 380 kcal, 20g protein, 8g fat, 40g carbs",
      },
      {
        name: "Option 3: Egg and Rice Bowl",
        description: "A protein-packed lunch.",
        ingredients: ["2 eggs", "100g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 200ml water for 10 minutes.",
          "Scramble eggs with vegetables.",
          "Mix with rice and serve.",
        ],
        nutritionalInfo: "Approx. 390 kcal, 12g protein, 10g fat, 50g carbs",
      },
    ],
    Linner: [
      {
        name: "Option 1: Banana and Bread Snack",
        description: "A light, balanced snack.",
        ingredients: ["1 banana", "1 slice bread"],
        instructions: [
          "Toast bread and top with mashed banana.",
          "Serve fresh.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 5g protein, 3g fat, 35g carbs",
      },
      {
        name: "Option 2: Egg and Veggie Snack",
        description: "A protein-rich linner option.",
        ingredients: ["1 egg", "50g mixed vegetables"],
        instructions: [
          "Boil egg for 10 minutes, peel, and slice.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 8g protein, 8g fat, 15g carbs",
      },
      {
        name: "Option 3: Chicken and Veggie Plate",
        description: "A balanced linner snack.",
        ingredients: ["100g chicken", "50g mixed vegetables"],
        instructions: [
          "Grill chicken and sauté vegetables.",
          "Serve together.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 15g protein, 5g fat, 10g carbs",
      },
    ],
    Dinner: [
      {
        name: "Option 1: Fish and Rice Plate",
        description: "A balanced dinner for maintenance.",
        ingredients: ["150g fish", "100g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 200ml water for 10 minutes.",
          "Bake fish at 375°F for 15 minutes.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 400 kcal, 20g protein, 8g fat, 45g carbs",
      },
      {
        name: "Option 2: Chicken and Potato Bake",
        description: "A nutrient-rich dinner option.",
        ingredients: ["150g chicken", "1 potato", "50g mixed vegetables"],
        instructions: [
          "Bake chicken and potato at 375°F for 20 minutes.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 380 kcal, 25g protein, 8g fat, 40g carbs",
      },
      {
        name: "Option 3: Egg and Veggie Rice",
        description: "A light, balanced dinner.",
        ingredients: ["2 eggs", "100g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 200ml water for 10 minutes.",
          "Scramble eggs with vegetables.",
          "Mix with rice and serve.",
        ],
        nutritionalInfo: "Approx. 390 kcal, 12g protein, 10g fat, 50g carbs",
      },
    ],
  },
  overweight: {
    Breakfast: [
      {
        name: "Option 1: Egg and Veggie Scramble",
        description: "A low-calorie, high-protein breakfast.",
        ingredients: ["2 eggs", "50g mixed vegetables"],
        instructions: [
          "Scramble eggs with vegetables in a non-stick pan.",
          "Serve hot.",
        ],
        nutritionalInfo: "Approx. 150 kcal, 12g protein, 8g fat, 8g carbs",
      },
      {
        name: "Option 2: Banana and Rice Bowl",
        description: "A light, low-calorie breakfast.",
        ingredients: ["50g rice", "1 banana"],
        instructions: [
          "Cook rice in 100ml water for 10 minutes.",
          "Slice banana and mix with rice.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 5g protein, 1g fat, 35g carbs",
      },
      {
        name: "Option 3: Chicken and Veggie Plate",
        description: "A protein-rich breakfast for weight management.",
        ingredients: ["100g chicken", "50g mixed vegetables"],
        instructions: [
          "Grill chicken and sauté vegetables.",
          "Serve together.",
        ],
        nutritionalInfo: "Approx. 170 kcal, 15g protein, 5g fat, 8g carbs",
      },
    ],
    Brunch: [
      {
        name: "Option 1: Veggie and Egg Snack",
        description: "A low-calorie, protein-rich brunch.",
        ingredients: ["1 egg", "50g mixed vegetables"],
        instructions: [
          "Boil egg for 10 minutes, peel, and slice.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 120 kcal, 8g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 2: Banana Slices",
        description: "A low-calorie, simple brunch snack.",
        ingredients: ["1 banana"],
        instructions: ["Slice banana and serve fresh."],
        nutritionalInfo: "Approx. 90 kcal, 1g protein, 0g fat, 22g carbs",
      },
      {
        name: "Option 3: Veggie Rice Snack",
        description: "A light, fiber-rich brunch option.",
        ingredients: ["50g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 100ml water for 10 minutes.",
          "Sauté vegetables and mix with rice.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 140 kcal, 4g protein, 2g fat, 25g carbs",
      },
    ],
    Lunch: [
      {
        name: "Option 1: Chicken and Veggie Salad",
        description: "A low-calorie, protein-rich lunch.",
        ingredients: ["150g chicken", "50g mixed vegetables"],
        instructions: [
          "Grill chicken and sauté vegetables.",
          "Toss together and serve.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 25g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 2: Fish and Veggie Plate",
        description: "A low-calorie, nutrient-dense lunch.",
        ingredients: ["150g fish", "50g mixed vegetables"],
        instructions: [
          "Bake fish at 375°F for 15 minutes.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 20g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 3: Egg and Rice Salad",
        description: "A light, balanced lunch option.",
        ingredients: ["2 eggs", "50g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 100ml water for 10 minutes.",
          "Boil eggs, peel, and slice.",
          "Sauté vegetables, mix with rice and eggs, and serve.",
        ],
        nutritionalInfo: "Approx. 190 kcal, 12g protein, 8g fat, 20g carbs",
      },
    ],
    Linner: [
      {
        name: "Option 1: Veggie and Egg Snack",
        description: "A low-calorie, protein-rich snack.",
        ingredients: ["1 egg", "50g mixed vegetables"],
        instructions: [
          "Boil egg for 10 minutes, peel, and slice.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 120 kcal, 8g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 2: Banana Snack",
        description: "A simple, low-calorie snack.",
        ingredients: ["1 banana"],
        instructions: ["Slice banana and serve fresh."],
        nutritionalInfo: "Approx. 90 kcal, 1g protein, 0g fat, 22g carbs",
      },
      {
        name: "Option 3: Veggie Plate",
        description: "A low-calorie, fiber-rich snack.",
        ingredients: ["50g mixed vegetables"],
        instructions: ["Sauté vegetables and serve."],
        nutritionalInfo: "Approx. 50 kcal, 2g protein, 1g fat, 10g carbs",
      },
    ],
    Dinner: [
      {
        name: "Option 1: Fish and Veggie Plate",
        description: "A low-calorie, high-protein dinner.",
        ingredients: ["150g fish", "50g mixed vegetables"],
        instructions: [
          "Bake fish at 375°F for 15 minutes.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 20g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 2: Chicken and Veggie Plate",
        description: "A low-calorie, protein-rich dinner.",
        ingredients: ["150g chicken", "50g mixed vegetables"],
        instructions: [
          "Grill chicken and sauté vegetables.",
          "Serve together.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 25g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 3: Egg and Veggie Salad",
        description: "A light, low-calorie dinner option.",
        ingredients: ["2 eggs", "50g mixed vegetables"],
        instructions: [
          "Boil eggs for 10 minutes, peel, and slice.",
          "Sauté vegetables and toss with eggs.",
          "Serve fresh.",
        ],
        nutritionalInfo: "Approx. 150 kcal, 12g protein, 8g fat, 8g carbs",
      },
    ],
  },
  obese: {
    Breakfast: [
      {
        name: "Option 1: Egg and Veggie Scramble",
        description: "A low-calorie, high-protein breakfast for weight loss.",
        ingredients: ["2 eggs", "50g mixed vegetables"],
        instructions: [
          "Scramble eggs with vegetables in a non-stick pan.",
          "Serve hot.",
        ],
        nutritionalInfo: "Approx. 150 kcal, 12g protein, 8g fat, 8g carbs",
      },
      {
        name: "Option 2: Veggie Rice Bowl",
        description: "A low-calorie, fiber-rich breakfast.",
        ingredients: ["50g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 100ml water for 10 minutes.",
          "Sauté vegetables and mix with rice.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 140 kcal, 4g protein, 2g fat, 25g carbs",
      },
      {
        name: "Option 3: Chicken and Veggie Plate",
        description: "A protein-rich, low-calorie breakfast.",
        ingredients: ["100g chicken", "50g mixed vegetables"],
        instructions: [
          "Grill chicken and sauté vegetables.",
          "Serve together.",
        ],
        nutritionalInfo: "Approx. 170 kcal, 15g protein, 5g fat, 8g carbs",
      },
    ],
    Brunch: [
      {
        name: "Option 1: Veggie Snack",
        description: "A low-calorie, fiber-rich snack.",
        ingredients: ["50g mixed vegetables"],
        instructions: ["Sauté vegetables and serve."],
        nutritionalInfo: "Approx. 50 kcal, 2g protein, 1g fat, 10g carbs",
      },
      {
        name: "Option 2: Banana Snack",
        description: "A simple, low-calorie brunch option.",
        ingredients: ["1 banana"],
        instructions: ["Slice banana and serve fresh."],
        nutritionalInfo: "Approx. 90 kcal, 1g protein, 0g fat, 22g carbs",
      },
      {
        name: "Option 3: Egg Snack",
        description: "A low-calorie, protein-rich snack.",
        ingredients: ["1 egg", "50g mixed vegetables"],
        instructions: [
          "Boil egg for 10 minutes, peel, and slice.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 120 kcal, 8g protein, 5g fat, 8g carbs",
      },
    ],
    Lunch: [
      {
        name: "Option 1: Chicken and Veggie Salad",
        description: "A low-calorie, protein-rich lunch for weight loss.",
        ingredients: ["150g chicken", "50g mixed vegetables"],
        instructions: [
          "Grill chicken and sauté vegetables.",
          "Toss together and serve.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 25g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 2: Fish and Veggie Plate",
        description: "A low-calorie, nutrient-dense lunch.",
        ingredients: ["150g fish", "50g mixed vegetables"],
        instructions: [
          "Bake fish at 375°F for 15 minutes.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 20g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 3: Egg and Veggie Rice",
        description: "A low-calorie, balanced lunch option.",
        ingredients: ["2 eggs", "50g rice", "50g mixed vegetables"],
        instructions: [
          "Cook rice in 100ml water for 10 minutes.",
          "Scramble eggs with vegetables.",
          "Mix with rice and serve.",
        ],
        nutritionalInfo: "Approx. 190 kcal, 12g protein, 8g fat, 20g carbs",
      },
    ],
    Linner: [
      {
        name: "Option 1: Veggie Snack",
        description: "A low-calorie, fiber-rich snack.",
        ingredients: ["50g mixed vegetables"],
        instructions: ["Sauté vegetables and serve."],
        nutritionalInfo: "Approx. 50 kcal, 2g protein, 1g fat, 10g carbs",
      },
      {
        name: "Option 2: Egg Snack",
        description: "A low-calorie, protein-rich snack.",
        ingredients: ["1 egg"],
        instructions: ["Boil egg for 10 minutes, peel, and serve."],
        nutritionalInfo: "Approx. 70 kcal, 6g protein, 5g fat, 1g carbs",
      },
      {
        name: "Option 3: Banana Snack",
        description: "A simple, low-calorie snack.",
        ingredients: ["1 banana"],
        instructions: ["Slice banana and serve fresh."],
        nutritionalInfo: "Approx. 90 kcal, 1g protein, 0g fat, 22g carbs",
      },
    ],
    Dinner: [
      {
        name: "Option 1: Chicken and Veggie Plate",
        description: "A low-calorie, protein-rich dinner for weight loss.",
        ingredients: ["150g chicken", "50g mixed vegetables"],
        instructions: [
          "Grill chicken and sauté vegetables.",
          "Serve together.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 25g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 2: Fish and Veggie Plate",
        description: "A low-calorie, nutrient-dense dinner.",
        ingredients: ["150g fish", "50g mixed vegetables"],
        instructions: [
          "Bake fish at 375°F for 15 minutes.",
          "Sauté vegetables and serve together.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 20g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 3: Egg and Veggie Salad",
        description: "A low-calorie, balanced dinner option.",
        ingredients: ["2 eggs", "50g mixed vegetables"],
        instructions: [
          "Boil eggs for 10 minutes, peel, and slice.",
          "Sauté vegetables and toss with eggs.",
          "Serve fresh.",
        ],
        nutritionalInfo: "Approx. 150 kcal, 12g protein, 8g fat, 8g carbs",
      },
    ],
  },
};

export default function HealthyRecipeSuggestions() {
  const [bmiError, setBmiError] = useState(true);
  const { theme } = useTheme();
  const router = useRouter();
  const { auth, setAuth } = useAuth();
  const [bmiCategory, setBmiCategory] = useState("");
  const [recipes, setRecipes] = useState({});
  const [recipeArray, setRecipeArray] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  // Validate BMI input
  useEffect(() => {
    if (auth) {
      if (auth.bmi == 0) {
        setBmiError(true);
      } else {
        setBmiError(false);
      }
    }
  }, [auth]);

  // Initialize recipeArray and determine BMI category
  useEffect(() => {
    if (auth && !bmiError) {
      let category = "";
      if (auth.bmi < 18.5) {
        category = "underweight";
      } else if (auth.bmi >= 18.5 && auth.bmi < 25) {
        category = "normal";
      } else if (auth.bmi >= 25 && auth.bmi < 30) {
        category = "overweight";
      } else {
        category = "obese";
      }
      setBmiCategory(category.charAt(0).toUpperCase() + category.slice(1));
      setRecipes(mockRecipes[category] || {});
      setShowRecipes(true);
      // Initialize recipeArray with auth.recipe if it exists
      setRecipeArray(auth.recipe && auth.recipe.length > 0 ? auth.recipe : []);
      setIsSelecting(auth.recipe.length === 0);
    }
  }, [auth, bmiError]);

  // Handle recipe selection
  const handleSelectRecipe = (mealType, recipe) => {
    setRecipeArray((prev) => {
      // Remove any existing recipe for this meal type
      const filtered = prev.filter((item) => item.mealTime !== mealType);
      // Add the new selection
      return [
        ...filtered,
        {
          mealTime: mealType,
          name: recipe.name,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          nutritionalInfo: recipe.nutritionalInfo,
        },
      ];
    });
  };

  // Handle update recipe
  const handleUpdateRecipe = async () => {
    if (recipeArray.length === 5) {
      try {
        // Update auth context
        setAuth({ ...auth, recipe: recipeArray });
        // Update database
        await updateRecipe(auth.email, recipeArray);
        setUpdateStatus("Recipes updated successfully!");
        setIsSelecting(false); // Show selected recipes
      } catch (error) {
        console.error("Failed to update recipes:", error);
        setUpdateStatus("Failed to update recipes. Please try again.");
      }
    }
  };

  // Check if all meal times are selected
  const isUpdateDisabled = recipeArray.length !== 5;

  // Define meal order for sorting
  const mealOrder = ["Breakfast", "Brunch", "Lunch", "Linner", "Dinner"];

  // Sort recipeArray by meal time
  const sortedRecipeArray = [...recipeArray].sort((a, b) => {
    return mealOrder.indexOf(a.mealTime) - mealOrder.indexOf(b.mealTime);
  });

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
        Healthy Recipe Suggestions
      </div>

      <div className={`w-full md:px-10 px-5 pb-10 flex flex-col gap-10`}>
        {/* BMI Input */}
        <div className="w-full flex justify-center items-center">
          <div
            onClick={() => router.push("/bmi-calculator")}
            className={`${
              bmiError
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } w-[200px] text-center text-white rounded-lg p-3 flex justify-center items-center cursor-pointer`}
          >
            {bmiError
              ? "You have to calculate your BMI first"
              : "Recalculate your BMI"}
          </div>
        </div>

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

        {/* Recipe Results */}
        {!bmiError && (
          <div className="w-full flex flex-col gap-5">
            <div
              className={`w-full p-5 text-center rounded-lg ${
                theme
                  ? "bg-[#ececec] text-[#0a0a0a]"
                  : "bg-[#0f0f0f] text-[#f0f0f0]"
              }`}
            >
              Based on your BMI of <span className="font-bold">{auth.bmi}</span> (
              {bmiCategory}), here are healthy recipes tailored to your health
              needs.
            </div>

            {/* Show selected recipes or selection UI */}
            {recipeArray.length > 0 && !isSelecting ? (
              <div className="w-full flex flex-col gap-5">
                <div
                  className={`w-full p-5 text-center rounded-lg font-bold text-[20px] ${
                    theme
                      ? "bg-[#d4d4d4] text-[#0a0a0a]"
                      : "bg-[#1a1a1a] text-[#f0f0f0]"
                  }`}
                >
                  Your Selected Recipes
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                  {sortedRecipeArray.map((recipe, index) => (
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
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-center items-center">
                  <div
                    onClick={() => {
                      setIsSelecting(true);
                      setRecipeArray([]);
                      setUpdateStatus("");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 w-[200px] text-center text-white rounded-lg p-3 flex justify-center items-center cursor-pointer"
                  >
                    Reselect Recipes
                  </div>
                </div>
              </div>
            ) : (
              <>
                {["Breakfast", "Brunch", "Lunch", "Linner", "Dinner"].map(
                  (mealType) => (
                    <div key={mealType} className="w-full flex flex-col gap-5">
                      <div
                        className={`w-full p-5 text-center rounded-lg font-bold text-[20px] ${
                          theme
                            ? "bg-[#d4d4d4] text-[#0a0a0a]"
                            : "bg-[#1a1a1a] text-[#f0f0f0]"
                        }`}
                      >
                        {mealType}
                      </div>
                      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                        {recipes[mealType]?.map((recipe, index) => (
                          <div
                            key={index}
                            className={`p-5 rounded-lg flex flex-col justify-center items-center ${
                              theme
                                ? "bg-[#ececec] text-[#0a0a0a]"
                                : "bg-[#0f0f0f] text-[#f0f0f0]"
                            }`}
                          >
                            <div className="w-full lg:text-[18px] font-bold flex justify-center items-center p-3">
                              {recipe.name}
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
                            <div
                              onClick={() => handleSelectRecipe(mealType, recipe)}
                              className={`mt-3 bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 cursor-pointer ${
                                recipeArray.some(
                                  (item) => item.mealTime === mealType && item.name === recipe.name
                                )
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={recipeArray.some(
                                (item) => item.mealTime === mealType && item.name === recipe.name
                              )}
                            >
                              Select
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
                <div className="w-full flex justify-center items-center">
                  <div
                    onClick={handleUpdateRecipe}
                    className={`w-[200px] text-center rounded-lg p-3 flex justify-center items-center ${
                      isUpdateDisabled
                        ? theme ? "bg-[#dddddd] text-[#888888] zinc-500 cursor-not-allowed" : "bg-[#222222] text-[#888888] cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    }`}
                    disabled={isUpdateDisabled}
                  >
                    Update Recipe
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}