"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { useState } from "react";

// Mock health issues data
const healthIssues = [
  {
    name: "Fever",
    description: "A temporary increase in body temperature above the normal range.",
    solution: "Rest and stay hydrated to help your body fight the underlying cause.",
    firstAid: "Apply a cool, damp cloth to the forehead. Take a lukewarm bath to reduce temperature.",
    treatment: "Take over-the-counter medications like acetaminophen or ibuprofen. Consult a doctor if fever persists beyond 3 days or exceeds 103°F (39.4°C)."
  },
  {
    name: "Cold",
    description: "A viral infection causing a runny nose, sore throat, and sneezing.",
    solution: "Get plenty of rest and drink fluids to support recovery.",
    firstAid: "Use saline nasal spray for congestion. Gargle with saltwater for sore throat relief.",
    treatment: "Use over-the-counter decongestants or antihistamines. Consult a doctor if symptoms worsen or last more than 10 days."
  },
  {
    name: "Back Pain",
    description: "Discomfort or pain in the lower, middle, or upper back.",
    solution: "Maintain good posture and avoid heavy lifting to prevent further strain.",
    firstAid: "Apply a warm or cold compress to the affected area for 15-20 minutes.",
    treatment: "Take over-the-counter pain relievers like ibuprofen. Consider physical therapy or consult a doctor if pain persists."
  },
  {
    name: "Headache",
    description: "Pain or discomfort in the head or neck region.",
    solution: "Identify triggers like stress or dehydration and address them.",
    firstAid: "Rest in a quiet, dark room. Apply a cool cloth to the forehead.",
    treatment: "Take over-the-counter pain relievers like acetaminophen. Consult a doctor for frequent or severe headaches."
  },
  {
    name: "Sore Throat",
    description: "Pain, scratchiness, or irritation in the throat, often worse when swallowing.",
    solution: "Stay hydrated and avoid irritants like smoking.",
    firstAid: "Gargle with warm saltwater or use throat lozenges.",
    treatment: "Use over-the-counter pain relievers. Consult a doctor if symptoms persist or include fever."
  },
  {
    name: "Stomach Ache",
    description: "Pain or discomfort in the abdominal area.",
    solution: "Avoid heavy or spicy foods and eat small, bland meals.",
    firstAid: "Apply a warm compress to the abdomen. Sip clear fluids like water or ginger tea.",
    treatment: "Use over-the-counter antacids for mild cases. Consult a doctor if pain is severe or persistent."
  },
  {
    name: "Fatigue",
    description: "Persistent tiredness or lack of energy not relieved by rest.",
    solution: "Establish a regular sleep schedule and manage stress levels.",
    firstAid: "Take short naps (20-30 minutes) and stay hydrated.",
    treatment: "Evaluate diet and exercise habits. Consult a doctor if fatigue persists for weeks."
  },
  {
    name: "Muscle Cramps",
    description: "Sudden, involuntary contractions of muscles causing pain.",
    solution: "Stay hydrated and ensure adequate electrolyte intake (e.g., potassium, magnesium).",
    firstAid: "Gently stretch and massage the affected muscle. Apply heat to relax the muscle.",
    treatment: "Use over-the-counter pain relievers if needed. Consult a doctor for frequent cramps."
  },
  {
    name: "Allergies",
    description: "Immune response to allergens causing sneezing, itching, or rashes.",
    solution: "Avoid known allergens and keep environments clean.",
    firstAid: "Rinse nasal passages with saline spray. Apply cool compresses to rashes.",
    treatment: "Use over-the-counter antihistamines. Consult a doctor for severe allergic reactions."
  },
  {
    name: "Minor Cuts",
    description: "Small breaks in the skin from cuts or scrapes.",
    solution: "Keep the wound clean and protected to prevent infection.",
    firstAid: "Rinse with clean water, apply an antiseptic, and cover with a sterile bandage.",
    treatment: "Monitor for signs of infection (redness, swelling). Consult a doctor if the cut is deep or infected."
  },
  {
    name: "Indigestion",
    description: "Discomfort in the upper abdomen, often with bloating or nausea after eating.",
    solution: "Eat smaller, more frequent meals and avoid trigger foods like spicy or fatty dishes.",
    firstAid: "Sip peppermint tea or take a short walk to aid digestion.",
    treatment: "Use over-the-counter antacids or simethicone. Consult a doctor if symptoms persist for more than a few days."
  },
  {
    name: "Sprained Ankle",
    description: "Pain and swelling from stretched or torn ligaments in the ankle.",
    solution: "Rest the ankle and avoid putting weight on it to promote healing.",
    firstAid: "Apply the RICE method: Rest, Ice (15-20 minutes every few hours), Compression (with a bandage), and Elevation (above heart level).",
    treatment: "Use over-the-counter pain relievers like ibuprofen. Consult a doctor if swelling or pain worsens or persists beyond a week."
  },
  {
    name: "Dry Skin",
    description: "Itchy, flaky, or rough skin due to lack of moisture.",
    solution: "Use gentle, fragrance-free soaps and moisturize regularly.",
    firstAid: "Apply a hypoallergenic moisturizer immediately after bathing to lock in moisture.",
    treatment: "Use over-the-counter hydrocortisone cream for itching. Consult a doctor if skin becomes cracked or infected."
  },
  {
    name: "Insomnia",
    description: "Difficulty falling or staying asleep, leading to poor sleep quality.",
    solution: "Establish a bedtime routine and avoid screens or caffeine before bed.",
    firstAid: "Practice relaxation techniques like deep breathing or meditation before sleep.",
    treatment: "Try over-the-counter melatonin supplements for short-term use. Consult a doctor if insomnia lasts more than a few weeks."
  },
  {
    name: "Nausea",
    description: "A feeling of sickness with an urge to vomit, often caused by diet or motion.",
    solution: "Avoid strong odors and eat bland foods like crackers or toast.",
    firstAid: "Sip ginger ale or suck on ginger candies. Sit upright and breathe slowly.",
    treatment: "Use over-the-counter anti-nausea medications like dimenhydrinate. Consult a doctor if nausea persists or is severe."
  },
  {
    name: "Eye Strain",
    description: "Discomfort or tired eyes from prolonged screen use or reading.",
    solution: "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
    firstAid: "Rest your eyes by closing them for a few minutes or using artificial tears.",
    treatment: "Adjust screen brightness and font size. Consult an eye doctor if symptoms persist or include vision changes."
  },
  {
    name: "Constipation",
    description: "Infrequent or difficult bowel movements causing discomfort.",
    solution: "Increase fiber intake with fruits, vegetables, and whole grains, and stay hydrated.",
    firstAid: "Drink warm water or prune juice to stimulate bowel movement.",
    treatment: "Use over-the-counter laxatives for short-term relief. Consult a doctor if constipation lasts more than a week."
  },
  {
    name: "Mild Sunburn",
    description: "Red, painful skin caused by overexposure to UV rays.",
    solution: "Stay out of the sun and wear protective clothing until healed.",
    firstAid: "Apply cool compresses or aloe vera gel to soothe the skin.",
    treatment: "Use over-the-counter hydrocortisone cream for pain. Consult a doctor if blisters form or pain is severe."
  },
  {
    name: "Stress",
    description: "Mental or emotional strain causing anxiety, irritability, or difficulty concentrating.",
    solution: "Practice stress management techniques like exercise or journaling.",
    firstAid: "Try deep breathing exercises or a short walk to calm the mind.",
    treatment: "Engage in mindfulness or therapy. Consult a doctor if stress significantly impacts daily life."
  },
  {
    name: "Mild Burn",
    description: "Redness or pain from minor burns caused by heat or chemicals.",
    solution: "Avoid further exposure to heat and keep the area clean.",
    firstAid: "Run cool (not cold) water over the burn for 10-15 minutes. Apply aloe vera or a sterile bandage.",
    treatment: "Use over-the-counter burn creams. Consult a doctor if the burn is larger than 3 inches or shows signs of infection."
  },
  {
    name: "Diarrhea",
    description: "Frequent, loose, or watery bowel movements.",
    solution: "Stay hydrated with water or electrolyte drinks and avoid dairy or fatty foods.",
    firstAid: "Eat bland foods like bananas, rice, or toast (BRAT diet).",
    treatment: "Use over-the-counter anti-diarrheal medications like loperamide. Consult a doctor if diarrhea lasts more than 2 days."
  },
  {
    name: "Nosebleed",
    description: "Bleeding from the nose, often due to dry air or irritation.",
    solution: "Keep nasal passages moist with saline spray and avoid picking the nose.",
    firstAid: "Sit upright, lean forward, and pinch the nostrils for 10-15 minutes.",
    treatment: "Apply a cold compress to the nose bridge. Consult a doctor if nosebleeds are frequent or last longer than 20 minutes."
  },
  {
    name: "Toothache",
    description: "Pain or sensitivity in or around a tooth, often due to cavities or irritation.",
    solution: "Maintain good oral hygiene with regular brushing and flossing.",
    firstAid: "Rinse the mouth with warm saltwater. Apply a cold compress to the cheek.",
    treatment: "Use over-the-counter pain relievers like ibuprofen. Consult a dentist for persistent or severe pain."
  },
  {
    name: "Acne",
    description: "Skin condition causing pimples or blackheads, often on the face or back.",
    solution: "Cleanse skin gently and avoid touching or popping pimples.",
    firstAid: "Apply a warm compress to reduce inflammation. Use over-the-counter acne cream.",
    treatment: "Use products with benzoyl peroxide or salicylic acid. Consult a dermatologist for persistent acne."
  },
  {
    name: "Heartburn",
    description: "Burning sensation in the chest caused by acid reflux.",
    solution: "Avoid trigger foods like spicy or acidic items and eat smaller meals.",
    firstAid: "Sip water or chew sugar-free gum to neutralize acid.",
    treatment: "Use over-the-counter antacids or H2 blockers. Consult a doctor if heartburn occurs frequently."
  },
  {
    name: "Joint Pain",
    description: "Aches or stiffness in joints, often from overuse or minor injury.",
    solution: "Avoid repetitive strain and maintain a healthy weight to reduce joint stress.",
    firstAid: "Apply a warm or cold compress to the affected joint for 15-20 minutes.",
    treatment: "Use over-the-counter pain relievers like ibuprofen. Consult a doctor if pain persists or worsens."
  },
  {
    name: "Earache",
    description: "Pain in the ear, often due to infection or pressure changes.",
    solution: "Avoid inserting objects into the ear and keep ears dry.",
    firstAid: "Apply a warm compress to the outer ear. Chew gum to relieve pressure.",
    treatment: "Use over-the-counter pain relievers. Consult a doctor if pain is severe or accompanied by fever."
  },
  {
    name: "Cough",
    description: "Persistent coughing, often due to irritation or a respiratory infection.",
    solution: "Stay hydrated and avoid irritants like smoke or dust.",
    firstAid: "Sip warm tea with honey or use cough drops to soothe the throat.",
    treatment: "Use over-the-counter cough suppressants. Consult a doctor if cough lasts more than 3 weeks."
  },
  {
    name: "Bruising",
    description: "Discoloration of the skin due to minor trauma or pressure.",
    solution: "Avoid further trauma to the area and monitor for unusual bruising.",
    firstAid: "Apply a cold compress for 10-15 minutes to reduce swelling.",
    treatment: "Use over-the-counter arnica cream to reduce discoloration. Consult a doctor if bruising is frequent or severe."
  },
  {
    name: "Hiccups",
    description: "Involuntary contractions of the diaphragm causing sudden sounds.",
    solution: "Avoid eating too quickly or consuming carbonated drinks.",
    firstAid: "Hold your breath for 10 seconds or sip cold water slowly.",
    treatment: "Most hiccups resolve on their own. Consult a doctor if hiccups persist for more than 48 hours."
  },
  {
    name: "Chapped Lips",
    description: "Dry, cracked, or sore lips due to dehydration or weather exposure.",
    solution: "Stay hydrated and apply lip balm regularly.",
    firstAid: "Apply petroleum jelly or aloe vera to soothe lips.",
    treatment: "Use over-the-counter lip balms with SPF. Consult a doctor if lips bleed or don’t heal."
  },
  {
    name: "Sinus Congestion",
    description: "Blocked nasal passages causing pressure or discomfort.",
    solution: "Use a humidifier and avoid allergens or irritants.",
    firstAid: "Inhale steam from a bowl of hot water or use a saline nasal spray.",
    treatment: "Use over-the-counter decongestants. Consult a doctor if symptoms persist beyond 10 days."
  },
  {
    name: "Minor Sprain",
    description: "Pain and swelling from stretched ligaments in joints like the wrist or knee.",
    solution: "Rest the affected joint and avoid strenuous activity.",
    firstAid: "Apply the RICE method: Rest, Ice, Compression, Elevation.",
    treatment: "Use over-the-counter pain relievers. Consult a doctor if mobility is limited or pain persists."
  },
  {
    name: "Tension Headache",
    description: "Tight band-like pain around the head, often due to stress or poor posture.",
    solution: "Practice stress reduction and maintain proper posture during work.",
    firstAid: "Massage the neck and shoulders or rest in a quiet room.",
    treatment: "Use over-the-counter pain relievers like ibuprofen. Consult a doctor for frequent tension headaches."
  },
  {
    name: "Mild Dehydration",
    description: "Fatigue, dry mouth, or dizziness due to insufficient fluid intake.",
    solution: "Drink water regularly, especially during exercise or hot weather.",
    firstAid: "Sip water or an electrolyte drink slowly to rehydrate.",
    treatment: "Monitor fluid intake. Consult a doctor if symptoms like confusion or rapid heartbeat occur."
  },
  {
    name: "Foot Pain",
    description: "Aching or discomfort in the feet, often from overuse or poor footwear.",
    solution: "Wear supportive shoes and avoid prolonged standing.",
    firstAid: "Soak feet in warm water with Epsom salts for 15-20 minutes.",
    treatment: "Use over-the-counter pain relievers or orthotic inserts. Consult a podiatrist for persistent pain."
  },
  {
    name: "Itchy Eyes",
    description: "Irritation or itching in the eyes, often due to allergies or dryness.",
    solution: "Avoid rubbing eyes and reduce exposure to allergens.",
    firstAid: "Apply a cool compress or use over-the-counter artificial tears.",
    treatment: "Use antihistamine eye drops for allergies. Consult a doctor if itching persists."
  },
  {
    name: "Mild Food Poisoning",
    description: "Nausea, vomiting, or diarrhea from contaminated food.",
    solution: "Ensure proper food storage and hygiene to prevent recurrence.",
    firstAid: "Stay hydrated with small sips of water or electrolyte drinks.",
    treatment: "Rest and eat bland foods. Consult a doctor if symptoms last more than 2 days or include fever."
  },
  {
    name: "Neck Pain",
    description: "Stiffness or discomfort in the neck, often from poor posture or sleeping position.",
    solution: "Use ergonomic pillows and maintain proper posture during work.",
    firstAid: "Apply a warm compress and gently stretch the neck.",
    treatment: "Use over-the-counter pain relievers like ibuprofen. Consult a doctor if pain restricts movement."
  },
  {
    name: "Mouth Ulcers",
    description: "Painful sores inside the mouth, often from stress or irritation.",
    solution: "Avoid spicy or acidic foods that irritate the sores.",
    firstAid: "Rinse with saltwater or apply over-the-counter oral gel.",
    treatment: "Use topical treatments like benzocaine. Consult a doctor if ulcers persist beyond 2 weeks."
  },
  {
    name: "Blisters",
    description: "Fluid-filled skin bumps caused by friction or pressure.",
    solution: "Wear proper-fitting shoes and use protective padding.",
    firstAid: "Clean the area and cover with a sterile bandage, avoiding popping the blister.",
    treatment: "Apply over-the-counter blister pads. Consult a doctor if signs of infection appear."
  },
  {
    name: "Mild Asthma Attack",
    description: "Wheezing or shortness of breath triggered by allergens or exercise.",
    solution: "Avoid triggers like dust or pollen and carry a rescue inhaler.",
    firstAid: "Sit upright, use a rescue inhaler, and breathe slowly.",
    treatment: "Follow prescribed asthma management plans. Consult a doctor immediately if symptoms worsen."
  },
  {
    name: "Heat Rash",
    description: "Red, itchy bumps on the skin from excessive heat or sweating.",
    solution: "Stay in cool environments and wear loose, breathable clothing.",
    firstAid: "Apply a cool compress or calamine lotion to soothe the skin.",
    treatment: "Use over-the-counter hydrocortisone cream. Consult a doctor if rash persists."
  },
  {
    name: "Ingrown Toenail",
    description: "Painful condition where the toenail grows into the surrounding skin.",
    solution: "Wear wide-toed shoes and trim nails straight across.",
    firstAid: "Soak the foot in warm water with Epsom salts for 15-20 minutes.",
    treatment: "Apply antibiotic ointment to prevent infection. Consult a podiatrist if pain or redness worsens."
  },
  {
    name: "Motion Sickness",
    description: "Dizziness, nausea, or vomiting triggered by motion, such as car or boat travel.",
    solution: "Look at the horizon or a fixed point and avoid reading during travel.",
    firstAid: "Sit in a well-ventilated area and sip water or ginger ale.",
    treatment: "Use over-the-counter medications like dimenhydrinate. Consult a doctor for persistent issues."
  },
  {
    name: "Shin Splints",
    description: "Pain along the shinbone from overuse, often during running or exercise.",
    solution: "Rest and wear supportive footwear to reduce impact.",
    firstAid: "Apply ice to the shins for 15-20 minutes and rest the legs.",
    treatment: "Use over-the-counter pain relievers. Consult a doctor if pain persists during activity."
  },
  {
    name: "Dry Eyes",
    description: "Gritty or burning sensation in the eyes due to insufficient tear production.",
    solution: "Use a humidifier and take breaks from screen time.",
    firstAid: "Apply over-the-counter artificial tears or rest eyes in a dark room.",
    treatment: "Use lubricating eye drops. Consult an eye doctor if symptoms persist."
  },
  {
    name: "Mild Hypoglycemia",
    description: "Low blood sugar causing shakiness, sweating, or confusion.",
    solution: "Eat regular meals and carry quick-sugar snacks like candy.",
    firstAid: "Consume 15 grams of fast-acting carbs (e.g., juice or glucose tablets) and wait 15 minutes.",
    treatment: "Monitor blood sugar levels. Consult a doctor if episodes are frequent."
  },
  {
    name: "Bloating",
    description: "Feeling of fullness or swelling in the abdomen, often from gas or diet.",
    solution: "Avoid carbonated drinks and eat slowly to reduce air swallowing.",
    firstAid: "Take a short walk or drink peppermint tea to relieve gas.",
    treatment: "Use over-the-counter simethicone. Consult a doctor if bloating is frequent or painful."
  },
  {
    name: "Carpal Tunnel Syndrome",
    description: "Numbness or tingling in the hand or wrist from nerve compression.",
    solution: "Use ergonomic keyboards and take breaks during repetitive tasks.",
    firstAid: "Rest the wrist and apply a cold compress for 10-15 minutes.",
    treatment: "Wear a wrist splint at night. Consult a doctor if symptoms persist or worsen."
  }
];

