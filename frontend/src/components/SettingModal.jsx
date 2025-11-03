// src/components/SettingsModal.jsx
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const SettingsModal = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ pomodoro, shortBreak, longBreak });
    onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      alert(" Login successful!");
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#111] text-white rounded-2xl w-[90%] md:w-[600px] p-6 relative shadow-xl animate-fadeIn">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FiX size={22} />
        </button>

        <div className="flex gap-6 border-b border-gray-700 mb-4">
          <button
            className={`pb-2 text-lg ${
              activeTab === "general"
                ? "border-b-2 border-white font-semibold"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`pb-2 text-lg ${
              activeTab === "account"
                ? "border-b-2 border-white font-semibold"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Account
          </button>
        </div>

        {activeTab === "general" && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Pomodoro (minutes)</label>
              <input
                type="number"
                value={pomodoro}
                onChange={(e) => setPomodoro(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Short Break (minutes)</label>
              <input
                type="number"
                value={shortBreak}
                onChange={(e) => setShortBreak(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Long Break (minutes)</label>
              <input
                type="number"
                value={longBreak}
                onChange={(e) => setLongBreak(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-2 focus:outline-none"
              />
            </div>
          </div>
        )}

        {activeTab === "account" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <p className="text-sm text-gray-400">
              Sync your timer settings with an account.
            </p>

            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-2 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-2 focus:outline-none"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`bg-white text-black font-semibold py-2 px-4 rounded-lg w-full hover:bg-gray-300 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-sm text-center text-gray-400">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-400 hover:underline">
                Register here
              </a>
            </p>
          </form>
        )}

        {activeTab === "general" && (
          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-300"
            >
              Save changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
