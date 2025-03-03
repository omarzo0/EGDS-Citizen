"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../lib/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../lib/ui/card";
import { Textarea } from "../../../lib/ui/textarea";
import { Send, MessageSquare } from "lucide-react";

export default function FeedbackPage() {
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Load feedback from localStorage on component mount
  useEffect(() => {
    const storedFeedback = localStorage.getItem("userFeedback");
    if (storedFeedback) {
      setFeedbackList(JSON.parse(storedFeedback));
    }
  }, []);

  // Save feedback to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userFeedback", JSON.stringify(feedbackList));
  }, [feedbackList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedbackText.trim()) return;

    const newFeedback = {
      id: Date.now().toString(),
      content: feedbackText,
      createdAt: new Date().toISOString(),
    };

    setFeedbackList([newFeedback, ...feedbackList]);
    setFeedbackText("");
    setIsModalOpen(false); // Close modal after feedback is submitted
  };

  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Feedback History */}
        <Card>
          <CardHeader>
            <CardTitle>My Feedback History</CardTitle>
            <CardDescription>
              Review all the feedback you've submitted
            </CardDescription>
            <div className="flex justify-end">
              <Button onClick={() => setIsModalOpen(true)}>
                Share Your Thoughts
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {feedbackList.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>You haven't submitted any feedback yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {feedbackList.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardContent className="pt-6">
                      <p className="whitespace-pre-wrap">{feedback.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Submitted {formatRelativeTime(feedback.createdAt)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Button to open the modal */}

        {/* Modal for Feedback Submission */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <CardHeader>
                <CardTitle>Share Your Thoughts</CardTitle>
                <CardDescription>
                  We value your feedback. Let us know what you think!
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent>
                  <Textarea
                    placeholder="Type your feedback here..."
                    className="min-h-[150px]"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={!feedbackText.trim()}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Feedback
                  </Button>
                </CardFooter>
              </form>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
