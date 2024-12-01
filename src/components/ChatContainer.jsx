import { useState, useRef } from "react";
import ChatBubble from "./ChatBubble";

export default function ChatContainer() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi there! How can I help you with your real estate needs today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    const sendMessage = async (userMessage) => {
        if (!userMessage.trim()) return;
        
        const newMessages = [...messages, { role: "user", content: userMessage }];
        setMessages(newMessages);
        setInputValue("");
        setIsLoading(true);
        try {
            const response = await fetch("https://flat-voice-77cf.samyrahim07.workers.dev", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages.slice(0, -1), // all messages except the last one
                    prompt: userMessage
                })
            });
            
            const data = await response.json();
            setMessages([...newMessages, { role: "assistant", content: data.response }]);
        } catch (error) {
            console.error("Failed to get AI response:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[500px] h-[400px] relative rounded-t-xl flex flex-col"   
        style={{boxShadow: "0 2px 4px rgba(0,0,0,0.1)"}}>
            {/* Header */}
            <div className="flex items-center gap-2 rounded-t-xl px-4 py-4 bg-slate-700">
                <span className="text-white">AI Assistant</span>
                <div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-800">
                <div className="flex flex-col-reverse gap-2 p-4">
                    {[...messages].reverse().map((msg, index) => (
                        <ChatBubble 
                            key={index}
                            role={msg.role}
                            content={msg.content}
                        />
                    ))}
                </div>
            </div>

            {/* Input section */}
            <div className="relative p-4 bg-white dark:bg-slate-800">
                <input 
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
                    className="w-full dark:bg-slate-600 bg-slate-50 text-black dark:text-white rounded-lg px-4 py-3" 
                    placeholder="Type a message"
                    disabled={isLoading}
                />
                <button 
                    onClick={() => sendMessage(inputValue)}
                    disabled={isLoading}
                    className="absolute right-6 top-1/2 -translate-y-1/2 dark:text-white opacity-45 hover:opacity-100 disabled:opacity-25"
                >
                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

