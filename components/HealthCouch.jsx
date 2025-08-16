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
  };

  // Handle Get Suggestion button click
  const handleGetSuggestion = () => {
    if (selectedIssue) {
      setShowSolution(true);
    }
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
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    <div className="w-full flex justify-center items-center p-2">
                      <input
                        type="radio"
                        name="healthIssue"
                        checked={selectedIssue && selectedIssue.name === issue.name}
                        onChange={() => handleSelectIssue(issue)}
                        className="w-5 h-5"
                      />
                      <span className="ml-2">Select</span>
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
            <div className="w-full flex justify-center items-center">
              <div
                onClick={handleGetSuggestion}
                className={`w-[200px] text-center rounded-lg p-3 flex justify-center items-center ${
                  !selectedIssue
                    ? theme
                      ? "bg-[#dddddd] text-[#888888] cursor-not-allowed"
                      : "bg-[#222222] text-[#888888] cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                }`}
                disabled={!selectedIssue}
              >
                Get Suggestion
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}