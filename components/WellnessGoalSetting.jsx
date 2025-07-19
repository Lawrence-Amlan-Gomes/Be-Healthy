"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useBmi } from "@/app/hooks/useBmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Mock wellness goal data with 15 goals per BMI category, organized by goal type
const mockGoals = {
  underweight: {
    Nutrition: [
      {
        title: "1: Increase Caloric Intake",
        description: "Boost daily calories to support healthy weight gain.",
        steps: [
          "Aim for 500-750 extra calories daily through nutrient-dense foods.",
          "Include healthy fats like avocado, nuts, and olive oil in meals.",
          "Eat 5-6 small meals to increase overall intake comfortably.",
        ],
        benefits: "Promotes healthy weight gain and improves energy levels.",
      },
      {
        title: "2: Prioritize Protein-Rich Foods",
        description: "Increase protein intake to support muscle growth.",
        steps: [
          "Consume 1.6-2.2g of protein per kg of body weight daily.",
          "Incorporate lean meats, eggs, Greek yogurt, and legumes.",
          "Add protein shakes as a convenient snack.",
        ],
        benefits: "Supports muscle development and overall strength.",
      },
      {
        title: "3: Include Complex Carbohydrates",
        description: "Add complex carbs for sustained energy and weight gain.",
        steps: [
          "Choose whole grains like quinoa, brown rice, and oats.",
          "Aim for 4-6g of carbs per kg of body weight daily.",
          "Pair carbs with healthy fats or proteins for balanced meals.",
        ],
        benefits: "Provides sustained energy and aids weight gain.",
      },
    ],
    Exercise: [
      {
        title: "1: Start Strength Training",
        description: "Build muscle mass through resistance exercises.",
        steps: [
          "Engage in strength training 3-4 times per week.",
          "Focus on compound exercises like squats, deadlifts, and bench presses.",
          "Work with a trainer to ensure proper form and progression.",
        ],
        benefits: "Increases muscle mass and improves overall strength.",
      },
      {
        title: "2: Incorporate Bodyweight Exercises",
        description: "Use bodyweight exercises to build strength gradually.",
        steps: [
          "Perform push-ups, pull-ups, and planks 3-4 times weekly.",
          "Start with 2-3 sets of 8-12 reps per exercise.",
          "Increase intensity by adding variations or reps over time.",
        ],
        benefits: "Enhances muscle growth without needing gym equipment.",
      },
      {
        title: "3: Include Light Cardio",
        description:
          "Add light cardio to improve stamina without burning excessive calories.",
        steps: [
          "Walk or cycle for 20-30 minutes, 3 times per week.",
          "Keep intensity low to moderate (heart rate ~50-70% of max).",
          "Combine with strength training for balanced fitness.",
        ],
        benefits: "Improves cardiovascular health and endurance.",
      },
    ],
    Sleep: [
      {
        title: "1: Establish a Sleep Routine",
        description: "Create a consistent sleep schedule to support recovery.",
        steps: [
          "Aim for 7-9 hours of sleep nightly.",
          "Go to bed and wake up at the same time daily.",
          "Create a relaxing bedtime routine (e.g., reading, no screens).",
        ],
        benefits: "Enhances muscle recovery and overall energy.",
      },
      {
        title: "2: Optimize Sleep Environment",
        description: "Improve sleep quality with an ideal bedroom setup.",
        steps: [
          "Keep your bedroom dark, quiet, and cool (60-67°F).",
          "Use comfortable bedding and a supportive mattress.",
          "Avoid caffeine or heavy meals 4-6 hours before bed.",
        ],
        benefits: "Improves sleep quality and recovery for weight gain.",
      },
      {
        title: "3: Practice Relaxation Techniques",
        description: "Use relaxation to improve sleep onset and quality.",
        steps: [
          "Practice deep breathing or meditation for 10 minutes before bed.",
          "Try progressive muscle relaxation to reduce tension.",
          "Avoid stimulating activities like intense exercise late at night.",
        ],
        benefits: "Reduces stress and promotes better sleep.",
      },
    ],
    MentalHealth: [
      {
        title: "1: Practice Gratitude Journaling",
        description: "Enhance mental well-being through daily gratitude.",
        steps: [
          "Write down 3 things you’re grateful for each day.",
          "Reflect on positive experiences or achievements.",
          "Spend 5-10 minutes journaling in the morning or evening.",
        ],
        benefits: "Boosts mood and reduces stress.",
      },
      {
        title: "2: Engage in Social Activities",
        description: "Build social connections to support mental health.",
        steps: [
          "Join a club or group related to your interests (e.g., fitness, cooking).",
          "Schedule regular meetups with friends or family.",
          "Participate in community events or volunteering weekly.",
        ],
        benefits: "Improves mood and reduces feelings of isolation.",
      },
      {
        title: "3: Try Mindfulness Meditation",
        description: "Use mindfulness to reduce stress and improve focus.",
        steps: [
          "Practice 5-10 minutes of mindfulness meditation daily.",
          "Use apps like Headspace or Calm for guided sessions.",
          "Focus on your breath and let thoughts pass without judgment.",
        ],
        benefits: "Enhances mental clarity and emotional resilience.",
      },
    ],
    Hydration: [
      {
        title: "1: Increase Daily Water Intake",
        description: "Stay hydrated to support metabolism and energy.",
        steps: [
          "Aim for 2.5-3 liters of water daily.",
          "Carry a reusable water bottle and sip throughout the day.",
          "Add lemon or cucumber for flavor to encourage drinking.",
        ],
        benefits: "Supports digestion and overall energy levels.",
      },
      {
        title: "2: Set Hydration Reminders",
        description: "Use reminders to maintain consistent water intake.",
        steps: [
          "Set phone alarms every 2 hours to drink 250ml of water.",
          "Track intake using a hydration app or journal.",
          "Drink a glass of water before each meal.",
        ],
        benefits: "Ensures consistent hydration for optimal health.",
      },
      {
        title: "3: Include Hydrating Foods",
        description: "Eat water-rich foods to boost hydration.",
        steps: [
          "Include fruits like watermelon, oranges, and cucumbers in meals.",
          "Aim for 2-3 servings of hydrating foods daily.",
          "Combine with adequate water intake for best results.",
        ],
        benefits: "Supports hydration and provides essential nutrients.",
      },
    ],
  },
  normal: {
    Nutrition: [
      {
        title: "1: Maintain Balanced Meals",
        description: "Eat a variety of foods to sustain health.",
        steps: [
          "Follow a balanced plate: 1/2 veggies, 1/4 protein, 1/4 carbs.",
          "Include 3-5 servings of fruits and vegetables daily.",
          "Choose whole grains over refined grains for meals.",
        ],
        benefits: "Supports overall health and maintains weight.",
      },
      {
        title: "2: Limit Processed Foods",
        description: "Reduce intake of processed and sugary foods.",
        steps: [
          "Cook meals from scratch 4-5 times per week.",
          "Replace sugary snacks with fruits or nuts.",
          "Read labels to avoid foods with added sugars or trans fats.",
        ],
        benefits: "Improves energy and prevents weight fluctuations.",
      },
      {
        title: "3: Plan Weekly Meals",
        description: "Plan meals to ensure balanced nutrition.",
        steps: [
          "Create a weekly meal plan with diverse recipes.",
          "Prep ingredients or meals on weekends to save time.",
          "Include a variety of proteins, carbs, and fats daily.",
        ],
        benefits: "Promotes consistent healthy eating habits.",
      },
    ],
    Exercise: [
      {
        title: "1: Mix Cardio and Strength",
        description: "Combine cardio and strength for balanced fitness.",
        steps: [
          "Do 150 minutes of moderate cardio weekly (e.g., brisk walking).",
          "Include strength training 2-3 times per week.",
          "Vary workouts to include running, cycling, or bodyweight exercises.",
        ],
        benefits: "Maintains cardiovascular and muscular health.",
      },
      {
        title: "2: Try Group Fitness Classes",
        description: "Join classes for motivation and variety.",
        steps: [
          "Attend 1-2 fitness classes weekly (e.g., yoga, Zumba).",
          "Choose classes that match your fitness level and interests.",
          "Track progress to stay motivated.",
        ],
        benefits: "Enhances fitness and builds community support.",
      },
      {
        title: "3: Increase Daily Activity",
        description: "Incorporate more movement into daily life.",
        steps: [
          "Aim for 10,000 steps daily using a pedometer or app.",
          "Take stairs instead of elevators and walk short distances.",
          "Do 10-minute stretching or bodyweight exercises daily.",
        ],
        benefits: "Improves overall fitness and energy levels.",
      },
    ],
    Sleep: [
      {
        title: "1: Maintain Consistent Sleep",
        description: "Keep a regular sleep schedule for optimal health.",
        steps: [
          "Aim for 7-8 hours of sleep nightly.",
          "Set a fixed bedtime and wake-up time, even on weekends.",
          "Avoid screens 30-60 minutes before bed.",
        ],
        benefits: "Supports physical and mental well-being.",
      },
      {
        title: "2: Create a Sleep-Friendly Space",
        description: "Optimize your bedroom for better sleep.",
        steps: [
          "Keep your room dark with blackout curtains.",
          "Maintain a cool temperature (60-67°F).",
          "Use white noise or earplugs to block disturbances.",
        ],
        benefits: "Improves sleep quality and recovery.",
      },
      {
        title: "3: Limit Evening Stimulants",
        description: "Avoid stimulants to improve sleep quality.",
        steps: [
          "Avoid caffeine after 2 PM.",
          "Limit alcohol consumption, especially close to bedtime.",
          "Eat light dinners to prevent discomfort during sleep.",
        ],
        benefits: "Promotes restful and uninterrupted sleep.",
      },
    ],
    MentalHealth: [
      {
        title: "1: Practice Daily Mindfulness",
        description: "Incorporate mindfulness for mental clarity.",
        steps: [
          "Spend 5-10 minutes daily on mindfulness meditation.",
          "Use apps like Calm for guided sessions.",
          "Focus on present-moment awareness during routine tasks.",
        ],
        benefits: "Reduces stress and improves focus.",
      },
      {
        title: "2: Stay Socially Connected",
        description: "Maintain strong social ties for emotional health.",
        steps: [
          "Call or meet a friend or family member weekly.",
          "Join a hobby group or community event monthly.",
          "Engage in meaningful conversations regularly.",
        ],
        benefits: "Boosts mood and reduces loneliness.",
      },
      {
        title: "3: Set Personal Goals",
        description: "Set achievable goals to boost motivation.",
        steps: [
          "Write down 1-2 personal goals for the month.",
          "Break goals into small, actionable steps.",
          "Review progress weekly to stay on track.",
        ],
        benefits: "Increases motivation and sense of purpose.",
      },
    ],
    Hydration: [
      {
        title: "1: Drink Adequate Water",
        description: "Maintain hydration for overall health.",
        steps: [
          "Aim for 2-2.5 liters of water daily.",
          "Drink a glass of water upon waking and before meals.",
          "Use a marked water bottle to track intake.",
        ],
        benefits: "Supports digestion, energy, and skin health.",
      },
      {
        title: "2: Replace Sugary Drinks",
        description: "Swap sugary drinks for healthier options.",
        steps: [
          "Replace soda or juice with water or herbal tea.",
          "Infuse water with fruits or herbs for flavor.",
          "Limit sugary drinks to 1-2 times per week.",
        ],
        benefits: "Reduces calorie intake and improves hydration.",
      },
      {
        title: "3: Eat Hydrating Foods",
        description: "Incorporate water-rich foods for hydration.",
        steps: [
          "Eat 2-3 servings of fruits/veggies like cucumber or melon daily.",
          "Add soups or smoothies to your diet weekly.",
          "Pair hydrating foods with water intake.",
        ],
        benefits: "Enhances hydration and nutrient intake.",
      },
    ],
  },
  overweight: {
    Nutrition: [
      {
        title: "1: Reduce Caloric Intake",
        description: "Cut calories gradually to support weight loss.",
        steps: [
          "Aim for a 500-calorie deficit daily (consult a dietitian).",
          "Focus on low-calorie, high-fiber foods like vegetables.",
          "Use smaller plates to control portion sizes.",
        ],
        benefits: "Promotes gradual, sustainable weight loss.",
      },
      {
        title: "2: Increase Fiber Intake",
        description: "Eat high-fiber foods to feel fuller longer.",
        steps: [
          "Aim for 25-30g of fiber daily from fruits, veggies, and grains.",
          "Include beans, lentils, and whole grains in meals.",
          "Snack on fiber-rich foods like apples or carrots.",
        ],
        benefits: "Improves satiety and supports digestion.",
      },
      {
        title: "3: Limit Sugary Foods",
        description: "Reduce sugar to lower calorie intake.",
        steps: [
          "Avoid sugary drinks and desserts most days.",
          "Use natural sweeteners like stevia sparingly.",
          "Read labels to identify hidden sugars in packaged foods.",
        ],
        benefits: "Reduces calorie intake and stabilizes blood sugar.",
      },
    ],
    Exercise: [
      {
        title: "1: Increase Cardio Exercise",
        description: "Add cardio to burn calories and improve fitness.",
        steps: [
          "Aim for 150-300 minutes of moderate cardio weekly (e.g., brisk walking).",
          "Try activities like swimming or cycling for low-impact options.",
          "Start with 20-30 minutes daily and increase gradually.",
        ],
        benefits: "Supports weight loss and cardiovascular health.",
      },
      {
        title: "2: Include Strength Training",
        description: "Build muscle to boost metabolism.",
        steps: [
          "Do strength training 2-3 times per week.",
          "Focus on bodyweight exercises like squats or push-ups.",
          "Increase resistance gradually with weights or bands.",
        ],
        benefits: "Increases metabolism and preserves muscle mass.",
      },
      {
        title: "3: Boost Daily Movement",
        description: "Increase activity through daily habits.",
        steps: [
          "Aim for 8,000-10,000 steps daily using a tracker.",
          "Take short walks during breaks or lunch.",
          "Use standing desks or stretch every hour.",
        ],
        benefits: "Burns calories and improves overall fitness.",
      },
    ],
    Sleep: [
      {
        title: "1: Prioritize Sleep Duration",
        description: "Get enough sleep to regulate hunger hormones.",
        steps: [
          "Aim for 7-9 hours of sleep nightly.",
          "Maintain a consistent sleep schedule, even on weekends.",
          "Avoid heavy meals or caffeine close to bedtime.",
        ],
        benefits: "Regulates appetite and supports weight loss.",
      },
      {
        title: "2: Improve Sleep Quality",
        description: "Enhance sleep with a better environment.",
        steps: [
          "Keep your bedroom dark, quiet, and cool (60-67°F).",
          "Use a comfortable mattress and pillows.",
          "Limit screen time 1 hour before bed.",
        ],
        benefits: "Improves recovery and reduces stress eating.",
      },
      {
        title: "3: Practice Evening Relaxation",
        description: "Use relaxation to improve sleep onset.",
        steps: [
          "Do 5-10 minutes of deep breathing or meditation before bed.",
          "Avoid intense exercise or stressful activities at night.",
          "Try a warm bath or herbal tea to unwind.",
        ],
        benefits: "Promotes restful sleep and reduces cravings.",
      },
    ],
    MentalHealth: [
      {
        title: "1: Practice Stress Management",
        description: "Manage stress to prevent emotional eating.",
        steps: [
          "Practice 10 minutes of mindfulness or yoga daily.",
          "Identify stress triggers and create coping strategies.",
          "Use apps like Headspace for guided stress relief.",
        ],
        benefits: "Reduces stress-related eating and improves mood.",
      },
      {
        title: "2: Build a Support System",
        description: "Connect with others for motivation.",
        steps: [
          "Join a weight loss or fitness support group.",
          "Share goals with a friend or family member for accountability.",
          "Attend weekly community or fitness events.",
        ],
        benefits: "Increases motivation and emotional support.",
      },
      {
        title: "3: Set Realistic Goals",
        description: "Set achievable goals to stay motivated.",
        steps: [
          "Aim for 0.5-1 kg weight loss per week.",
          "Break goals into small, measurable steps.",
          "Celebrate non-scale victories like improved energy.",
        ],
        benefits: "Boosts confidence and sustains motivation.",
      },
    ],
    Hydration: [
      {
        title: "1: Increase Water Intake",
        description:
          "Stay hydrated to support metabolism and appetite control.",
        steps: [
          "Drink 2-2.5 liters of water daily.",
          "Carry a reusable water bottle for easy access.",
          "Set reminders to drink water every 2 hours.",
        ],
        benefits: "Supports metabolism and reduces hunger.",
      },
      {
        title: "2: Replace High-Calorie Drinks",
        description: "Swap sugary drinks for water or tea.",
        steps: [
          "Replace soda or juice with water or unsweetened tea.",
          "Infuse water with lemon or mint for flavor.",
          "Limit high-calorie drinks to special occasions.",
        ],
        benefits: "Reduces calorie intake and improves hydration.",
      },
      {
        title: "3: Eat Water-Rich Foods",
        description: "Incorporate hydrating foods to support weight loss.",
        steps: [
          "Eat 2-3 servings of fruits/veggies like cucumber or watermelon daily.",
          "Include soups or salads in your diet weekly.",
          "Combine with water intake for optimal hydration.",
        ],
        benefits: "Enhances satiety and supports weight loss.",
      },
    ],
  },
  obese: {
    Nutrition: [
      {
        title: "1: Focus on Low-Calorie Foods",
        description:
          "Prioritize low-calorie, nutrient-dense foods for weight loss.",
        steps: [
          "Fill half your plate with non-starchy vegetables.",
          "Choose lean proteins like chicken or tofu for meals.",
          "Aim for a 500-750 calorie deficit daily (consult a dietitian).",
        ],
        benefits: "Promotes sustainable weight loss and improves nutrition.",
      },
      {
        title: "2: Increase Fiber Intake",
        description: "Eat high-fiber foods to enhance satiety.",
        steps: [
          "Aim for 30-35g of fiber daily from veggies, fruits, and grains.",
          "Include beans, lentils, and leafy greens in daily meals.",
          "Snack on fiber-rich foods like carrots or berries.",
        ],
        benefits: "Reduces hunger and supports digestive health.",
      },
      {
        title: "3: Avoid Processed Sugars",
        description: "Eliminate added sugars to reduce calorie intake.",
        steps: [
          "Replace sugary snacks with fresh fruits or nuts.",
          "Avoid sugary drinks like soda or sweetened coffee.",
          "Check labels for hidden sugars in packaged foods.",
        ],
        benefits: "Lowers calorie intake and stabilizes energy levels.",
      },
    ],
    Exercise: [
      {
        title: "1: Start Low-Impact Cardio",
        description: "Begin with low-impact exercises to burn calories.",
        steps: [
          "Walk or swim for 20-30 minutes, 5 times per week.",
          "Keep intensity moderate (heart rate ~50-70% of max).",
          "Gradually increase duration or intensity over weeks.",
        ],
        benefits: "Supports weight loss and improves heart health.",
      },
      {
        title: "2: Try Chair Exercises",
        description: "Use seated exercises for safe strength building.",
        steps: [
          "Do seated leg lifts, arm curls, or chair squats 3 times weekly.",
          "Perform 2-3 sets of 10-12 reps per exercise.",
          "Consult a trainer for safe modifications if needed.",
        ],
        benefits: "Builds strength with minimal joint stress.",
      },
      {
        title: "3: Increase Daily Steps",
        description: "Boost daily movement to burn calories.",
        steps: [
          "Aim for 6,000-8,000 steps daily using a tracker.",
          "Take short walks during breaks or after meals.",
          "Use stairs or park farther to increase steps.",
        ],
        benefits: "Increases calorie burn and improves mobility.",
      },
    ],
    Sleep: [
      {
        title: "1: Prioritize Sleep Duration",
        description: "Get enough sleep to regulate appetite hormones.",
        steps: [
          "Aim for 7-9 hours of sleep nightly.",
          "Stick to a consistent sleep schedule daily.",
          "Avoid heavy meals or caffeine 4-6 hours before bed.",
        ],
        benefits: "Reduces hunger and supports weight loss.",
      },
      {
        title: "2: Create a Restful Environment",
        description: "Optimize your bedroom for quality sleep.",
        steps: [
          "Keep your room dark, quiet, and cool (60-67°F).",
          "Invest in a supportive mattress and pillows.",
          "Use blackout curtains or a sleep mask.",
        ],
        benefits: "Improves sleep quality and reduces stress eating.",
      },
      {
        title: "3: Limit Evening Stimulants",
        description: "Avoid stimulants to enhance sleep quality.",
        steps: [
          "Avoid caffeine after 12 PM.",
          "Limit alcohol and heavy meals at night.",
          "Practice calming activities like reading before bed.",
        ],
        benefits: "Promotes restful sleep and appetite control.",
      },
    ],
    MentalHealth: [
      {
        title: "1: Manage Stress Effectively",
        description: "Reduce stress to prevent emotional eating.",
        steps: [
          "Practice 10-15 minutes of yoga or meditation daily.",
          "Identify and address stress triggers with coping strategies.",
          "Use apps like Calm for guided relaxation.",
        ],
        benefits: "Reduces stress-related eating and improves mood.",
      },
      {
        title: "2: Join a Support Group",
        description: "Connect with others for motivation and support.",
        steps: [
          "Join a weight loss or wellness support group.",
          "Share progress with a friend or family for accountability.",
          "Attend weekly meetings or online forums.",
        ],
        benefits: "Increases motivation and emotional resilience.",
      },
      {
        title: "3: Track Progress Mindfully",
        description: "Monitor goals to stay motivated without obsession.",
        steps: [
          "Track non-scale victories like better energy or mood.",
          "Set 1-2 realistic monthly goals (e.g., lose 1-2 kg).",
          "Celebrate small wins to maintain motivation.",
        ],
        benefits: "Boosts confidence and sustains long-term progress.",
      },
    ],
    Hydration: [
      {
        title: "1: Boost Water Intake",
        description: "Increase water consumption for appetite control.",
        steps: [
          "Drink 2.5-3 liters of water daily.",
          "Use a reusable bottle and sip throughout the day.",
          "Set phone reminders to drink every 2 hours.",
        ],
        benefits: "Reduces hunger and supports metabolism.",
      },
      {
        title: "2: Eliminate Sugary Drinks",
        description: "Replace high-calorie drinks with water or tea.",
        steps: [
          "Swap soda or juice for water or unsweetened herbal tea.",
          "Add lemon or cucumber to water for flavor.",
          "Avoid all sugary drinks during the week.",
        ],
        benefits: "Lowers calorie intake and improves hydration.",
      },
      {
        title: "3: Include Hydrating Foods",
        description: "Eat water-rich foods to aid weight loss.",
        steps: [
          "Eat 3-4 servings of fruits/veggies like cucumber or melon daily.",
          "Incorporate low-calorie soups or smoothies weekly.",
          "Pair with adequate water intake for best results.",
        ],
        benefits: "Increases satiety and supports weight loss.",
      },
    ],
  },
};

