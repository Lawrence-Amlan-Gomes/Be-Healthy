"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useBmi } from "@/app/hooks/useBmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateWorkout } from "@/app/actions";

// Mock workout plan data
const mockWorkouts = [
  // Underweight (BMI < 18.5)
  {
    bmiRange: "Underweight",
    stream: "6-day",
    title: "Muscle Gain Focus",
    description:
      "A 6-day plan to promote muscle growth for underweight individuals.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Squats",
            sets: 4,
            reps: 12,
            notes: "Use moderate weight, focus on form.",
          },
          {
            name: "Bench Press",
            sets: 4,
            reps: 10,
            notes: "Control the descent.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Deadlifts",
            sets: 4,
            reps: 8,
            notes: "Maintain neutral spine.",
          },
          {
            name: "Pull-ups",
            sets: 3,
            reps: 8,
            notes: "Use assisted band if needed.",
          },
        ],
      },
      {
        day: "Monday",
        exercises: [
          {
            name: "Lunges",
            sets: 3,
            reps: 12,
            notes: "Step forward with control.",
          },
          {
            name: "Shoulder Press",
            sets: 3,
            reps: 10,
            notes: "Use moderate weight.",
          },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Leg Press",
            sets: 3,
            reps: 12,
            notes: "Adjust seat for comfort.",
          },
          {
            name: "Bicep Curls",
            sets: 3,
            reps: 12,
            notes: "Avoid swinging weights.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Incline Bench Press",
            sets: 3,
            reps: 10,
            notes: "Use incline bench.",
          },
          {
            name: "Bent-over Rows",
            sets: 3,
            reps: 12,
            notes: "Keep elbows close.",
          },
        ],
      },
      {
        day: "Thursday",
        exercises: [
          { name: "Deadlifts", sets: 3, reps: 8, notes: "Focus on form." },
          {
            name: "Tricep Dips",
            sets: 3,
            reps: 10,
            notes: "Use parallel bars.",
          },
        ],
      },
    ],
    benefits:
      "Promotes muscle gain, increases strength, and supports healthy weight gain.",
  },
  {
    bmiRange: "Underweight",
    stream: "6-day",
    title: "Strength and Endurance",
    description:
      "A 6-day plan combining strength and endurance for underweight individuals.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Goblet Squats",
            sets: 3,
            reps: 15,
            notes: "Hold dumbbell at chest.",
          },
          {
            name: "Push-ups",
            sets: 4,
            reps: 15,
            notes: "Modify on knees if needed.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Romanian Deadlifts",
            sets: 3,
            reps: 10,
            notes: "Focus on hamstrings.",
          },
          { name: "Chin-ups", sets: 3, reps: 8, notes: "Palms facing you." },
        ],
      },
      {
        day: "Monday",
        exercises: [
          {
            name: "Step-ups",
            sets: 3,
            reps: 12,
            notes: "Use bench or platform.",
          },
          { name: "Overhead Press", sets: 3, reps: 10, notes: "Engage core." },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Bulgarian Split Squats",
            sets: 3,
            reps: 10,
            notes: "Use dumbbells.",
          },
          {
            name: "Dumbbell Rows",
            sets: 3,
            reps: 12,
            notes: "Keep back flat.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          { name: "Plank", sets: 3, reps: "45s", notes: "Keep core tight." },
          {
            name: "Tricep Pushdowns",
            sets: 3,
            reps: 12,
            notes: "Use cable machine.",
          },
        ],
      },
      {
        day: "Thursday",
        exercises: [
          {
            name: "Leg Press",
            sets: 3,
            reps: 12,
            notes: "Use moderate weight.",
          },
          { name: "Pull-ups", sets: 3, reps: 8, notes: "Use wide grip." },
        ],
      },
    ],
    benefits:
      "Builds muscle mass, enhances endurance, and supports strength development.",
  },
  {
    bmiRange: "Underweight",
    stream: "5-day",
    title: "Balanced Muscle Gain",
    description: "A 5-day plan to build muscle for underweight individuals.",
    days: [
      {
        day: "Saturday",
        exercises: [
          { name: "Squats", sets: 4, reps: 12, notes: "Use moderate weight." },
          { name: "Push-ups", sets: 3, reps: 15, notes: "Keep core engaged." },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Deadlifts",
            sets: 3,
            reps: 10,
            notes: "Maintain neutral spine.",
          },
          { name: "Pull-ups", sets: 3, reps: 8, notes: "Use assisted band." },
        ],
      },
      {
        day: "Monday",
        exercises: [
          {
            name: "Bench Press",
            sets: 3,
            reps: 10,
            notes: "Control the descent.",
          },
          {
            name: "Bent-over Rows",
            sets: 3,
            reps: 12,
            notes: "Keep elbows close.",
          },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          { name: "Lunges", sets: 3, reps: 12, notes: "Alternate legs." },
          {
            name: "Shoulder Press",
            sets: 3,
            reps: 10,
            notes: "Use dumbbells.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          { name: "Leg Press", sets: 3, reps: 12, notes: "Adjust weight." },
          {
            name: "Tricep Dips",
            sets: 3,
            reps: 10,
            notes: "Use bench or bars.",
          },
        ],
      },
    ],
    benefits:
      "Supports muscle growth, improves strength, and enhances overall fitness.",
  },
  {
    bmiRange: "Underweight",
    stream: "5-day",
    title: "High-Calorie Strength",
    description:
      "A 5-day plan to maximize strength for underweight individuals.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Barbell Squat",
            sets: 4,
            reps: 8,
            notes: "Use heavy weight, focus on depth.",
          },
          {
            name: "Incline Bench Press",
            sets: 3,
            reps: 10,
            notes: "Use incline bench.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          { name: "Deadlifts", sets: 4, reps: 6, notes: "Use proper form." },
          { name: "Chin-ups", sets: 3, reps: 8, notes: "Palms facing you." },
        ],
      },
      {
        day: "Monday",
        exercises: [
          {
            name: "Front Squats",
            sets: 3,
            reps: 8,
            notes: "Keep elbows high.",
          },
          { name: "Overhead Press", sets: 3, reps: 10, notes: "Engage core." },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Dumbbell Rows",
            sets: 3,
            reps: 12,
            notes: "Keep back flat.",
          },
          {
            name: "Bicep Curls",
            sets: 3,
            reps: 12,
            notes: "Control movement.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Leg Press",
            sets: 3,
            reps: 12,
            notes: "Use moderate weight.",
          },
          {
            name: "Tricep Pushdowns",
            sets: 3,
            reps: 12,
            notes: "Use cable machine.",
          },
        ],
      },
    ],
    benefits:
      "Maximizes strength, promotes muscle gain, and supports healthy weight gain.",
  },
  // Normal (BMI 18.5–24.9)
  {
    bmiRange: "Normal",
    stream: "6-day",
    title: "Balanced Fitness",
    description: "A 6-day plan for maintaining fitness and strength.",
    days: [
      {
        day: "Saturday",
        exercises: [
          { name: "Squats", sets: 3, reps: 12, notes: "Use moderate weight." },
          { name: "Push-ups", sets: 3, reps: 15, notes: "Keep core engaged." },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Deadlifts",
            sets: 3,
            reps: 10,
            notes: "Maintain neutral spine.",
          },
          { name: "Pull-ups", sets: 3, reps: 8, notes: "Use assisted band." },
        ],
      },
      {
        day: "Monday",
        exercises: [
          { name: "Lunges", sets: 3, reps: 12, notes: "Alternate legs." },
          {
            name: "Shoulder Press",
            sets: 3,
            reps: 10,
            notes: "Use dumbbells.",
          },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          { name: "Plank", sets: 3, reps: "30s", notes: "Keep core tight." },
          { name: "Bicep Curls", sets: 3, reps: 12, notes: "Avoid swinging." },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          { name: "Leg Press", sets: 3, reps: 12, notes: "Adjust weight." },
          {
            name: "Tricep Dips",
            sets: 3,
            reps: 10,
            notes: "Use bench or bars.",
          },
        ],
      },
      {
        day: "Thursday",
        exercises: [
          {
            name: "Kettlebell Swings",
            sets: 3,
            reps: 15,
            notes: "Use hips for power.",
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: 20,
            notes: "Use light weight.",
          },
        ],
      },
    ],
    benefits: "Maintains fitness, improves strength, and enhances endurance.",
  },
  {
    bmiRange: "Normal",
    stream: "6-day",
    title: "HIIT and Strength",
    description:
      "A 6-day plan combining HIIT and strength for balanced fitness.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Burpees",
            sets: 4,
            reps: 15,
            notes: "Push for speed and form.",
          },
          {
            name: "Mountain Climbers",
            sets: 3,
            reps: "30s",
            notes: "Keep core engaged.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          { name: "Jump Squats", sets: 3, reps: 12, notes: "Land softly." },
          { name: "Push-ups", sets: 3, reps: 15, notes: "Modify if needed." },
        ],
      },
      {
        day: "Monday",
        exercises: [
          {
            name: "Kettlebell Swings",
            sets: 3,
            reps: 15,
            notes: "Use hips for motion.",
          },
          {
            name: "Plank Jacks",
            sets: 3,
            reps: "30s",
            notes: "Maintain stable core.",
          },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Box Jumps",
            sets: 3,
            reps: 12,
            notes: "Use sturdy platform.",
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: 20,
            notes: "Use light weight.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Sprint Intervals",
            sets: 5,
            reps: "20s on, 40s off",
            notes: "Max effort.",
          },
          {
            name: "Side Plank",
            sets: 3,
            reps: "30s/side",
            notes: "Keep hips lifted.",
          },
        ],
      },
      {
        day: "Thursday",
        exercises: [
          {
            name: "High Knees",
            sets: 3,
            reps: "30s",
            notes: "Drive knees up.",
          },
          {
            name: "Tricep Push-ups",
            sets: 3,
            reps: 12,
            notes: "Keep elbows tucked.",
          },
        ],
      },
    ],
    benefits:
      "Improves cardiovascular health, builds strength, and enhances stamina.",
  },
  {
    bmiRange: "Normal",
    stream: "5-day",
    title: "Core and Cardio",
    description: "A 5-day plan emphasizing core strength and cardio fitness.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Jump Rope",
            sets: 3,
            reps: "1min",
            notes: "Maintain steady pace.",
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: 20,
            notes: "Use light weight.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Bicycle Crunches",
            sets: 3,
            reps: 15,
            notes: "Alternate sides smoothly.",
          },
          {
            name: "High Knees",
            sets: 3,
            reps: "30s",
            notes: "Drive knees high.",
          },
        ],
      },
      {
        day: "Monday",
        exercises: [
          { name: "Burpees", sets: 3, reps: 12, notes: "Push for intensity." },
          { name: "Plank", sets: 3, reps: "30s", notes: "Keep body straight." },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Mountain Climbers",
            sets: 3,
            reps: "30s",
            notes: "Engage core.",
          },
          {
            name: "Leg Raises",
            sets: 3,
            reps: 15,
            notes: "Lower legs slowly.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Sprint Intervals",
            sets: 5,
            reps: "20s on, 40s off",
            notes: "Max effort.",
          },
          {
            name: "Side Plank",
            sets: 3,
            reps: "30s/side",
            notes: "Keep hips lifted.",
          },
        ],
      },
    ],
    benefits:
      "Enhances core strength, improves cardio fitness, and boosts endurance.",
  },
  {
    bmiRange: "Normal",
    stream: "5-day",
    title: "Functional Fitness",
    description:
      "A 5-day plan focusing on functional movements for daily life.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Farmer’s Carry",
            sets: 3,
            reps: "30s",
            notes: "Use heavy dumbbells.",
          },
          { name: "Push-ups", sets: 3, reps: 12, notes: "Engage core." },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Kettlebell Swings",
            sets: 3,
            reps: 15,
            notes: "Use hips for power.",
          },
          {
            name: "Plank with Shoulder Tap",
            sets: 3,
            reps: "30s",
            notes: "Minimize hip movement.",
          },
        ],
      },
      {
        day: "Monday",
        exercises: [
          {
            name: "Goblet Squats",
            sets: 3,
            reps: 12,
            notes: "Hold dumbbell at chest.",
          },
          {
            name: "Single-leg Deadlifts",
            sets: 3,
            reps: 10,
            notes: "Balance on one leg.",
          },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Medicine Ball Slams",
            sets: 3,
            reps: 15,
            notes: "Use full body motion.",
          },
          {
            name: "Side Lunges",
            sets: 3,
            reps: 12,
            notes: "Keep toes forward.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Box Step-ups",
            sets: 3,
            reps: 12,
            notes: "Use moderate height box.",
          },
          { name: "Plank", sets: 3, reps: "30s", notes: "Keep body aligned." },
        ],
      },
    ],
    benefits:
      "Enhances functional strength, improves balance, and supports daily activities.",
  },
  // Overweight (BMI 25–29.9)
  {
    bmiRange: "Overweight",
    stream: "6-day",
    title: "Fat Loss and Strength",
    description: "A 6-day plan to promote fat loss and build strength.",
    days: [
      {
        day: "Saturday",
        exercises: [
          { name: "Burpees", sets: 4, reps: 12, notes: "Push for intensity." },
          {
            name: "Kettlebell Swings",
            sets: 3,
            reps: 15,
            notes: "Use hips for power.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          { name: "Jump Squats", sets: 3, reps: 12, notes: "Land softly." },
          {
            name: "Push-ups",
            sets: 3,
            reps: 15,
            notes: "Modify on knees if needed.",
          },
        ],
      },
      {
        day: "Monday",
        exercises: [
          {
            name: "Mountain Climbers",
            sets: 3,
            reps: "30s",
            notes: "Engage core.",
          },
          { name: "Plank", sets: 3, reps: "30s", notes: "Keep body straight." },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Box Jumps",
            sets: 3,
            reps: 10,
            notes: "Use sturdy platform.",
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: 20,
            notes: "Use light weight.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Sprint Intervals",
            sets: 5,
            reps: "20s on, 40s off",
            notes: "Max effort.",
          },
          {
            name: "Side Plank",
            sets: 3,
            reps: "30s/side",
            notes: "Keep hips lifted.",
          },
        ],
      },
      {
        day: "Thursday",
        exercises: [
          {
            name: "High Knees",
            sets: 3,
            reps: "30s",
            notes: "Drive knees up.",
          },
          {
            name: "Tricep Push-ups",
            sets: 3,
            reps: 12,
            notes: "Keep elbows tucked.",
          },
        ],
      },
    ],
    benefits:
      "Promotes fat loss, builds strength, and improves cardiovascular health.",
  },
  {
    bmiRange: "Overweight",
    stream: "6-day",
    title: "Cardio and Core",
    description:
      "A 6-day plan focusing on cardio and core strength for fat loss.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Jump Rope",
            sets: 3,
            reps: "1min",
            notes: "Maintain steady pace.",
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: 20,
            notes: "Use light weight.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Bicycle Crunches",
            sets: 3,
            reps: 15,
            notes: "Alternate sides smoothly.",
          },
          {
            name: "High Knees",
            sets: 3,
            reps: "30s",
            notes: "Drive knees high.",
          },
        ],
      },
      {
        day: "Monday",
        exercises: [
          { name: "Burpees", sets: 3, reps: 12, notes: "Push for intensity." },
          { name: "Plank", sets: 3, reps: "30s", notes: "Keep body straight." },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Mountain Climbers",
            sets: 3,
            reps: "30s",
            notes: "Engage core.",
          },
          {
            name: "Leg Raises",
            sets: 3,
            reps: 15,
            notes: "Lower legs slowly.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Sprint Intervals",
            sets: 5,
            reps: "20s on, 40s off",
            notes: "Max effort.",
          },
          {
            name: "Side Plank",
            sets: 3,
            reps: "30s/side",
            notes: "Keep hips lifted.",
          },
        ],
      },
      {
        day: "Thursday",
        exercises: [
          { name: "Box Jumps", sets: 3, reps: 10, notes: "Use low platform." },
          {
            name: "Plank Jacks",
            sets: 3,
            reps: "30s",
            notes: "Maintain stable core.",
          },
        ],
      },
    ],
    benefits:
      "Enhances fat burning, strengthens core, and improves cardio fitness.",
  },
  {
    bmiRange: "Overweight",
    stream: "5-day",
    title: "HIIT for Fat Loss",
    description: "A 5-day HIIT plan to maximize fat loss.",
    days: [
      {
        day: "Saturday",
        exercises: [
          { name: "Burpees", sets: 4, reps: 12, notes: "Push for intensity." },
          {
            name: "Mountain Climbers",
            sets: 3,
            reps: "30s",
            notes: "Engage core.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          { name: "Jump Squats", sets: 3, reps: 12, notes: "Land softly." },
          { name: "Push-ups", sets: 3, reps: 15, notes: "Modify if needed." },
        ],
      },
      {
        day: "Monday",
        exercises: [
          {
            name: "Kettlebell Swings",
            sets: 3,
            reps: 15,
            notes: "Use hips for motion.",
          },
          {
            name: "Plank Jacks",
            sets: 3,
            reps: "30s",
            notes: "Maintain stable core.",
          },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Box Jumps",
            sets: 3,
            reps: 10,
            notes: "Use sturdy platform.",
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: 20,
            notes: "Use light weight.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Sprint Intervals",
            sets: 5,
            reps: "20s on, 40s off",
            notes: "Max effort.",
          },
          {
            name: "Side Plank",
            sets: 3,
            reps: "30s/side",
            notes: "Keep hips lifted.",
          },
        ],
      },
    ],
    benefits:
      "Maximizes calorie burn, improves stamina, and supports fat loss.",
  },
  {
    bmiRange: "Overweight",
    stream: "5-day",
    title: "Low-Impact Strength",
    description: "A 5-day low-impact plan for strength and fat loss.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Bodyweight Squats",
            sets: 3,
            reps: 15,
            notes: "Focus on form.",
          },
          { name: "Push-ups", sets: 3, reps: 12, notes: "Modify on knees." },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Step-ups",
            sets: 3,
            reps: 12,
            notes: "Use bench or platform.",
          },
          { name: "Plank", sets: 3, reps: "30s", notes: "Keep core tight." },
        ],
      },
      {
        day: "Monday",
        exercises: [
          { name: "Lunges", sets: 3, reps: 12, notes: "Alternate legs." },
          {
            name: "Dumbbell Rows",
            sets: 3,
            reps: 12,
            notes: "Keep back flat.",
          },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Goblet Squats",
            sets: 3,
            reps: 12,
            notes: "Hold dumbbell at chest.",
          },
          { name: "Tricep Dips", sets: 3, reps: 10, notes: "Use bench." },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Side Lunges",
            sets: 3,
            reps: 12,
            notes: "Keep toes forward.",
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: 20,
            notes: "Use light weight.",
          },
        ],
      },
    ],
    benefits: "Builds strength, supports fat loss, and is joint-friendly.",
  },
  // Obese (BMI ≥ 30)
  {
    bmiRange: "Obese",
    stream: "6-day",
    title: "Low-Impact Cardio",
    description:
      "A 6-day low-impact plan to improve cardio fitness for obese individuals.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Walking",
            sets: 1,
            reps: "20min",
            notes: "Maintain brisk pace.",
          },
          {
            name: "Seated Leg Extensions",
            sets: 3,
            reps: 15,
            notes: "Use body weight.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Stationary Cycling",
            sets: 1,
            reps: "15min",
            notes: "Moderate intensity.",
          },
          {
            name: "Seated Arm Circles",
            sets: 3,
            reps: 20,
            notes: "Use light weights if possible.",
          },
        ],
      },
      {
        day: "Monday",
        exercises: [
          {
            name: "Chair Squats",
            sets: 3,
            reps: 12,
            notes: "Lower slowly to chair.",
          },
          {
            name: "Plank",
            sets: 3,
            reps: "20s",
            notes: "Modify on knees if needed.",
          },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Water Aerobics",
            sets: 1,
            reps: "20min",
            notes: "Low-impact movements.",
          },
          {
            name: "Seated Russian Twists",
            sets: 3,
            reps: 15,
            notes: "Use light weight.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "Step-ups",
            sets: 3,
            reps: 10,
            notes: "Use low step or bench.",
          },
          {
            name: "Side Plank",
            sets: 3,
            reps: "15s/side",
            notes: "Modify as needed.",
          },
        ],
      },
      {
        day: "Thursday",
        exercises: [
          {
            name: "Walking",
            sets: 1,
            reps: "20min",
            notes: "Brisk pace, flat surface.",
          },
          {
            name: "Seated Bicep Curls",
            sets: 3,
            reps: 12,
            notes: "Use light dumbbells.",
          },
        ],
      },
    ],
    benefits:
      "Improves cardiovascular health, builds light strength, and is joint-friendly.",
  },
  {
    bmiRange: "Obese",
    stream: "6-day",
    title: "Mobility and Strength",
    description: "A 6-day plan to enhance mobility and build strength safely.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Chair Squats",
            sets: 3,
            reps: 12,
            notes: "Lower slowly to chair.",
          },
          {
            name: "Seated Push-ups",
            sets: 3,
            reps: 10,
            notes: "Use sturdy surface.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Seated Leg Extensions",
            sets: 3,
            reps: 15,
            notes: "Use body weight.",
          },
          {
            name: "Seated Arm Circles",
            sets: 3,
            reps: 20,
            notes: "Use light weights.",
          },
        ],
      },
      {
        day: "Monday",
        exercises: [
          { name: "Step-ups", sets: 3, reps: 10, notes: "Use low step." },
          { name: "Plank", sets: 3, reps: "20s", notes: "Modify on knees." },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Water Aerobics",
            sets: 1,
            reps: "20min",
            notes: "Low-impact movements.",
          },
          {
            name: "Seated Russian Twists",
            sets: 3,
            reps: 15,
            notes: "Use light weight.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          { name: "Walking", sets: 1, reps: "20min", notes: "Brisk pace." },
          {
            name: "Seated Bicep Curls",
            sets: 3,
            reps: 12,
            notes: "Use light dumbbells.",
          },
        ],
      },
      {
        day: "Thursday",
        exercises: [
          {
            name: "Chair Lunges",
            sets: 3,
            reps: 10,
            notes: "Hold chair for support.",
          },
          {
            name: "Side Plank",
            sets: 3,
            reps: "15s/side",
            notes: "Modify as needed.",
          },
        ],
      },
    ],
    benefits:
      "Enhances mobility, builds light strength, and supports weight loss.",
  },
  {
    bmiRange: "Obese",
    stream: "5-day",
    title: "Gentle Cardio",
    description: "A 5-day low-impact cardio plan for obese individuals.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Walking",
            sets: 1,
            reps: "15min",
            notes: "Maintain brisk pace.",
          },
          {
            name: "Seated Leg Extensions",
            sets: 3,
            reps: 15,
            notes: "Use body weight.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Stationary Cycling",
            sets: 1,
            reps: "15min",
            notes: "Moderate intensity.",
          },
          {
            name: "Seated Arm Circles",
            sets: 3,
            reps: 20,
            notes: "Use light weights.",
          },
        ],
      },
      {
        day: "Monday",
        exercises: [
          {
            name: "Chair Squats",
            sets: 3,
            reps: 12,
            notes: "Lower slowly to chair.",
          },
          { name: "Plank", sets: 3, reps: "20s", notes: "Modify on knees." },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Water Aerobics",
            sets: 1,
            reps: "15min",
            notes: "Low-impact movements.",
          },
          {
            name: "Seated Russian Twists",
            sets: 3,
            reps: 15,
            notes: "Use light weight.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          { name: "Step-ups", sets: 3, reps: 10, notes: "Use low step." },
          {
            name: "Side Plank",
            sets: 3,
            reps: "15s/side",
            notes: "Modify as needed.",
          },
        ],
      },
    ],
    benefits:
      "Improves cardio fitness, builds light strength, and is joint-friendly.",
  },
  {
    bmiRange: "Obese",
    stream: "5-day",
    title: "Beginner Strength",
    description: "A 5-day plan to build strength safely for obese individuals.",
    days: [
      {
        day: "Saturday",
        exercises: [
          {
            name: "Chair Squats",
            sets: 3,
            reps: 12,
            notes: "Lower slowly to chair.",
          },
          {
            name: "Seated Push-ups",
            sets: 3,
            reps: 10,
            notes: "Use sturdy surface.",
          },
        ],
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Seated Leg Extensions",
            sets: 3,
            reps: 15,
            notes: "Use body weight.",
          },
          {
            name: "Seated Arm Circles",
            sets: 3,
            reps: 20,
            notes: "Use light weights.",
          },
        ],
      },
      {
        day: "Monday",
        exercises: [
          { name: "Step-ups", sets: 3, reps: 10, notes: "Use low step." },
          { name: "Plank", sets: 3, reps: "20s", notes: "Modify on knees." },
        ],
      },
      {
        day: "Tuesday",
        exercises: [
          {
            name: "Chair Lunges",
            sets: 3,
            reps: 10,
            notes: "Hold chair for support.",
          },
          {
            name: "Seated Russian Twists",
            sets: 3,
            reps: 15,
            notes: "Use light weight.",
          },
        ],
      },
      {
        day: "Wednesday",
        exercises: [
          { name: "Walking", sets: 1, reps: "15min", notes: "Brisk pace." },
          {
            name: "Seated Bicep Curls",
            sets: 3,
            reps: 12,
            notes: "Use light dumbbells.",
          },
        ],
      },
    ],
    benefits:
      "Builds strength, improves mobility, and supports weight loss safely.",
  },
];

  // Helper function to determine BMI range
  const getBmiRange = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "Normal";
    if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    return "Obese";
  };


