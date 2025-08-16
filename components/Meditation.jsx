"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateMeditation } from "@/app/actions";

// Mock meditation session data
const mockSessions = {
  Mindfulness: [
    {
      title: "1: Mindful Breathing",
      description: "Focus on your breath to cultivate present-moment awareness.",
      steps: [
        "Find a quiet, comfortable space to sit or lie down.",
        "Close your eyes and take 10 deep breaths, focusing on each inhale and exhale.",
        "Notice thoughts without judgment and return focus to your breath.",
      ],
      benefits: "Enhances focus and reduces mental clutter.",
    },
    {
      title: "2: Body Scan Meditation",
      description: "Bring awareness to each part of your body to release tension.",
      steps: [
        "Lie down in a comfortable position with eyes closed.",
        "Start at your toes, noticing sensations, and move up to your head.",
        "Spend 1-2 minutes on each body part, breathing deeply.",
      ],
      benefits: "Promotes relaxation and body awareness.",
    },
    {
      title: "3: Loving-Kindness Meditation",
      description: "Cultivate compassion for yourself and others.",
      steps: [
        "Sit comfortably and visualize someone you care about.",
        "Repeat phrases like 'May you be happy, healthy, and at peace.'",
        "Extend these wishes to yourself, loved ones, and all beings.",
      ],
      benefits: "Increases empathy and emotional well-being.",
    },
  ],
  Relaxation: [
    {
      title: "1: Progressive Muscle Relaxation",
      description: "Tense and release muscle groups to reduce physical tension.",
      steps: [
        "Sit or lie down in a quiet space.",
        "Starting with your feet, tense each muscle group for 5 seconds, then release.",
        "Move up through legs, arms, and face, breathing deeply.",
      ],
      benefits: "Reduces physical stress and promotes calmness.",
    },
    {
      title: "2: Guided Visualization",
      description: "Imagine a peaceful scene to relax your mind and body.",
      steps: [
        "Close your eyes and picture a serene place, like a beach or forest.",
        "Engage all senses: hear the waves, feel the breeze, smell the air.",
        "Spend 10 minutes immersed in this calming scene.",
      ],
      benefits: "Lowers stress and enhances mental clarity.",
    },
    {
      title: "3: Gentle Yoga Meditation",
      description: "Combine light stretching with mindful breathing.",
      steps: [
        "Perform simple yoga poses like child's pose or seated forward bend.",
        "Focus on your breath, inhaling for 4 counts, exhaling for 6.",
        "Hold each pose for 1-2 minutes, staying present.",
      ],
      benefits: "Improves flexibility and reduces tension.",
    },
  ],
  Focus: [
    {
      title: "1: Single-Point Focus",
      description: "Concentrate on a single object to sharpen mental focus.",
      steps: [
        "Choose an object (e.g., a candle flame or a small item).",
        "Stare at it for 5 minutes, noticing details without distraction.",
        "If your mind wanders, gently bring it back to the object.",
      ],
      benefits: "Enhances concentration and mental discipline.",
    },
    {
      title: "2: Counting Breath Meditation",
      description: "Use breath counting to improve attention.",
      steps: [
        "Sit comfortably and close your eyes.",
        "Count each exhale up to 10, then start over.",
        "If you lose count, begin again at 1 without judgment.",
      ],
      benefits: "Improves focus and reduces mental wandering.",
    },
    {
      title: "3: Task-Oriented Meditation",
      description: "Focus on a small task to train attention.",
      steps: [
        "Choose a simple task, like arranging objects or writing slowly.",
        "Perform the task mindfully, focusing on each movement.",
        "Spend 5-10 minutes fully engaged in the activity.",
      ],
      benefits: "Boosts productivity and mental clarity.",
    },
  ],
  Sleep: [
    {
      title: "1: Bedtime Relaxation Meditation",
      description: "Prepare your mind and body for restful sleep.",
      steps: [
        "Lie in bed, dim the lights, and close your eyes.",
        "Take 10 slow, deep breaths, relaxing with each exhale.",
        "Visualize a calm scene, like floating on a cloud.",
      ],
      benefits: "Promotes faster sleep onset and better sleep quality.",
    },
    {
      title: "2: Sleep Story Meditation",
      description: "Listen to or imagine a soothing story to drift off.",
      steps: [
        "Choose a calming story or imagine a gentle narrative.",
        "Focus on the details of the story, letting thoughts fade.",
        "Breathe slowly, allowing the story to guide you to sleep.",
      ],
      benefits: "Reduces insomnia and calms the mind.",
    },
    {
      title: "3: Body Relaxation for Sleep",
      description: "Release physical tension to ease into sleep.",
      steps: [
        "Lie down and focus on relaxing each body part, starting at your toes.",
        "Breathe deeply, releasing tension with each exhale.",
        "Spend 10-15 minutes until fully relaxed.",
      ],
      benefits: "Improves sleep quality and reduces nighttime tension.",
    },
  ],
  StressRelief: [
    {
      title: "1: Deep Breathing Meditation",
      description: "Use controlled breathing to reduce stress.",
      steps: [
        "Sit comfortably and inhale deeply for 4 counts, hold for 4, exhale for 6.",
        "Repeat for 5-10 minutes, focusing solely on your breath.",
        "Notice tension leaving your body with each exhale.",
      ],
      benefits: "Lowers stress hormones and promotes calm.",
    },
    {
      title: "2: Gratitude Meditation",
      description: "Reflect on positive aspects to shift focus from stress.",
      steps: [
        "Sit quietly and think of 3 things you're grateful for.",
        "Visualize each one, feeling appreciation for 1-2 minutes each.",
        "Breathe deeply, letting gratitude replace stress.",
      ],
      benefits: "Enhances mood and reduces stress perception.",
    },
    {
      title: "3: Nature Connection Meditation",
      description: "Connect with nature to alleviate stress.",
      steps: [
        "Sit outside or visualize a natural setting (e.g., forest, ocean).",
        "Focus on sensory details: sounds, smells, and sights.",
        "Spend 10 minutes immersed in this calming environment.",
      ],
      benefits: "Reduces anxiety and fosters peace.",
    },
  ],
};

