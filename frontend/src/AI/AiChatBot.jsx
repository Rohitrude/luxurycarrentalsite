import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";

const AIChatWidget = () => {

const {axios, user} = useAppContext();

const messagesEndRef = useRef(null);

const [open, setOpen] = useState(false);
const [isTyping, setIsTyping] = useState(false);
const [messages, setMessages] = useState([
        { role: "ai", text: "Hi 👋 I’m your AI car rental assistant." }
]);
const [input, setInput] = useState("");

    const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    try {
        const res = await axios.post("/api/ai/chat", {
        message: input
        });

        setMessages(prev => [...prev, { role: "ai", text: res.data.reply }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: "ai", text: "⚠️ AI service unavailable" }]);
    }finally{
        setIsTyping(false);
    }
};

//Auto Scrolling
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, isTyping]);




    return (
        <>
            {/* Floating AI Logo Button */}
            <button onClick={() => setOpen(true)} className="fixed bottom-5 right-4 md:right-10 z-50 w-14 h-14
            rounded-full bg-gradient-to-tr from-blue-500 via-purple-400 to-cyan-400 p-[3px] 
            shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:scale-110 transition" title="AI Assistant">
                <div className="w-full h-full rounded-full bg-black flex items-center
                 justify-center text-white font-bold cursor-pointer">
                    AI
                </div>
            </button>


            {/* Chat Box */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.6, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed z-50 bottom-0 right-0 w-full h-full sm:bottom-4 sm:right-4 
                        sm:w-96 sm:h-[520px] bg-white sm:rounded-2xl shadow-xl flex flex-col
                        overflow-hidden">
                        {/* Header */}
                        <div className="bg-[#0b2a3a] text-white px-4 py-3 flex justify-between items-center">
                            <span className="font-medium">AI Assistant</span>
                            <button onClick={() => setOpen(false)}>✕</button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${msg.role === "user"
                                            ? "bg-blue-500 text-white ml-auto"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                            {/* AI is typing... indicator */}
                            {isTyping && (
                                <div className="text-sm text-gray-400 italic mt-2">
                                    AI is typing...
                                </div>
                            )}
                            
                            {/* Auto-scrolling Feature */}
                            <div ref={messagesEndRef} />

                        </div>

                        {/* Input */}
                        <div className="border-t p-3 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask about cars, budget, seats..."
                                className="flex-1 px-3 py-2 border rounded-lg text-base sm:text-sm focus:outline-none"
                                onKeyDown={e => {
                                    if (e.key === "Enter" && !isTyping) sendMessage();
                                }}

                            />
                            <button
                                onClick={sendMessage}
                                disabled={isTyping}
                                className={`px-4 rounded-lg transition ${
                                    isTyping
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#0b2a3a] text-white hover:bg-[#0f3c54]"
                                }`}
                            >
                            Send
                            </button>

                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatWidget;
