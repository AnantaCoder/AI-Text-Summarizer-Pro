import React from "react";
import ToggleSwitches from "./ToggleSwitches";
import Result from "./Result";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Card() {
  return (
    <div className=" flex justify-center items-center select-none min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <DarkModeSwitch/>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mr-20 ml-20 max-w-svh w-full">
        <h1 className="text-2xl font-bold text-center text-amber-600 mb-2 dark:text-amber-400">
          AI Summarizer Pro
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
          Quickly condense the text into a small <span className="text-lg">COOKIE 🍪</span>
        </p>

        <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Paste your text here:</h3>
        <textarea
          placeholder="Enter or paste the text (minimum 100 words)"
          className="w-full bg-blue-50 dark:bg-gray-700 dark:text-gray-200 border border-blue-300 rounded-lg dark:border-gray-600 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="5"
        ></textarea>

        <h3 className="text-lg font-semibold mt-4 dark:text-gray-300">Select Summary Length:</h3>
        <ToggleSwitches />

        <button className="mt-4 w-full cursor-cell bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all">
          Summarize TEXT
        </button>
        <Result/>
      </div>
    </div>
  );
}
