import { useEffect, useState } from "react";

export default function DarkModeSwitch() {
    const [isOn, setIsOn] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (isOn) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            console.log("Dark mode enabled");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            console.log("Dark mode disabled");
        }
    }, [isOn]);

    return (
        <div className="fixed right-4 top-1 flex flex-col justify-center items-center gap-2 m-1">
            <div
                className={`relative flex items-center p-1 rounded-full w-20 h-10 cursor-pointer transition-all duration-500 ease-in-out select-none ${
                    isOn
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : "bg-gradient-to-r from-amber-400 to-orange-400"
                } shadow-lg hover:shadow-xl`}
                onClick={() => setIsOn(!isOn)}>
                <div
                    className={`absolute w-8 h-8 bg-white rounded-full shadow-lg transform transition-all duration-500 ease-in-out flex items-center justify-center ${
                        isOn ? "translate-x-10 rotate-[360deg]" : "translate-x-0 rotate-0"
                    }`}>
                    <span className={`text-xl transition-opacity duration-300 ${isOn ? "opacity-100" : "opacity-0"}`}>
                        🌙
                    </span>
                    <span
                        className={`absolute text-xl transition-opacity duration-300 ${
                            !isOn ? "opacity-100" : "opacity-0"
                        }`}>
                        ☀️
                    </span>
                </div>
            </div>

            <span
                className={`text-xl font-semibold transition-all duration-500 ${
                    isOn ? "text-indigo-500 tracking-widest" : "text-amber-500 tracking-normal"
                }`}>
                {isOn ? "Night" : "Day"}
            </span>
        </div>
    );
}
