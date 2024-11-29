import ChatBubble from "./ChatBubble";

export default function ChatContainer() {
    return (
        <div className="w-[500px] h-[400px] relative flex   flex-col-reverse gap-2 " style={{}}>
            <div className=" absolute top-0 flex items-center gap-2 rounded-t-xl px-4 py-4 bg-slate-700 w-full">
                <span className="text-white">AI Assistant</span>
                <div className="bg-green-400 h-2 w-2 rounded-full"></div>
            </div>
            <div className="relative">
                          <input type="text"  className="w-full bg-slate-50   mt-2 px-4 py-4  " placeholder="Type a message"/>
                          <svg className="absolute right-2 opacity-45 size-6 top-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>
</div>
                   

            <ChatBubble sender="assistant"/>
             <ChatBubble/>
              <ChatBubble  sender="assistant"/>
        </div>
    )
}

