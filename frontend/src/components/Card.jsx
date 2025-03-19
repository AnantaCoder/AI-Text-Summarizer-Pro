import React from "react";
import ToggleSwitches from "./ToggleSwitches";

export default function Card() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-amber-600 mb-2">
          AI Summarizer Pro
        </h1>
        <p className="text-gray-700 text-center mb-4">
          Quickly condense the text into a small <span className="text-lg">COOKIE 🍪</span>
        </p>

        <h3 className="text-lg font-semibold mb-2">Paste your text here:</h3>
        <textarea
          placeholder="Enter or paste the text (minimum 100 words)"
          className="w-full bg-blue-50 border border-blue-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="5"
        ></textarea>

        <h3 className="text-lg font-semibold mt-4">Select Summary Length:</h3>
        <ToggleSwitches />

        <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all">
          Summarize TEXT
        </button>
      </div>
    </div>
  );
}
