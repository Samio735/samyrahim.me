export default function ChatBubble({ role = "user", content = "" }) {
    return (
        <div className={`flex ${role === "assistant" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                role === "assistant" 
                    ? "bg-white  text-slate-800" 
                    : "bg-blue-500 text-white"
            }`}>
                {content}
            </div>
        </div>
    )
}