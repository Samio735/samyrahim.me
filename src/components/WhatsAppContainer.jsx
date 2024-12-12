import { useState, useRef } from "react";
import WhatsAppBubble from "./WhatsAppBubble";
import { Tilt } from "./motion-ui/Tilt";
import { Spotlight } from "./motion-ui/Spotlight";
import { Cursor } from "./motion-ui/Cursor";
import { MouseIcon } from "./MouseIcon";

export default function WhatsAppContainer() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Alex from Dubai Premium Properties. I noticed you're interested in Dubai real estate - whether you're looking to invest in a prime location or sell your property, I'd love to help you maximize your opportunity. Are you currently looking to buy or sell?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [appointment, setAppointment] = useState("");
  const [lead, setLead] = useState(null);

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

      const response = await fetch("http://localhost:8787/outbound", {
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
        setLead(parsedResponse.lead);
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
        className="group relative rounded-[2.5rem] w-fit"
      >
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
          springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
        />
        {/* Phone frame styling */}
        <div className="w-[400px] h-[550px] pb-6 relative rounded-[2.5rem] flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-800 p-4">
          <div className="w-full h-full relative rounded-[2rem] flex flex-col overflow-hidden">
            {/* WhatsApp Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54]">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
              <div>
                <span className="text-white font-medium">
                  Alex - Property Sales Consultant
                </span>
                <div className="text-xs text-gray-300">online</div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto bg-[#E5DDD5] scrollbar-thin scrollbar-thumb-gray-300/60 scrollbar-track-transparent hover:scrollbar-thumb-gray-400/60">
              <div className="flex flex-col-reverse gap-2 p-4">
                {[...messages].reverse().map((msg, index) => (
                  <WhatsAppBubble
                    key={index}
                    role={msg.role}
                    content={msg.content}
                  />
                ))}
              </div>
            </div>

            {/* WhatsApp Input */}
            <div className="relative p-2 bg-[#F0F0F0]">
              <div className="relative text-slate-900  flex items-center shadow-md hover:scale-[1.02] transition-transform bg-white rounded-full">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && sendMessage(inputValue)
                  }
                  className="w-full px-4 py-3 pr-12 bg-transparent focus:outline-none rounded-full transition-transform "
                  placeholder="Type a message"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#075E54] text-white cursor-none group"
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
                      <MouseIcon className="h-6 w-6" color="#075E54" />
                    </div>
                  </Cursor>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Tilt>

      <div
        className={`mt-4 p-2 font-light w-[300px] ${
          lead ? "text-green-600 dark:text-green-400" : ""
        }`}
      >
        <span className="font-semibold">Lead Information:</span>{" "}
        {lead ? (
          <span className="">{lead}</span>
        ) : (
          "No lead information collected yet... tell the assistant about the property that you want to sell or buy."
        )}
      </div>
    </div>
  );
}
