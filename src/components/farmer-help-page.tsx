import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Mic, Send, HelpCircle, MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AnimatedBackground } from "./animated-background";

interface FarmerHelpPageProps {
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function FarmerHelpPage({ onBack }: FarmerHelpPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! 🙏 I'm your AI farming assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const quickQuestions = [
    { emoji: "💧", text: "When should I water my crops?" },
    { emoji: "🧪", text: "Which fertilizer should I use?" },
    { emoji: "🌾", text: "When is the best harvest time?" },
    { emoji: "🌧️", text: "What about the weather forecast?" },
    { emoji: "🐛", text: "How to control pests?" },
    { emoji: "💰", text: "What's my expected profit?" },
  ];

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      
      if (text.toLowerCase().includes("water")) {
        botResponse = "Based on your crop and current weather, water your fields every 7-10 days. Next irrigation recommended in 5 days. With expected rainfall this week, you can skip one watering cycle! 💧";
      } else if (text.toLowerCase().includes("fertilizer")) {
        botResponse = "For your wheat crop, I recommend NPK 19:19:19 at 200 kg/acre. Split application: 80kg during sowing, 60kg during tillering (in 15 days), and 60kg during flowering stage. 🧪";
      } else if (text.toLowerCase().includes("harvest")) {
        botResponse = "Based on your sowing date and crop growth, optimal harvest time is in approximately 120 days, around mid-March 2025. I'll send you reminders as we get closer! 🌾";
      } else if (text.toLowerCase().includes("weather")) {
        botResponse = "7-day forecast shows moderate rainfall (15-20mm) expected Wed-Fri. Temperature range: 26-30°C. Good conditions for crop growth! ☀️🌧️";
      } else if (text.toLowerCase().includes("pest")) {
        botResponse = "Monitor for common wheat pests like aphids and army worms. Use neem-based organic pesticides as a preventive measure. Inspect your crops every 3-4 days. 🐛";
      } else if (text.toLowerCase().includes("profit")) {
        botResponse = "Based on 8.5 tons/acre yield at ₹30,000/ton, your expected revenue is ₹2,55,000. After costs of ₹1,20,000, net profit: ₹1,35,000 (53% margin)! 💰";
      } else {
        botResponse = "I understand your question! For detailed guidance, please contact our expert team or visit the specific dashboard section. Is there anything specific about water, fertilizer, or harvest timing I can help with? 😊";
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, this would activate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setInputMessage("When should I water my crops?");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100 rounded-full"
          >
            ← Back
          </Button>

          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
                👨‍🌾
              </div>
            </motion.div>
            <div>
              <h1 className="text-green-800">Farmer Help Assistant</h1>
              <p className="text-green-600">Ask me anything about your farm!</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="text-green-700 mb-3">Quick Questions:</h3>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <motion.button
                key={index}
                onClick={() => handleSendMessage(question.text)}
                className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{question.emoji}</span>
                <span className="text-green-800 text-sm">{question.text}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-green-100 rounded-3xl shadow-lg overflow-hidden">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-green-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-xl">👨‍🌾</div>
                          <span className="text-xs text-gray-600">AI Assistant</span>
                        </div>
                      )}
                      <p className={message.sender === "user" ? "text-white" : "text-gray-800"}>
                        {message.text}
                      </p>
                      <div
                        className={`text-xs mt-2 ${
                          message.sender === "user" ? "text-green-100" : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="border-t-2 border-green-100 p-4 bg-green-50/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your question here..."
                  className="flex-1 px-4 py-3 rounded-2xl border-2 border-green-200 focus:border-green-600 focus:outline-none"
                />

                <Button
                  onClick={handleVoiceInput}
                  className={`rounded-2xl px-4 ${
                    isListening
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isListening ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Mic size={20} />
                    </motion.div>
                  ) : (
                    <Mic size={20} />
                  )}
                </Button>

                <Button
                  onClick={() => handleSendMessage()}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-4"
                >
                  <Send size={20} />
                </Button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-4 text-xs text-green-600">
                <div className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  <span>Type or speak</span>
                </div>
                <div className="flex items-center gap-1">
                  <HelpCircle size={14} />
                  <span>Ask anything about farming</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Language Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <Card className="inline-block bg-white/90 backdrop-blur-sm border-2 border-green-100 rounded-2xl px-6 py-3">
            <p className="text-green-700">
              🌐 Available in: <strong>English</strong>, हिंदी, मराठी, தமிழ், తెలుగు
            </p>
          </Card>
        </motion.div>

        {/* Help Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: "📱",
              title: "24/7 Support",
              desc: "Get instant answers anytime",
            },
            {
              icon: "🎙️",
              title: "Voice Support",
              desc: "Speak in your language",
            },
            {
              icon: "🎓",
              title: "Expert Tips",
              desc: "AI-powered recommendations",
            },
          ].map((tip, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/90 backdrop-blur-sm border-2 border-green-100 rounded-2xl p-4 text-center"
            >
              <div className="text-3xl mb-2">{tip.icon}</div>
              <h4 className="text-green-800 mb-1">{tip.title}</h4>
              <p className="text-green-600 text-sm">{tip.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
