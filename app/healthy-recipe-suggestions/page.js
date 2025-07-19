import HealthyRecipeSuggestions from "@/components/HealthyRecipeSuggestions";

export const metadata = {
  title: "Healthy Recipe Suggestions",
  description: "Discover healthy recipes tailored to your BMI for a balanced lifestyle",
};

export default function HealthyRecipeMainPage() {
  return <HealthyRecipeSuggestions />;
}