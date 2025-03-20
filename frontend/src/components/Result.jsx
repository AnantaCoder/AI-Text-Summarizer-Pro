import React, { useRef } from "react";

export default function Result() {
    const textAreaRef = useRef(null)
    const [text, setText] = React.useState("")
    const copyText = () => {
        // const text = document.querySelector('textarea').value
        if(textAreaRef.current){
            navigator.clipboard.writeText(textAreaRef.current.value)
            alert("Copied to clipboard")
        }
        else{
            console.log("No text to copy")
        }

    }
    const handleDownload = ()=>{
        //blob - binary large object in the form of text

        if(text.trim() ==='') {
            console.log("No text to download") 
            return;

        }
        const blob = new Blob([text],{type:'text/plain'})
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        let randomNumber = Math.floor(Math.random() * 1000)
        link.download = `summarized_text_${randomNumber}.txt`
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }
  return (
    <div className="p-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center dark:text-gray-200">
          ✨ Summarized Text
        </h2>

        <div className="relative group">
          <textarea
            readOnly
            ref={textAreaRef}
            value={text}
            onChange={(e)=>setText(e.target.value)}
            rows="6"
            placeholder="Your summarized text will appear here..."
            className="w-full px-6 py-4 text-lg text-gray-700 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-gray-200 
            shadow-md hover:shadow-lg transition-shadow duration-300 resize-none
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
            placeholder-gray-400 leading-relaxed
            dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-gray-200"
          />

          <div className="absolute inset-0 rounded-xl pointer-events-none border-[1px] border-white/50 shadow-inner" />
          <div className="absolute top-3 right-3 flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-red-400" />
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
            transition-colors duration-300 flex items-center"

            onClick={copyText}
          >
            <span>📋 Copy</span>
          </button>
          <button
            className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 
            cursor-pointer
            transition-colors duration-300 flex items-center"
            onClick={handleDownload}
          >
            <span>⬇️ Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
