import React from "react";

const ToggleSwitches = ({ size, setSize }) => {
  return (
    <div className="flex space-x-4 cursor-pointer">
      {["small", "medium", "large"].map((label) => (
        <label key={label} className="inline-flex items-center me-5 cursor-pointer">
          <input
            type="checkbox"
            value={label}
            checked={size === label}
            onChange={() => setSize(label)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-200">
            {label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default ToggleSwitches;