export default function HealthCoach() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  // Filter health issues based on search term
  const filteredIssues = healthIssues.filter((issue) =>
    issue.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedIssue(null); // Clear selection when search term changes
    setShowSolution(false); // Hide solution when searching
  };

  // Handle issue selection
  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setShowSolution(true); // Show solution immediately upon clicking Get Suggestion
  };

  // Handle Go Back button click
  const handleGoBack = () => {
    setShowSolution(false);
    setSelectedIssue(null);
    setSearchTerm("");
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
        className={`w-full py-10 font-bold float-left text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[50px] flex justify-center items-center`}
      >
        Health Coach
      </div>

      <div className={`w-full md:px-10 px-5 pb-10 flex flex-col gap-10`}>
        {/* Search Bar */}
        <div className="w-full flex justify-center items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search health issues..."
            className={`w-full max-w-[400px] p-3 rounded-lg border ${
              theme
                ? "bg-[#ffffff] text-[#0a0a0a] border-[#cccccc]"
                : "bg-[#1a1a1a] text-[#ebebeb] border-[#444444]"
            }`}
          />
        </div>

        {/* Health Issues or Solution */}
        {showSolution && selectedIssue ? (
          <div className="w-full flex flex-col gap-5">
            <div
              className={`w-full p-5 text-center rounded-lg font-bold text-[20px] ${
                theme
                  ? "bg-[#d4d4d4] text-[#0a0a0a]"
                  : "bg-[#1a1a1a] text-[#f0f0f0]"
              }`}
            >
              {selectedIssue.name}
            </div>
            <div
              className={`p-5 rounded-lg flex flex-col justify-center items-center ${
                theme
                  ? "bg-[#ececec] text-[#0a0a0a]"
                  : "bg-[#0f0f0f] text-[#f0f0f0]"
              }`}
            >
              <div className="w-full text-[16px] flex justify-center items-center p-2">
                {selectedIssue.description}
              </div>
              <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                <span className="font-bold">Solution:</span>
                <span className="ml-1">{selectedIssue.solution}</span>
              </div>
              <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                <span className="font-bold">Basic First Aid:</span>
                <span className="ml-1">{selectedIssue.firstAid}</span>
              </div>
              <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                <span className="font-bold">Treatment:</span>
                <span className="ml-1">{selectedIssue.treatment}</span>
              </div>
              <div
                onClick={handleGoBack}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 cursor-pointer"
              >
                Go Back
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-5">
            <div
              className={`w-full p-5 text-center rounded-lg ${
                theme
                  ? "bg-[#ececec] text-[#0a0a0a]"
                  : "bg-[#0f0f0f] text-[#f0f0f0]"
              }`}
            >
              Select a health issue to get suggestions for solutions and treatment.
            </div>
            {filteredIssues.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
                {filteredIssues.map((issue, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-lg flex flex-col justify-center items-center ${
                      theme
                        ? "bg-[#ececec] text-[#0a0a0a]"
                        : "bg-[#0f0f0f] text-[#f0f0f0]"
                    }`}
                  >
                    <div className="w-full lg:text-[18px] font-bold flex justify-center items-center p-3">
                      {issue.name}
                    </div>
                    <div className="w-full text-[16px] flex justify-center items-center p-2">
                      {issue.description}
                    </div>
                    <div
                      onClick={() => handleSelectIssue(issue)}
                      className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 text-center cursor-pointer"
                    >
                      Get Suggestion
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`w-full p-5 text-center rounded-lg ${
                  theme
                    ? "bg-[#ececec] text-[#0a0a0a]"
                    : "bg-[#0f0f0f] text-[#f0f0f0]"
                }`}
              >
                No health issues found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}