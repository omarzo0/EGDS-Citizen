"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/citizen/chat-List"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data.questions);
      } catch (err) {
        setError("Failed to load questions. Please try again later.");
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionClick = (item) => {
    setSelectedQuestion(item);
    setShowAnswer(true);
  };

  const resetChat = () => {
    setSelectedQuestion(null);
    setShowAnswer(false);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      resetChat();
    }
  };

  return (
    <>
      {/* Chat Icon Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#872341] hover:bg-black text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-40">
          {/* Chat Header */}
          <div className="bg-[#872341] text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Chat Support</h3>
            <p className="text-sm opacity-90">How can we help you?</p>
          </div>

          {/* Chat Content */}
          <div className="p-4 h-64 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-sm text-center p-4">
                {error}
              </div>
            ) : !showAnswer ? (
              // Show Questions List
              <div>
                <p className="text-gray-600 text-sm mb-4">
                  Please select a question:
                </p>
                <div className="space-y-2">
                  {questions.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => handleQuestionClick(item)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border text-sm transition-colors"
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Show Question and Answer
              <div className="space-y-4">
                {/* User Question */}
                <div className="flex justify-end">
                  <div className="bg-[#872341] text-white p-3 rounded-lg max-w-xs text-sm">
                    {selectedQuestion.question}
                  </div>
                </div>

                {/* Bot Answer */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg max-w-xs text-sm">
                    {selectedQuestion.answer}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Footer */}
          {showAnswer && (
            <div className="p-4 border-t">
              <button
                onClick={resetChat}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm transition-colors"
              >
                Ask Another Question
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