export default function Meditation() {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState(mockSessions);
  const [showSessions, setShowSessions] = useState(false);
  const [meditationArray, setMeditationArray] = useState([]);
  const [isSelecting, setIsSelecting] = useState(true);
  const [updateStatus, setUpdateStatus] = useState("");
  const [buttonState, setButtonState] = useState("default"); // default, updating, success

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  // Initialize meditationArray and show sessions
  useEffect(() => {
    if (auth) {
      setShowSessions(true);
      setMeditationArray(auth.meditation && auth.meditation.length > 0 ? auth.meditation : []);
      setIsSelecting(auth.meditation?.length === 0);
    }
  }, [auth]);

  // Handle session selection
  const handleSelectSession = (sessionType, session) => {
    setMeditationArray((prev) => {
      if (prev.some((item) => item.sessionType === sessionType && item.title === session.title)) {
        return prev; // Session already selected, no change
      }
      return [
        ...prev,
        {
          sessionType,
          title: session.title,
          description: session.description,
          steps: session.steps,
          benefits: session.benefits,
        },
      ];
    });
  };

  // Handle session removal
  const handleRemoveSession = (sessionType, title) => {
    setMeditationArray((prev) =>
      prev.filter((item) => !(item.sessionType === sessionType && item.title === title))
    );
  };

  // Handle update meditation
  const handleUpdateMeditation = async () => {
    if (meditationArray.length > 0) {
      setButtonState("updating");
      try {
        setAuth({ ...auth, meditation: meditationArray });
        await updateMeditation(auth.email, meditationArray);
        setButtonState("success");
        setUpdateStatus("Meditation sessions updated successfully!");
        setIsSelecting(false);
        setTimeout(() => {
          setButtonState("default");
        }, 2000);
      } catch (error) {
        console.error("Failed to update meditation sessions:", error);
        setUpdateStatus("Failed to update meditation sessions. Please try again.");
        setButtonState("default");
      }
    } else {
      setUpdateStatus("Please select at least one meditation session.");
      setButtonState("default");
    }
  };

  // Define session type order for sorting
  const sessionTypeOrder = ["Mindfulness", "Relaxation", "Focus", "Sleep", "StressRelief"];

  // Sort meditationArray by sessionType
  const sortedMeditationArray = [...meditationArray].sort((a, b) =>
    sessionTypeOrder.indexOf(a.sessionType) - sessionTypeOrder.indexOf(b.sessionType)
  );

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
        Guided Meditation Sessions
      </div>

      <div className={`w-full md:px-10 px-5 pb-10 flex flex-col gap-10`}>
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

        {/* Meditation Sessions */}
        {showSessions && (
          <div className="w-full flex flex-col gap-5">
            <div
              className={`w-full p-5 text-center rounded-lg ${
                theme
                  ? "bg-[#ececec] text-[#0a0a0a]"
                  : "bg-[#0f0f0f] text-[#f0f0f0]"
              }`}
            >
              Choose from a variety of guided meditation sessions to support your mental well-being.
            </div>

            {/* Show selected sessions or selection UI */}
            {meditationArray.length > 0 && !isSelecting ? (
              <div className="w-full flex flex-col gap-5">
                <div
                  className={`w-full p-5 text-center rounded-lg font-bold text-[20px] ${
                    theme
                      ? "bg-[#d4d4d4] text-[#0a0a0a]"
                      : "bg-[#1a1a1a] text-[#f0f0f0]"
                  }`}
                >
                  Your Selected Meditation Sessions
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                  {sortedMeditationArray.map((session, index) => (
                    <div
                      key={index}
                      className={`p-5 rounded-lg flex flex-col justify-center items-center ${
                        theme
                          ? "bg-[#ececec] text-[#0a0a0a]"
                          : "bg-[#0f0f0f] text-[#f0f0f0]"
                      }`}
                    >
                      <div className="w-full lg:text-[18px] font-bold flex justify-center items-center p-3">
                        {session.sessionType}: {session.title}
                      </div>
                      <div className="w-full text-[16px] flex justify-center items-center p-2">
                        {session.description}
                      </div>
                      <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                        <span className="font-bold">Steps:</span>
                        <ul className="list-disc pl-5">
                          {session.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full text-[16px] flex justify-center items-center p-2">
                        <span className="font-bold">Benefits:</span>
                        <span className="ml-1">{session.benefits}</span>
                      </div>
                      <div
                        onClick={() => handleRemoveSession(session.sessionType, session.title)}
                        className="mt-3 bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 cursor-pointer"
                      >
                        Remove
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-center items-center gap-5">
                  <div
                    onClick={() => {
                      setIsSelecting(true);
                      setMeditationArray([]);
                      setUpdateStatus("");
                      setButtonState("default");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 w-[200px] text-center text-white rounded-lg p-3 flex justify-center items-center cursor-pointer"
                  >
                    Reselect Sessions
                  </div>
                  <div
                    onClick={handleUpdateMeditation}
                    className={`w-[200px] text-center rounded-lg p-3 flex justify-center items-center ${
                      meditationArray.length === 0 || buttonState === "updating"
                        ? theme
                          ? "bg-[#dddddd] text-[#888888] cursor-not-allowed"
                          : "bg-[#222222] text-[#888888] cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    }`}
                    disabled={meditationArray.length === 0 || buttonState === "updating"}
                  >
                    {buttonState === "updating"
                      ? "Updating..."
                      : buttonState === "success"
                      ? "Success!"
                      : "Update Meditation"}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {["Mindfulness", "Relaxation", "Focus", "Sleep", "StressRelief"].map((sessionType) => (
                  <div key={sessionType} className="w-full flex flex-col gap-5">
                    <div
                      className={`w-full p-5 text-center rounded-lg font-bold text-[20px] ${
                        theme
                          ? "bg-[#d4d4d4] text-[#0a0a0a]"
                          : "bg-[#1a1a1a] text-[#f0f0f0]"
                      }`}
                    >
                      {sessionType.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                      {sessions[sessionType]?.map((session, index) => (
                        <div
                          key={index}
                          className={`p-5 rounded-lg flex flex-col justify-center items-center ${
                            theme
                              ? "bg-[#ececec] text-[#0a0a0a]"
                              : "bg-[#0f0f0f] text-[#f0f0f0]"
                          }`}
                        >
                          <div className="w-full lg:text-[18px] font-bold flex justify-center items-center p-3">
                            {session.title}
                          </div>
                          <div className="w-full text-[16px] flex justify-center items-center p-2">
                            {session.description}
                          </div>
                          <div className="w-full text-[16px] flex flex-col justify-center items-start p-2">
                            <span className="font-bold">Steps:</span>
                            <ul className="list-disc pl-5">
                              {session.steps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="w-full text-[16px] flex justify-center items-center p-2">
                            <span className="font-bold">Benefits:</span>
                            <span className="ml-1">{session.benefits}</span>
                          </div>
                          <div
                            onClick={() => handleSelectSession(sessionType, session)}
                            className={`mt-3 bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 cursor-pointer ${
                              meditationArray.some(
                                (item) => item.sessionType === sessionType && item.title === session.title
                              )
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={meditationArray.some(
                              (item) => item.sessionType === sessionType && item.title === session.title
                            )}
                          >
                            Select
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="w-full flex justify-center items-center">
                  <div
                    onClick={handleUpdateMeditation}
                    className={`w-[200px] text-center rounded-lg p-3 flex justify-center items-center ${
                      meditationArray.length === 0 || buttonState === "updating"
                        ? theme
                          ? "bg-[#dddddd] text-[#888888] cursor-not-allowed"
                          : "bg-[#222222] text-[#888888] cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    }`}
                    disabled={meditationArray.length === 0 || buttonState === "updating"}
                  >
                    {buttonState === "updating"
                      ? "Updating..."
                      : buttonState === "success"
                      ? "Success!"
                      : "Update Meditation"}
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