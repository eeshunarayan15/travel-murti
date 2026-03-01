import { useState } from "react";
import { BOT_NAME, STEPS } from "./chatbot.config";
import { sendChatLead } from "./chatbot.service";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(STEPS.START);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [messages, setMessages] = useState([
    { bot: "Welcome to Travel Murti! Type anything to start." },
  ]);

  const pushBot = (text) =>
    setMessages((prev) => [...prev, { bot: text }]);

  const pushUser = (text) =>
    setMessages((prev) => [...prev, { user: text }]);

  const handleSend = async () => {
    if (!input.trim()) return;

    pushUser(input);

    switch (step) {
      case STEPS.START:
        pushBot(`We are ${BOT_NAME}. What's your name?`);
        setStep(STEPS.NAME);
        break;

      case STEPS.NAME:
        setUserData((p) => ({ ...p, name: input }));
        pushBot("Great! What's your email?");
        setStep(STEPS.EMAIL);
        break;

      case STEPS.EMAIL:
        setUserData((p) => ({ ...p, email: input }));
        pushBot("Finally, your phone number?");
        setStep(STEPS.PHONE);
        break;

      case STEPS.PHONE:
        const payload = { ...userData, phone: input };
        setUserData(payload);

        pushBot(
          `Thanks ${payload.name}! Our team will contact you shortly.`
        );

        await sendChatLead(payload);
        setStep(STEPS.DONE);
        break;

      default:
        break;
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between">
            <span>{BOT_NAME}</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className="my-2">
                {m.bot && <div className="bg-blue-100 p-2 rounded">{m.bot}</div>}
                {m.user && (
                  <div className="bg-purple-100 p-2 rounded ml-auto">
                    {m.user}
                  </div>
                )}
              </div>
            ))}
          </div>

          {step < STEPS.DONE && (
            <div className="p-2 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border rounded px-2"
                placeholder="Type here..."
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white px-4 rounded"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;