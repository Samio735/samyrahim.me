import ChatBubble from "./ChatBubble";

export default function ChatContainer() {
    return (
        <div className="w-full max-w-[500px] h-[400px] relative flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 rounded-t-xl px-4 py-4 bg-slate-700">
                <span className="text-white">AI Assistant</span>
                <div className="bg-green-400 h-2 w-2 rounded-full"></div>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto flex flex-col-reverse gap-2 p-4">
                <ChatBubble 
                    sender="assistant" 
                    message="Hi there! How can I help you with your real estate needs today?"
                />
                <ChatBubble 
                    message="I'm looking for a 2 bedroom apartment in Dubai Marina"
                />
                <ChatBubble 
                    sender="assistant" 
                    message="I can help you with that! What's your budget range for the apartment?"
                />
            </div>

            {/* Input section */}
            <div className="relative p-4 border-t border-slate-200 bg-white">
                <input 
                    type="text"  
                    className="w-full bg-slate-50 rounded-lg px-4 py-3" 
                    placeholder="Type a message"
                />
                <button className="absolute right-6 top-1/2 -translate-y-1/2 opacity-45 hover:opacity-100">
                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

