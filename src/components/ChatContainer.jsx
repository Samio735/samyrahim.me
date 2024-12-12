import { useState, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { Tilt } from "./motion-ui/Tilt";
import { Spotlight } from "./motion-ui/Spotlight";
import { Cursor } from "./motion-ui/Cursor";
import { MouseIcon } from "./MouseIcon";

export default function ChatContainer() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! Welcome to Bright Smile Dental Clinic. How can I assist you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [appointment, setAppointment] = useState("");

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    console.log("Sending message:", userMessage);
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);
    try {
      console.log("Request payload:", {
        messages: newMessages.slice(0, -1),
        prompt: userMessage,
      });

      const response = await fetch("http://localhost:8787/inbound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.slice(0, -1), // all messages except the last one
          prompt: userMessage,
        }),
      });

      const data = await response.json();
      console.log("API response:", data);

      let parsedResponse;
      try {
        parsedResponse =
          typeof data.response === "string"
            ? JSON.parse(data.response)
            : data.response;
        console.log("Parsed response:", parsedResponse);

        // Add message
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: parsedResponse.message,
          },
        ]);
        setAppointment(parsedResponse.appointment);
      } catch (error) {
        console.error("Failed to parse response:", error);
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "Sorry, I couldn't process that response.",
            appointment: null,
          },
        ]);
      }
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Tilt
        rotationFactor={4}
        isRevese
        style={{ transformOrigin: "center center" }}
        springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
        className="group relative rounded-xl "
      >
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
          springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
        />
        <div
          className="w-full max-w-[500px] h-[400px] relative rounded-xl flex flex-col"
          style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2  px-4 py-4 bg-blue-500">
            <span className="text-white">Bright Smile Dental Assistant</span>
            <div
              className={`h-2 w-2 rounded-full ${
                isLoading ? "bg-yellow-400" : "bg-green-400"
              }`}
            ></div>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto bg-sky-50 ">
            <div className="flex flex-col-reverse gap-2 p-4">
              {[...messages].reverse().map((msg, index) => (
                <div key={index}>
                  <ChatBubble role={msg.role} content={msg.content} />
                </div>
              ))}
            </div>
          </div>

          {/* Input section */}
          <div className="relative p-4 bg-sky-50">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
              className="w-full bg-white text-black rounded-lg px-4 py-3 pr-12 shadow-md transition-transform hover:scale-[1.05] focus:scale-[1.05] focus:outline-none"
              placeholder="Type a message"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={isLoading}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center cursor-none group disabled:opacity-25"
            >
              <Cursor
                attachToParent
                variants={{
                  initial: { scale: 0.3, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  exit: { scale: 0.3, opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
                className="absolute z-50"
              >
                <div className="flex items-center translatex-4">
                  <MouseIcon className="h-6 w-6" color="#3b82f6" />
                </div>
              </Cursor>
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </Tilt>

      <div
        className={`mt-4 p-2 font-light w-[300px] ${
          appointment ? "text-green-600 dark:text-green-400" : ""
        }`}
      >
        <span className="font-semibold"> Result:</span>{" "}
        {appointment || "No appointment booked yet..."}
      </div>
    </div>
  );
}