export default function WellnessGoalSetting() {
  const { theme } = useTheme();
  const { bmi } = useBmi();
  const [bmiError, setBmiError] = useState(true);
  const router = useRouter();
  const { auth } = useAuth();
  const [bmiCategory, setBmiCategory] = useState("");
  const [goals, setGoals] = useState({});
  const [showGoals, setShowGoals] = useState(false);

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

  // Determine BMI category and load goals
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
      setGoals(mockGoals[category] || {});
      setShowGoals(true);
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
        Wellness Goal Setting
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

        {/* Goal Results */}
        {showGoals && (
          <div className="w-full flex flex-col gap-5">
            <div
              className={`w-full p-5 text-center rounded-lg ${
                theme
                  ? "bg-[#ececec] text-[#0a0a0a]"
                  : "bg-[#0f0f0f] text-[#f0f0f0]"
              }`}
            >
              Based on your BMI of <span className="font-bold">{bmi}</span> (
              {bmiCategory}), here are tailored wellness goals to support your
              health journey.
            </div>
            {[
              "Nutrition",
              "Exercise",
              "Sleep",
              "MentalHealth",
              "Hydration",
            ].map((goalType) => (
              <div key={goalType} className="w-full flex flex-col gap-5">
                <div
                  className={`w-full p-5 text-center rounded-lg font-bold text-[20px] ${
                    theme
                      ? "bg-[#d4d4d4] text-[#0a0a0a]"
                      : "bg-[#1a1a1a] text-[#f0f0f0]"
                  }`}
                >
                  {goalType.replace(/([A-Z])/g, " $1").trim()}
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                  {goals[goalType]?.map((goal, index) => (
                    <div
                      key={index}
                      className={`p-5 rounded-lg flex flex-col justify-center items-center ${
                        theme
                          ? "bg-[#ececec] text-[#0a0a0a]"
                          : "bg-[#0f0f0f] text-[#f0f0f0]"
                      }`}
                    >
                      <div className="w-full lg:text-[18px] font-bold flex justify-center items-center p-3">
                        {goal.title}
                      </div>
                      <div className="w-full text-[16px] flex justify-center items-center p-2">
                        {goal.description}
                      </div>
                      <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                        <span className="font-bold">Steps:</span>
                        <ul className="list-disc pl-5">
                          {goal.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full text-[16px] flex justify-center items-center p-2">
                        <span className="font-bold mr-2">Benefits: </span>
                        {"  "}
                        {goal.benefits}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
