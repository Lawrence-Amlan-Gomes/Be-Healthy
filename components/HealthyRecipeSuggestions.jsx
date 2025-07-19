"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useBmi } from "@/app/hooks/useBmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "mongoose";

// Mock recipe data with 15 recipes per BMI category, organized by meal type
const mockRecipes = {
  underweight: {
    Breakfast: [
      {
        name: "Option 1: Peanut Butter Oatmeal",
        description:
          "A calorie-dense oatmeal bowl to kickstart your day with energy.",
        ingredients: [
          "50g oats",
          "1 tbsp peanut butter",
          "1 banana",
          "200ml whole milk",
          "1 tsp honey",
        ],
        instructions: [
          "Cook oats with milk over medium heat for 5 minutes.",
          "Stir in peanut butter and sliced banana.",
          "Drizzle with honey and serve warm.",
        ],
        nutritionalInfo: "Approx. 450 kcal, 15g protein, 20g fat, 55g carbs",
      },
      {
        name: "Option 2: Greek Yogurt Parfait",
        description:
          "A protein-packed parfait with nuts and fruit for healthy weight gain.",
        ingredients: [
          "200g Greek yogurt",
          "30g granola",
          "20g almonds",
          "100g mixed berries",
          "1 tsp maple syrup",
        ],
        instructions: [
          "Layer yogurt, granola, and berries in a glass.",
          "Sprinkle almonds on top.",
          "Drizzle with maple syrup and serve.",
        ],
        nutritionalInfo: "Approx. 500 kcal, 20g protein, 25g fat, 50g carbs",
      },
      {
        name: "Option 3: Avocado Toast with Eggs",
        description: "A nutrient-rich breakfast with healthy fats and protein.",
        ingredients: [
          "2 slices whole-grain bread",
          "1 avocado",
          "2 eggs",
          "1 tbsp olive oil",
          "Salt and pepper",
        ],
        instructions: [
          "Toast bread and mash avocado on top.",
          "Fry eggs in olive oil to desired doneness.",
          "Place eggs on avocado toast, season, and serve.",
        ],
        nutritionalInfo: "Approx. 480 kcal, 18g protein, 30g fat, 40g carbs",
      },
    ],
    Brunch: [
      {
        name: "Option 1: Almond Butter Banana Pancakes",
        description:
          "Fluffy pancakes with a calorie boost for mid-morning energy.",
        ingredients: [
          "100g flour",
          "1 banana",
          "1 tbsp almond butter",
          "100ml whole milk",
          "1 egg",
        ],
        instructions: [
          "Mix flour, milk, and egg into a batter.",
          "Mash banana and stir into batter with almond butter.",
          "Cook pancakes in a non-stick pan for 2-3 minutes per side.",
          "Serve with a drizzle of honey.",
        ],
        nutritionalInfo: "Approx. 550 kcal, 15g protein, 25g fat, 65g carbs",
      },
      {
        name: "Option 2: Smoked Salmon Bagel",
        description:
          "A protein-rich bagel with healthy fats for a filling brunch.",
        ingredients: [
          "1 whole-grain bagel",
          "50g smoked salmon",
          "2 tbsp cream cheese",
          "50g cucumber",
          "Dill",
        ],
        instructions: [
          "Toast bagel and spread with cream cheese.",
          "Layer smoked salmon and cucumber slices.",
          "Sprinkle with dill and serve.",
        ],
        nutritionalInfo: "Approx. 450 kcal, 20g protein, 20g fat, 50g carbs",
      },
      {
        name: "Option 3: Nutty Fruit Smoothie",
        description: "A high-calorie smoothie for a quick brunch boost.",
        ingredients: [
          "1 banana",
          "50g mixed nuts",
          "200ml whole milk",
          "100g Greek yogurt",
          "1 tbsp honey",
        ],
        instructions: [
          "Blend all ingredients until smooth.",
          "Pour into a glass and serve chilled.",
        ],
        nutritionalInfo: "Approx. 520 kcal, 18g protein, 28g fat, 50g carbs",
      },
    ],
    Lunch: [
      {
        name: "Option 1: Chicken Quinoa Bowl",
        description: "A protein-packed bowl for sustained energy.",
        ingredients: [
          "200g chicken breast",
          "100g quinoa",
          "1 avocado",
          "50g spinach",
          "1 tbsp olive oil",
        ],
        instructions: [
          "Grill chicken until fully cooked.",
          "Cook quinoa in 200ml water for 15 minutes.",
          "Slice avocado and toss with spinach.",
          "Combine with chicken and quinoa, drizzle with olive oil.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 600 kcal, 35g protein, 25g fat, 50g carbs",
      },
      {
        name: "Option 2: Sweet Potato and Black Bean Salad",
        description: "A hearty salad with complex carbs for weight gain.",
        ingredients: [
          "1 sweet potato",
          "100g black beans",
          "50g feta",
          "1 tbsp olive oil",
          "1 tsp cumin",
        ],
        instructions: [
          "Bake sweet potato at 400°F for 40 minutes.",
          "Heat black beans with cumin.",
          "Cube sweet potato and mix with beans and feta.",
          "Drizzle with olive oil and serve.",
        ],
        nutritionalInfo: "Approx. 550 kcal, 15g protein, 20g fat, 70g carbs",
      },
      {
        name: "Option 3: Tuna Avocado Wrap",
        description: "A calorie-dense wrap with healthy fats and protein.",
        ingredients: [
          "100g canned tuna",
          "1 avocado",
          "2 whole-grain tortillas",
          "50g lettuce",
          "1 tbsp mayo",
        ],
        instructions: [
          "Mash avocado and mix with tuna and mayo.",
          "Spread on tortillas with lettuce.",
          "Roll up and serve fresh.",
        ],
        nutritionalInfo: "Approx. 500 kcal, 25g protein, 25g fat, 45g carbs",
      },
    ],
    Linner: [
      {
        name: "Option 1: Beef and Quinoa Stir-Fry",
        description: "A protein-rich stir-fry for a late afternoon boost.",
        ingredients: [
          "150g beef strips",
          "100g quinoa",
          "100g broccoli",
          "1 tbsp soy sauce",
          "1 tsp garlic",
        ],
        instructions: [
          "Cook quinoa in 200ml water for 15 minutes.",
          "Sauté beef and broccoli with garlic in a pan.",
          "Add soy sauce and cooked quinoa, stir-fry for 3 minutes.",
          "Serve hot.",
        ],
        nutritionalInfo: "Approx. 550 kcal, 30g protein, 20g fat, 50g carbs",
      },
      {
        name: "Option 2: Chickpea Hummus Plate",
        description:
          "A nutrient-dense plate with hummus and veggies for energy.",
        ingredients: [
          "100g chickpeas",
          "2 tbsp hummus",
          "1 carrot",
          "1 cucumber",
          "1 pita bread",
        ],
        instructions: [
          "Blend chickpeas into hummus or use store-bought.",
          "Slice carrot and cucumber into sticks.",
          "Serve hummus with veggies and pita bread.",
        ],
        nutritionalInfo: "Approx. 450 kcal, 12g protein, 15g fat, 60g carbs",
      },
      {
        name: "Option 3: Almond Butter Apple Slices",
        description: "A quick, calorie-rich snack for linner.",
        ingredients: [
          "1 apple",
          "2 tbsp almond butter",
          "20g raisins",
          "20g walnuts",
          "1 tsp cinnamon",
        ],
        instructions: [
          "Slice apple into rounds.",
          "Spread almond butter on each slice.",
          "Top with raisins, walnuts, and a sprinkle of cinnamon.",
          "Serve fresh.",
        ],
        nutritionalInfo: "Approx. 400 kcal, 10g protein, 25g fat, 40g carbs",
      },
    ],
    Dinner: [
      {
        name: "Option 1: Baked Salmon with Sweet Potato",
        description: "A hearty dinner with protein and complex carbs.",
        ingredients: [
          "150g salmon",
          "1 sweet potato",
          "100g green beans",
          "1 tbsp olive oil",
          "1 tsp rosemary",
        ],
        instructions: [
          "Bake salmon and sweet potato at 400°F for 20 minutes.",
          "Steam green beans for 5 minutes.",
          "Drizzle all with olive oil and sprinkle rosemary.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 550 kcal, 25g protein, 20g fat, 60g carbs",
      },
      {
        name: "Option 2: Lentil and Veggie Curry",
        description: "A calorie-dense curry to support weight gain.",
        ingredients: [
          "100g lentils",
          "100g coconut milk",
          "100g mixed veggies",
          "1 tsp curry powder",
          "1 tbsp oil",
        ],
        instructions: [
          "Cook lentils in 200ml water for 20 minutes.",
          "Sauté veggies with curry powder in oil.",
          "Add coconut milk and lentils, simmer for 10 minutes.",
          "Serve with rice or naan.",
        ],
        nutritionalInfo: "Approx. 500 kcal, 15g protein, 25g fat, 55g carbs",
      },
      {
        name: "Option 3: Chicken and Avocado Salad",
        description: "A protein-packed salad for a filling dinner.",
        ingredients: [
          "150g chicken breast",
          "1 avocado",
          "50g spinach",
          "1 tbsp olive oil",
          "Lemon juice",
        ],
        instructions: [
          "Grill chicken until fully cooked.",
          "Slice avocado and toss with spinach.",
          "Add chicken, drizzle with olive oil and lemon juice.",
          "Serve fresh.",
        ],
        nutritionalInfo: "Approx. 480 kcal, 30g protein, 25g fat, 15g carbs",
      },
    ],
  },
  normal: {
    Breakfast: [
      {
        name: "Option 1: Overnight Oats",
        description: "A balanced oatmeal for a healthy start.",
        ingredients: [
          "50g oats",
          "200ml low-fat milk",
          "100g mixed berries",
          "1 tbsp chia seeds",
          "1 tsp honey",
        ],
        instructions: [
          "Mix oats, milk, and chia seeds in a jar.",
          "Refrigerate overnight.",
          "Top with berries and honey before serving.",
        ],
        nutritionalInfo: "Approx. 350 kcal, 12g protein, 10g fat, 50g carbs",
      },
      {
        name: "Option 2: Veggie Omelette",
        description: "A protein-rich breakfast with vegetables.",
        ingredients: [
          "2 eggs",
          "50g spinach",
          "1 tomato",
          "1 tbsp olive oil",
          "20g cheddar",
        ],
        instructions: [
          "Whisk eggs and pour into a heated pan with olive oil.",
          "Add spinach and diced tomato, cook for 3 minutes.",
          "Sprinkle cheddar, fold, and serve.",
        ],
        nutritionalInfo: "Approx. 300 kcal, 15g protein, 20g fat, 10g carbs",
      },
      {
        name: "Option 3: Whole-Grain Toast with Peanut Butter",
        description: "A simple, balanced breakfast option.",
        ingredients: [
          "2 slices whole-grain bread",
          "1 tbsp peanut butter",
          "1 banana",
          "1 tsp chia seeds",
        ],
        instructions: [
          "Toast bread and spread with peanut butter.",
          "Slice banana on top.",
          "Sprinkle chia seeds and serve.",
        ],
        nutritionalInfo: "Approx. 320 kcal, 10g protein, 15g fat, 40g carbs",
      },
    ],
    Brunch: [
      {
        name: "Option 1: Fruit and Yogurt Bowl",
        description: "A light, nutrient-rich brunch option.",
        ingredients: [
          "150g Greek yogurt",
          "100g mixed fruit",
          "20g granola",
          "1 tsp honey",
        ],
        instructions: [
          "Spoon yogurt into a bowl.",
          "Top with mixed fruit and granola.",
          "Drizzle with honey and serve.",
        ],
        nutritionalInfo: "Approx. 300 kcal, 12g protein, 8g fat, 45g carbs",
      },
      {
        name: "Option 2: Caprese Avocado Toast",
        description: "A balanced, flavorful brunch dish.",
        ingredients: [
          "1 slice whole-grain bread",
          "1/2 avocado",
          "50g mozzarella",
          "1 tomato",
          "1 tsp balsamic",
        ],
        instructions: [
          "Toast bread and mash avocado on top.",
          "Add sliced mozzarella and tomato.",
          "Drizzle with balsamic vinegar and serve.",
        ],
        nutritionalInfo: "Approx. 280 kcal, 10g protein, 15g fat, 25g carbs",
      },
      {
        name: "Option 3: Veggie Smoothie",
        description: "A refreshing, nutrient-packed smoothie.",
        ingredients: [
          "100g spinach",
          "1 banana",
          "200ml almond milk",
          "1 tbsp chia seeds",
          "1 tsp honey",
        ],
        instructions: [
          "Blend all ingredients until smooth.",
          "Pour into a glass and serve chilled.",
        ],
        nutritionalInfo: "Approx. 250 kcal, 8g protein, 10g fat, 35g carbs",
      },
    ],
    Lunch: [
      {
        name: "Option 1: Mediterranean Salmon Salad",
        description: "A balanced salad for a healthy lunch.",
        ingredients: [
          "150g salmon",
          "100g cherry tomatoes",
          "1 cucumber",
          "50g feta",
          "1 tbsp olive oil",
        ],
        instructions: [
          "Grill salmon for 4-5 minutes per side.",
          "Halve tomatoes and slice cucumber.",
          "Toss with feta and olive oil, top with salmon.",
          "Serve fresh.",
        ],
        nutritionalInfo: "Approx. 400 kcal, 25g protein, 20g fat, 15g carbs",
      },
      {
        name: "Option 2: Veggie Stir-Fry with Tofu",
        description: "A colorful, balanced stir-fry.",
        ingredients: [
          "100g broccoli",
          "1 bell pepper",
          "100g tofu",
          "1 tbsp soy sauce",
          "1 tsp garlic",
        ],
        instructions: [
          "Cube tofu and sauté with garlic for 5 minutes.",
          "Add broccoli and bell pepper, stir-fry for 7 minutes.",
          "Add soy sauce and serve hot.",
        ],
        nutritionalInfo: "Approx. 350 kcal, 15g protein, 15g fat, 30g carbs",
      },
      {
        name: "Option 3: Chickpea Avocado Wrap",
        description: "A fiber-rich wrap for a balanced lunch.",
        ingredients: [
          "100g chickpeas",
          "1 avocado",
          "2 tortillas",
          "50g spinach",
          "1 tbsp tahini",
        ],
        instructions: [
          "Mash avocado and mix with chickpeas.",
          "Spread tahini on tortillas, add spinach and mixture.",
          "Roll up and serve fresh.",
        ],
        nutritionalInfo: "Approx. 400 kcal, 12g protein, 18g fat, 50g carbs",
      },
    ],
    Linner: [
      {
        name: "Option 1: Hummus and Veggie Plate",
        description: "A light, balanced snack for late afternoon.",
        ingredients: [
          "2 tbsp hummus",
          "1 carrot",
          "1 cucumber",
          "1 pita bread",
          "50g cherry tomatoes",
        ],
        instructions: [
          "Slice carrot, cucumber, and tomatoes.",
          "Serve with hummus and pita bread.",
        ],
        nutritionalInfo: "Approx. 250 kcal, 8g protein, 10g fat, 35g carbs",
      },
      {
        name: "Option 2: Turkey Roll-Ups",
        description: "A protein-rich, low-carb snack.",
        ingredients: [
          "100g turkey slices",
          "1 avocado",
          "50g lettuce",
          "1 tbsp mustard",
        ],
        instructions: [
          "Mash avocado and spread on turkey slices.",
          "Add lettuce and mustard, roll up.",
          "Serve fresh.",
        ],
        nutritionalInfo: "Approx. 280 kcal, 15g protein, 15g fat, 10g carbs",
      },
      {
        name: "Option 3: Fruit and Nut Mix",
        description: "A balanced, energy-sustaining snack.",
        ingredients: [
          "20g almonds",
          "20g walnuts",
          "50g dried fruit",
          "1 apple",
        ],
        instructions: [
          "Slice apple and mix with nuts and dried fruit.",
          "Serve as a quick snack.",
        ],
        nutritionalInfo: "Approx. 300 kcal, 8g protein, 15g fat, 35g carbs",
      },
    ],
    Dinner: [
      {
        name: "Option 1: Grilled Chicken with Quinoa",
        description: "A balanced dinner for maintaining health.",
        ingredients: [
          "150g chicken breast",
          "100g quinoa",
          "100g green beans",
          "1 tbsp olive oil",
          "1 tsp rosemary",
        ],
        instructions: [
          "Grill chicken until fully cooked.",
          "Cook quinoa in 200ml water for 15 minutes.",
          "Steam green beans for 5 minutes.",
          "Combine, drizzle with olive oil, and sprinkle rosemary.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 400 kcal, 30g protein, 15g fat, 35g carbs",
      },
      {
        name: "Option 2: Lentil Veggie Soup",
        description: "A nutrient-rich soup for a light dinner.",
        ingredients: [
          "100g lentils",
          "100g carrots",
          "100g celery",
          "500ml vegetable broth",
          "1 tsp thyme",
        ],
        instructions: [
          "Cook lentils in broth for 20 minutes.",
          "Add chopped carrots, celery, and thyme, simmer for 10 minutes.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 300 kcal, 12g protein, 5g fat, 45g carbs",
      },
      {
        name: "Option 3: Baked Cod with Veggies",
        description: "A protein-rich, balanced dinner.",
        ingredients: [
          "150g cod",
          "100g asparagus",
          "1 lemon",
          "1 tbsp olive oil",
          "1 tsp garlic",
        ],
        instructions: [
          "Bake cod and asparagus at 375°F for 15-20 minutes.",
          "Drizzle with olive oil and lemon juice, sprinkle garlic.",
          "Serve hot.",
        ],
        nutritionalInfo: "Approx. 350 kcal, 25g protein, 10g fat, 15g carbs",
      },
    ],
  },
  overweight: {
    Breakfast: [
      {
        name: "Option 1: Spinach and Egg White Omelette",
        description:
          "A low-calorie, high-protein breakfast to support weight management.",
        ingredients: [
          "3 egg whites",
          "100g spinach",
          "1 tomato",
          "1 tsp olive oil",
        ],
        instructions: [
          "Whisk egg whites and pour into a heated pan with olive oil.",
          "Add spinach and diced tomato, cook for 3 minutes.",
          "Fold and serve.",
        ],
        nutritionalInfo: "Approx. 150 kcal, 12g protein, 5g fat, 10g carbs",
      },
      {
        name: "Option 2: Chia Seed Pudding",
        description: "A fiber-rich, low-calorie breakfast.",
        ingredients: [
          "2 tbsp chia seeds",
          "200ml almond milk",
          "50g berries",
          "1 tsp stevia",
        ],
        instructions: [
          "Mix chia seeds with almond milk and stevia.",
          "Refrigerate for 4 hours or overnight.",
          "Top with berries and serve.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 6g protein, 10g fat, 15g carbs",
      },
      {
        name: "Option 3: Veggie Scramble",
        description: "A low-carb, nutrient-dense breakfast.",
        ingredients: [
          "2 eggs",
          "100g zucchini",
          "50g mushrooms",
          "1 tsp olive oil",
        ],
        instructions: [
          "Sauté zucchini and mushrooms in olive oil.",
          "Whisk eggs and add to pan, scramble until cooked.",
          "Serve hot.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 12g protein, 12g fat, 10g carbs",
      },
    ],
    Brunch: [
      {
        name: "Option 1: Cucumber and Hummus Plate",
        description: "A low-calorie, fiber-rich brunch snack.",
        ingredients: [
          "2 tbsp hummus",
          "1 cucumber",
          "1 carrot",
          "50g cherry tomatoes",
        ],
        instructions: [
          "Slice cucumber, carrot, and tomatoes.",
          "Serve with hummus as a dip.",
        ],
        nutritionalInfo: "Approx. 120 kcal, 4g protein, 5g fat, 15g carbs",
      },
      {
        name: "Option 2: Apple Slices with Almond Butter",
        description: "A light, nutrient-dense brunch option.",
        ingredients: ["1 apple", "1 tbsp almond butter", "1 tsp cinnamon"],
        instructions: [
          "Slice apple into rounds.",
          "Spread almond butter and sprinkle cinnamon.",
          "Serve fresh.",
        ],
        nutritionalInfo: "Approx. 150 kcal, 4g protein, 8g fat, 20g carbs",
      },
      {
        name: "Option 3: Greek Yogurt with Berries",
        description: "A low-calorie, protein-rich brunch.",
        ingredients: [
          "100g Greek yogurt",
          "100g mixed berries",
          "1 tsp chia seeds",
        ],
        instructions: [
          "Spoon yogurt into a bowl.",
          "Top with berries and chia seeds.",
          "Serve chilled.",
        ],
        nutritionalInfo: "Approx. 140 kcal, 10g protein, 5g fat, 15g carbs",
      },
    ],
    Lunch: [
      {
        name: "Option 1: Grilled Vegetable Soup",
        description: "A low-calorie, high-fiber soup for weight management.",
        ingredients: [
          "1 zucchini",
          "2 carrots",
          "200g tomatoes",
          "500ml vegetable broth",
          "1 tsp basil",
        ],
        instructions: [
          "Roast zucchini, carrots, and tomatoes at 400°F for 20 minutes.",
          "Blend with broth and basil, simmer for 10 minutes.",
          "Serve warm.",
        ],
        nutritionalInfo: "Approx. 150 kcal, 5g protein, 2g fat, 25g carbs",
      },
      {
        name: "Option 2: Turkey Lettuce Wraps",
        description: "Low-carb, high-protein wraps for a light lunch.",
        ingredients: [
          "150g ground turkey",
          "4 lettuce leaves",
          "1 avocado",
          "1 tomato",
          "1 tsp chili powder",
        ],
        instructions: [
          "Cook turkey with chili powder until done.",
          "Slice avocado and tomato.",
          "Spoon turkey onto lettuce, top with avocado and tomato.",
          "Wrap and serve.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 20g protein, 10g fat, 10g carbs",
      },
      {
        name: "Option 3: Zucchini Noodles with Pesto",
        description: "A low-calorie pasta alternative.",
        ingredients: [
          "1 zucchini",
          "2 tbsp basil pesto",
          "50g cherry tomatoes",
          "1 tsp olive oil",
        ],
        instructions: [
          "Spiralize zucchini into noodles.",
          "Sauté noodles in olive oil for 3 minutes.",
          "Toss with pesto and tomatoes, serve.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 5g protein, 12g fat, 10g carbs",
      },
    ],
    Linner: [
      {
        name: "Option 1: Celery with Peanut Butter",
        description: "A low-calorie, satisfying snack.",
        ingredients: ["2 celery stalks", "1 tbsp peanut butter", "20g raisins"],
        instructions: [
          "Spread peanut butter on celery stalks.",
          "Top with raisins and serve.",
        ],
        nutritionalInfo: "Approx. 120 kcal, 4g protein, 8g fat, 10g carbs",
      },
      {
        name: "Option 2: Veggie Sticks with Guacamole",
        description: "A fiber-rich, low-calorie snack.",
        ingredients: [
          "1 carrot",
          "1 cucumber",
          "1/2 avocado",
          "1 tsp lemon juice",
        ],
        instructions: [
          "Mash avocado with lemon juice to make guacamole.",
          "Slice carrot and cucumber into sticks.",
          "Serve with guacamole.",
        ],
        nutritionalInfo: "Approx. 140 kcal, 3g protein, 8g fat, 15g carbs",
      },
      {
        name: "Option 3: Hard-Boiled Egg with Veggies",
        description: "A protein-rich, low-calorie snack.",
        ingredients: ["1 egg", "50g cherry tomatoes", "50g cucumber"],
        instructions: [
          "Boil egg for 10 minutes, peel, and slice.",
          "Serve with sliced tomatoes and cucumber.",
        ],
        nutritionalInfo: "Approx. 100 kcal, 6g protein, 5g fat, 8g carbs",
      },
    ],
    Dinner: [
      {
        name: "Option 1: Baked Cod with Asparagus",
        description: "A low-calorie, high-protein dinner.",
        ingredients: [
          "150g cod",
          "100g asparagus",
          "1 lemon",
          "1 tsp olive oil",
          "1 tsp garlic",
        ],
        instructions: [
          "Bake cod and asparagus at 375°F for 15-20 minutes.",
          "Drizzle with olive oil and lemon juice, sprinkle garlic.",
          "Serve hot.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 20g protein, 8g fat, 10g carbs",
      },
      {
        name: "Option 2: Kale and Lentil Salad",
        description: "A fiber-rich, low-calorie salad.",
        ingredients: [
          "100g kale",
          "100g lentils",
          "1 cucumber",
          "1 tbsp lemon juice",
          "1 tsp olive oil",
        ],
        instructions: [
          "Massage kale with lemon juice to soften.",
          "Mix with cooked lentils and sliced cucumber.",
          "Drizzle with olive oil and serve.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 8g protein, 5g fat, 25g carbs",
      },
      {
        name: "Option 3: Grilled Chicken Salad",
        description: "A low-calorie, protein-packed dinner.",
        ingredients: [
          "150g chicken breast",
          "100g mixed greens",
          "1 tomato",
          "1 tbsp olive oil",
        ],
        instructions: [
          "Grill chicken until fully cooked.",
          "Toss greens and sliced tomato with olive oil.",
          "Top with chicken and serve.",
        ],
        nutritionalInfo: "Approx. 220 kcal, 25g protein, 10g fat, 10g carbs",
      },
    ],
  },
  obese: {
    Breakfast: [
      {
        name: "Option 1: Egg White Veggie Scramble",
        description: "A low-calorie, high-protein breakfast for weight loss.",
        ingredients: [
          "3 egg whites",
          "100g spinach",
          "50g mushrooms",
          "1 tsp olive oil",
        ],
        instructions: [
          "Sauté spinach and mushrooms in olive oil.",
          "Add whisked egg whites, scramble until cooked.",
          "Serve hot.",
        ],
        nutritionalInfo: "Approx. 120 kcal, 10g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 2: Green Smoothie",
        description: "A low-calorie, nutrient-dense smoothie.",
        ingredients: [
          "100g spinach",
          "1/2 banana",
          "200ml almond milk",
          "1 tsp chia seeds",
        ],
        instructions: ["Blend all ingredients until smooth.", "Serve chilled."],
        nutritionalInfo: "Approx. 100 kcal, 5g protein, 5g fat, 15g carbs",
      },
      {
        name: "Option 3: Cottage Cheese with Berries",
        description: "A high-protein, low-calorie breakfast.",
        ingredients: [
          "100g low-fat cottage cheese",
          "100g berries",
          "1 tsp stevia",
        ],
        instructions: [
          "Spoon cottage cheese into a bowl.",
          "Top with berries and stevia.",
          "Serve chilled.",
        ],
        nutritionalInfo: "Approx. 130 kcal, 12g protein, 2g fat, 15g carbs",
      },
    ],
    Brunch: [
      {
        name: "Option 1: Veggie Sticks with Hummus",
        description: "A low-calorie, fiber-rich snack.",
        ingredients: ["1 carrot", "1 cucumber", "2 tbsp hummus"],
        instructions: [
          "Slice carrot and cucumber into sticks.",
          "Serve with hummus.",
        ],
        nutritionalInfo: "Approx. 100 kcal, 4g protein, 5g fat, 12g carbs",
      },
      {
        name: "Option 2: Tomato and Cucumber Salad",
        description: "A light, refreshing brunch salad.",
        ingredients: [
          "100g cherry tomatoes",
          "1 cucumber",
          "1 tsp olive oil",
          "1 tsp lemon juice",
        ],
        instructions: [
          "Halve tomatoes and slice cucumber.",
          "Toss with olive oil and lemon juice.",
          "Serve fresh.",
        ],
        nutritionalInfo: "Approx. 80 kcal, 2g protein, 5g fat, 10g carbs",
      },
      {
        name: "Option 3: Celery with Almond Butter",
        description: "A low-calorie, satisfying snack.",
        ingredients: ["2 celery stalks", "1 tbsp almond butter"],
        instructions: [
          "Spread almond butter on celery stalks.",
          "Serve fresh.",
        ],
        nutritionalInfo: "Approx. 100 kcal, 3g protein, 8g fat, 8g carbs",
      },
    ],
    Lunch: [
      {
        name: "Option 1: Grilled Chicken Salad",
        description: "A low-calorie, protein-rich lunch for weight loss.",
        ingredients: [
          "150g chicken breast",
          "100g mixed greens",
          "1 tomato",
          "1 tbsp balsamic vinegar",
        ],
        instructions: [
          "Grill chicken until fully cooked.",
          "Toss greens and sliced tomato with balsamic vinegar.",
          "Top with chicken and serve.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 25g protein, 5g fat, 10g carbs",
      },
      {
        name: "Option 2: Spiced Cauliflower Rice",
        description: "A low-carb, flavorful lunch option.",
        ingredients: [
          "1 cauliflower head",
          "1 tsp turmeric",
          "1 tsp cumin",
          "50g peas",
          "1 tsp olive oil",
        ],
        instructions: [
          "Pulse cauliflower in a food processor to make rice.",
          "Sauté with olive oil, turmeric, and cumin for 5 minutes.",
          "Add peas and cook for 3 minutes.",
          "Serve hot.",
        ],
        nutritionalInfo: "Approx. 150 kcal, 5g protein, 4g fat, 20g carbs",
      },
      {
        name: "Option 3: Zucchini Noodles with Marinara",
        description: "A low-calorie, nutrient-dense lunch.",
        ingredients: [
          "1 zucchini",
          "100g marinara sauce",
          "50g cherry tomatoes",
          "1 tsp olive oil",
        ],
        instructions: [
          "Spiralize zucchini into noodles.",
          "Sauté noodles in olive oil for 3 minutes.",
          "Toss with marinara and tomatoes, serve.",
        ],
        nutritionalInfo: "Approx. 140 kcal, 4g protein, 5g fat, 15g carbs",
      },
    ],
    Linner: [
      {
        name: "Option 1: Hard-Boiled Egg with Veggies",
        description: "A protein-rich, low-calorie snack.",
        ingredients: ["1 egg", "50g cherry tomatoes", "50g cucumber"],
        instructions: [
          "Boil egg for 10 minutes, peel, and slice.",
          "Serve with sliced tomatoes and cucumber.",
        ],
        nutritionalInfo: "Approx. 100 kcal, 6g protein, 5g fat, 8g carbs",
      },
      {
        name: "Option 2: Veggie Sticks with Guacamole",
        description: "A fiber-rich, low-calorie snack.",
        ingredients: [
          "1 carrot",
          "1 cucumber",
          "1/2 avocado",
          "1 tsp lemon juice",
        ],
        instructions: [
          "Mash avocado with lemon juice to make guacamole.",
          "Slice carrot and cucumber into sticks.",
          "Serve with guacamole.",
        ],
        nutritionalInfo: "Approx. 140 kcal, 3g protein, 8g fat, 15g carbs",
      },
      {
        name: "Option 3: Bell Pepper Slices with Hummus",
        description: "A low-calorie, nutrient-dense snack.",
        ingredients: ["1 bell pepper", "2 tbsp hummus"],
        instructions: [
          "Slice bell pepper into strips.",
          "Serve with hummus as a dip.",
        ],
        nutritionalInfo: "Approx. 90 kcal, 3g protein, 4g fat, 12g carbs",
      },
    ],
    Dinner: [
      {
        name: "Option 1: Baked Cod with Asparagus",
        description: "A low-calorie, high-protein dinner for weight loss.",
        ingredients: [
          "150g cod",
          "100g asparagus",
          "1 lemon",
          "1 tsp olive oil",
          "1 tsp garlic",
        ],
        instructions: [
          "Bake cod and asparagus at 375°F for 15-20 minutes.",
          "Drizzle with olive oil and lemon juice, sprinkle garlic.",
          "Serve hot.",
        ],
        nutritionalInfo: "Approx. 200 kcal, 20g protein, 8g fat, 10g carbs",
      },
      {
        name: "Option 2: Kale and Lentil Salad",
        description: "A fiber-rich, low-calorie salad for weight management.",
        ingredients: [
          "100g kale",
          "100g lentils",
          "1 cucumber",
          "1 tbsp lemon juice",
          "1 tsp olive oil",
        ],
        instructions: [
          "Massage kale with lemon juice to soften.",
          "Mix with cooked lentils and sliced cucumber.",
          "Drizzle with olive oil and serve.",
        ],
        nutritionalInfo: "Approx. 180 kcal, 8g protein, 5g fat, 25g carbs",
      },
      {
        name: "Option 3: Grilled Turkey with Broccoli",
        description: "A low-calorie, protein-packed dinner.",
        ingredients: [
          "150g turkey breast",
          "100g broccoli",
          "1 tsp olive oil",
          "1 tsp garlic",
        ],
        instructions: [
          "Grill turkey until fully cooked.",
          "Steam broccoli for 5 minutes.",
          "Drizzle with olive oil and garlic, serve hot.",
        ],
        nutritionalInfo: "Approx. 210 kcal, 25g protein, 8g fat, 10g carbs",
      },
    ],
  },
};

export default function HealthyRecipeSuggestions() {
  const { bmi } = useBmi();
  const [bmiError, setBmiError] = useState(true);
  const { theme } = useTheme();
  const router = useRouter();
  const { auth } = useAuth();
  const [bmiCategory, setBmiCategory] = useState("");
  const [recipes, setRecipes] = useState({});
  const [showRecipes, setShowRecipes] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  // Validate BMI input
  useEffect(() => {
    if (bmi == 0) {
      setBmiError(true);
    } else {
      setBmiError(false);
    }
  }, [bmi]);

  // Determine BMI category and load recipes
  useEffect(() => {
    if (!bmiError) {
      let category = "";
      if (bmi < 18.5) {
        category = "underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        category = "normal";
      } else if (bmi >= 25 && bmi < 30) {
        category = "overweight";
      } else {
        category = "obese";
      }
      setBmiCategory(category.charAt(0).toUpperCase() + category.slice(1));
      setRecipes(mockRecipes[category] || {});
      setShowRecipes(true);
    }
  }, [bmi, bmiError]);

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
              Based on your BMI of <span className="font-bold">{bmi}</span> (
              {bmiCategory}), here are healthy recipes tailored to your health
              needs.
            </div>
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
                          <span className="font-bold">Nutritional Info:</span>{" "}
                          {recipe.nutritionalInfo}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
