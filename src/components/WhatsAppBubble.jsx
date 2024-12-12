export default function WhatsAppBubble({ role = "user", content = "" }) {
    return (
        <div className={`flex ${role === "assistant" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[80%] rounded-lg px-4 py-2 relative ${
                role === "assistant" 
                    ? "bg-white text-slate-800" 
                    : "bg-[#DCF8C6] text-slate-800"
            }`}>
                {content}
                <span className="text-xs text-gray-500 ml-2">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
}
