import { useState, useEffect, useRef } from "react";
import { FiRefreshCw, FiSettings } from "react-icons/fi";
import background from "../assets/background.jpg";
import SettingsModal from "../components/SettingModal";
import Spotify from "../components/Spotify";
// import SettingsModal from "../components/SettingsModal";

function PomodoroPage() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("pomodoro");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours > 0 ? String(hours).padStart(2, "0") + ":" : ""}${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === "pomodoro") setTime(25 * 60);
    if (newMode === "short") setTime(5 * 60);
    if (newMode === "long") setTime(15 * 60);
  };

  const handleSaveSettings = ({ pomodoro, shortBreak, longBreak }) => {
    if (mode === "pomodoro") setTime(pomodoro * 60);
    if (mode === "short") setTime(shortBreak * 60);
    if (mode === "long") setTime(longBreak * 60);
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex space-x-4 mb-10">
        {["pomodoro", "short", "long"].map((m) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`px-6 py-2 rounded-full border text-lg font-medium transition-all ${
              mode === m
                ? "bg-white text-black border-white"
                : "bg-transparent border-white hover:bg-white/20"
            }`}
          >
            {m === "pomodoro"
              ? "Pomodoro"
              : m === "short"
              ? "Short Break"
              : "Long Break"}
          </button>
        ))}
      </div>

      <h1 className="text-8xl font-bold mb-12 drop-shadow-lg">
        {formatTime()}
      </h1>

      <div className="flex space-x-8 items-center">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-10 py-3 bg-white text-black rounded-full text-2xl font-bold shadow-lg hover:bg-gray-200 transition-all"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            clearInterval(timerRef.current);
            setIsRunning(false);
            handleModeChange(mode);
          }}
          className="text-3xl hover:scale-110 transition-transform"
        >
          <FiRefreshCw />
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="text-3xl hover:scale-110 transition-transform"
        >
          <FiSettings />
        </button>
      </div>

      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSettings}
      />

      <Spotify></Spotify>
    </div>
  );
}

export default PomodoroPage;