export default function WorkOut() {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const router = useRouter();
  const [bmiError, setBmiError] = useState(true);
  const [bmiCategory, setBmiCategory] = useState("");
  const [workouts, setWorkouts] = useState(mockWorkouts);
  const [groupedWorkouts, setGroupedWorkouts] = useState({});
  const [showWorkouts, setShowWorkouts] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [isSelecting, setIsSelecting] = useState(true);
  const [updateStatus, setUpdateStatus] = useState("");
  const [buttonState, setButtonState] = useState("default"); // default, updating, success

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);


  // Validate BMI input and initialize states
  useEffect(() => {
    if (auth) {
      if (auth.bmi == 0) {
        setBmiError(true);
      } else {
        setBmiError(false);
        const category = getBmiRange(auth.bmi);
        setBmiCategory(category.charAt(0).toUpperCase() + category.slice(1));
        setShowWorkouts(true);
        setWorkout(auth.workout?.length > 0 ? auth.workout[0] : null);
        setIsSelecting(!auth.workout?.length || !auth.workout[0]?.title);
      }
    }
  }, [auth, auth?.workout, bmiError]);

  // Group filtered workouts by stream
  useEffect(() => {
    if (auth && !bmiError) {
      const filteredWorkouts = workouts.filter(
        (workout) => workout.bmiRange === getBmiRange(auth.bmi)
      );
      const grouped = filteredWorkouts.reduce((acc, workout) => {
        acc[workout.stream] = acc[workout.stream] || [];
        acc[workout.stream].push(workout);
        return acc;
      }, {});
      setGroupedWorkouts(grouped);
    }
  }, [auth, bmiError, workouts]);

  // Handle workout selection
  const handleSelectWorkout = (stream, workoutPlan) => {
    setWorkout({ stream, ...workoutPlan });
  };

  // Handle workout removal
  const handleRemoveWorkout = () => {
    setWorkout(null);
  };

  // Handle update workout
  const handleUpdateWorkout = async () => {
    if (workout) {
      setButtonState("updating");
      try {
        setAuth({ ...auth, workout: [workout] }); // Store as array to match auth.workout structure
        await updateWorkout(auth.email, [workout]); // Pass array to match backend expectation
        setButtonState("success");
        setUpdateStatus("Workout plan updated successfully!");
        setIsSelecting(false);
        setTimeout(() => {
          setButtonState("default");
        }, 2000);
      } catch (error) {
        console.error("Failed to update workout plan:", error);
        setUpdateStatus("Failed to update workout plan. Please try again.");
        setButtonState("default");
      }
    } else {
      setUpdateStatus("Please select a workout plan.");
      setButtonState("default");
    }
  };

  // Define day order for sorting
  const dayOrder = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

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
        Workout Plans
      </div>

      <div className={`w-full md:px-10 px-5 pb-10 flex flex-col gap-10`}>
        {/* BMI Input Button */}
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

        {/* Workout Plans */}
        {!bmiError && showWorkouts && (
          <div className="w-full flex flex-col gap-5">
            <div
              className={`w-full p-5 text-center rounded-lg ${
                theme
                  ? "bg-[#ececec] text-[#0a0a0a]"
                  : "bg-[#0f0f0f] text-[#f0f0f0]"
              }`}
            >
              Based on your BMI of <span className="font-bold">{auth.bmi}</span>{" "}
              ({bmiCategory}), here are workout plans tailored to your fitness
              goals.
            </div>

            {/* Show selected workout or selection UI */}
            {workout && !isSelecting ? (
              <div className="w-full flex flex-col gap-5">
                <div
                  className={`w-full p-5 text-center rounded-lg font-bold text-[20px] ${
                    theme
                      ? "bg-[#d4d4d4] text-[#0a0a0a]"
                      : "bg-[#1a1a1a] text-[#f0f0f0]"
                  }`}
                >
                  Your Selected Workout Plan
                </div>
                <div
                  className={`p-5 rounded-lg flex flex-col justify-center items-center ${
                    theme
                      ? "bg-[#ececec] text-[#0a0a0a]"
                      : "bg-[#0f0f0f] text-[#f0f0f0]"
                  }`}
                >
                  <div className="w-full lg:text-[18px] font-bold flex justify-center items-center p-3">
                    {workout.stream}: {workout.title}
                  </div>
                  <div className="w-full text-[16px] flex justify-center items-center p-2">
                    {workout.description}
                  </div>
                  <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                    <span className="font-bold">Benefits:</span>
                    <span className="ml-1">{workout.benefits}</span>
                  </div>
                  <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                    <span className="font-bold">Daily Workouts:</span>
                    {(workout.days || [])
                      .sort(
                        (a, b) =>
                          dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
                      )
                      .map((day, index) => (
                        <div key={index} className="w-full pl-5 py-2">
                          <span className="font-bold">{day.day}:</span>
                          <ul className="list-disc pl-5">
                            {day.exercises.map((exercise, i) => (
                              <li key={i}>
                                {exercise.name} - {exercise.sets} sets,{" "}
                                {exercise.reps} reps
                                <span className="ml-1">
                                  (Notes:{" "}
                                  <span className="ml-1">{exercise.notes}</span>
                                  )
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                  <div
                    onClick={handleRemoveWorkout}
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 cursor-pointer"
                  >
                    Remove
                  </div>
                </div>
                <div className="w-full flex justify-center items-center gap-5">
                  <div
                    onClick={() => {
                      setIsSelecting(true);
                      setWorkout(null);
                      setUpdateStatus("");
                      setButtonState("default");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 w-[200px] text-center text-white rounded-lg p-3 flex justify-center items-center cursor-pointer"
                  >
                    Reselect Workout Plan
                  </div>
                  <div
                    onClick={handleUpdateWorkout}
                    className={`w-[200px] text-center rounded-lg p-3 flex justify-center items-center ${
                      !workout || buttonState === "updating"
                        ? theme
                          ? "bg-[#dddddd] text-[#888888] cursor-not-allowed"
                          : "bg-[#222222] text-[#888888] cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    }`}
                    disabled={!workout || buttonState === "updating"}
                  >
                    {buttonState === "updating"
                      ? "Updating..."
                      : buttonState === "success"
                      ? "Success!"
                      : "Update Workout"}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {["6-day", "5-day"].map(
                  (stream) =>
                    groupedWorkouts[stream]?.length > 0 && (
                      <div key={stream} className="w-full flex flex-col gap-5">
                        <div
                          className={`w-full p-5 text-center rounded-lg font-bold text-[20px] ${
                            theme
                              ? "bg-[#d4d4d4] text-[#0a0a0a]"
                              : "bg-[#1a1a1a] text-[#f0f0f0]"
                          }`}
                        >
                          {stream} Workout Plans
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                          {groupedWorkouts[stream].map((workoutPlan, index) => (
                            <div
                              key={index}
                              className={`p-5 rounded-lg flex flex-col justify-center items-center ${
                                theme
                                  ? "bg-[#ececec] text-[#0a0a0a]"
                                  : "bg-[#0f0f0f] text-[#f0f0f0]"
                              }`}
                            >
                              <div className="w-full lg:text-[18px] font-bold flex justify-center items-center p-3">
                                {workoutPlan.title}
                              </div>
                              <div className="w-full text-[16px] flex justify-center items-center p-2">
                                {workoutPlan.description}
                              </div>
                              <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                                <span className="font-bold">Benefits:</span>
                                <span className="ml-1">
                                  {workoutPlan.benefits}
                                </span>
                              </div>
                              <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                                <span className="font-bold">
                                  Daily Workouts:
                                </span>
                                {workoutPlan.days
                                  .sort(
                                    (a, b) =>
                                      dayOrder.indexOf(a.day) -
                                      dayOrder.indexOf(b.day)
                                  )
                                  .map((day, i) => (
                                    <div key={i} className="w-full pl-5 py-2">
                                      <span className="font-bold">
                                        {day.day}:
                                      </span>
                                      <ul className="list-disc pl-5">
                                        {day.exercises.map((exercise, j) => (
                                          <li key={j}>
                                            {exercise.name} - {exercise.sets}{" "}
                                            sets, {exercise.reps} reps
                                            <span className="ml-1">
                                              (Notes:{" "}
                                              <span className="ml-1">
                                                {exercise.notes}
                                              </span>
                                              )
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                              </div>
                              <div className="w-full flex justify-center items-center p-2">
                                <input
                                  type="radio"
                                  name="workoutPlan"
                                  checked={
                                    !!workout &&
                                    workout.stream === stream &&
                                    workout.title === workoutPlan.title
                                  }
                                  onChange={() =>
                                    handleSelectWorkout(stream, workoutPlan)
                                  }
                                  className="w-5 h-5"
                                />
                                <span className="ml-2">Select</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                )}
                <div className="w-full flex justify-center items-center">
                  <div
                    onClick={handleUpdateWorkout}
                    className={`w-[200px] text-center rounded-lg p-3 flex justify-center items-center ${
                      !workout || buttonState === "updating"
                        ? theme
                          ? "bg-[#dddddd] text-[#888888] cursor-not-allowed"
                          : "bg-[#222222] text-[#888888] cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    }`}
                    disabled={!workout || buttonState === "updating"}
                  >
                    {buttonState === "updating"
                      ? "Updating..."
                      : buttonState === "success"
                      ? "Success!"
                      : "Update Workout"}
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
