import React, { useState, useRef, useEffect } from "react";
import { Send, BarChart2, User, Bot, MessageCircle } from "lucide-react";
import axios from "axios";

function Spiriter() {
    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const userMessage = {
            id: Date.now().toString(),
            content: input,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            console.log(input);
            let conversation = "";
            const latestMessages = messages.slice(-3);
            latestMessages.forEach((message) => {
                const time = message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                if (message.sender === "bot") {
                    conversation += `bot (${time}): ${message.content}\n`;
                } else {
                    conversation += `user (${time}): ${message.content}\n`;
                }
            });
            conversation += `bot (${userMessage.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}): ${userMessage.content}\n`;
            const response = await axios.post("http://localhost:4000/api/chatbot/", { message: conversation }, { withCredentials: true });
            const botMessage = {
                id: (Date.now() + 1).toString(),
                content: response.data.response,
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
            >
                <MessageCircle className="h-6 w-6" />
            </button>

            {isChatOpen && (
                <div className="fixed bottom-16 right-8 w-[400px] h-[500px] bg-white shadow-lg rounded-lg flex flex-col">
                    <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-t-lg p-2 flex items-center gap-2 text-2xl">
                        <BarChart2 className="h-6 w-6" />
                        Spiriter
                    </div>

                    <div className="flex-1 p-4 overflow-auto">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`rounded-full p-2 h-10 w-10 ${message.sender === "user" ? "bg-blue-500" : "bg-gradient-to-r from-purple-600 to-purple-400"}`}>
                                            {message.sender === "user" ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
                                        </div>
                                        <div className={`rounded-lg p-3 ${message.sender === "user" ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white" : "bg-gray-100 text-gray-800"}`}>
                                            <p>{message.content}</p>
                                            <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3">
                                        <div className="rounded-full p-2 bg-gradient-to-r from-purple-600 to-purple-400">
                                            <Bot className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className="p-4 border-t">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Ask about cricket stats, players, or matches..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 p-2 border rounded"
                            />
                            <button type="submit" disabled={isLoading} className="bg-blue-500 text-white p-2 rounded">
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Spiriter;