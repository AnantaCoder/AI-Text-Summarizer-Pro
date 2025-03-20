import React, { useState } from "react";
import ToggleSwitches from "./ToggleSwitches";
import Result from "./Result";
import DarkModeSwitch from "./DarkModeSwitch";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import NameTag from "./NameTag";
export default function Card() {
  const {
    text,
    setText,
    error,
    summary,
    loading,
    handleSubmit,
    size,
    setSize,
  } = CustomReactQuery("/api/summarize/");

  return (
    <div className="flex justify-center items-center select-none min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <DarkModeSwitch />
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mr-20 ml-20 max-w-svh w-full">
        <h1 className="text-2xl font-bold text-center text-amber-600 mb-2 dark:text-amber-400">
          AI Summarizer Pro
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
          Quickly condense the text into a small{" "}
          <span className="text-lg">COOKIE 🍪</span>
        </p>

        <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">
          Paste your text here:
        </h3>
        <textarea
          placeholder="Enter or paste the text (minimum 100 words)"
          className="w-full bg-blue-50 dark:bg-gray-700 dark:text-gray-200 border border-blue-300 rounded-lg dark:border-gray-600 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <h3 className="text-lg font-semibold mt-4 dark:text-gray-300">
          Select Summary Length:
        </h3>
        {/* Pass the parent's state and setter */}
        <ToggleSwitches size={size} setSize={setSize} />

        <button
          className="mt-4 w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all"
          onClick={handleSubmit} // Ensure we pass the function reference
          disabled={loading}
        >
          {loading ? (
            <CircleLoader color="#f8ff77" loading size={25} />
          ) : (
            "Summarize TEXT"
          )}
        </button>
        {error && (
          <span className="block mx-auto my-4 p-2 text-center text-amber-500 font-bold text-xl border border-amber-500 rounded-lg bg-red-50">
            Something went wrong. Please try again. {`${error}`}
          </span>
        )}

        <Result summary={summary} />
        <NameTag/>
      </div>
    </div>
  );
}

const CustomReactQuery = (urlPath) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("medium");

  const handleSubmit = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      setLoading(true);
      const response = await axios.post(
        urlPath,
        {
          text: text,
          size: size,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          signal,
        }
      );
      console.log(response);
      if(text.length < 100 || text.length > 10000) {
        setError("Text length must be between 100 and 10000 characters");
        return;
      }
      setSummary(response.data.summary);
      setError(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled", error.message);
        console.error("Error details:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Error connecting to server");
        return;
      }
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    text,
    setText,
    error,
    summary,
    loading,
    handleSubmit,
    setSize,
    size,
  };
};

export { CustomReactQuery };
