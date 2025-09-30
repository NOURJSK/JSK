"use client"

import { useState } from "react"
import { MessageSquare, X, Send, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface FeedbackData {
  type: "bug" | "feature" | "general"
  rating: number
  message: string
  page: string
}

export function UserFeedback() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<"rating" | "details" | "success">("rating")
  const [feedback, setFeedback] = useState<Partial<FeedbackData>>({
    page: typeof window !== "undefined" ? window.location.pathname : "",
  })

  const handleRating = (rating: number) => {
    setFeedback((prev) => ({ ...prev, rating }))
    setStep("details")
  }

  const handleSubmit = async () => {
    // In a real app, this would send to your analytics/feedback service
    console.log("Feedback submitted:", feedback)
    setStep("success")
    setTimeout(() => {
      setIsOpen(false)
      setStep("rating")
      setFeedback({ page: window.location.pathname })
    }, 2000)
  }

  return (
    <>
      {/* Feedback Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 bg-green-500 hover:bg-green-600 text-black rounded-full p-3 shadow-lg"
        aria-label="Provide feedback"
      >
        <MessageSquare className="w-5 h-5" />
      </Button>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Feedback</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {step === "rating" && (
                <div className="space-y-4">
                  <p className="text-gray-300">How was your experience on this page?</p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleRating(1)}
                      className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleRating(5)}
                      className="flex-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {step === "details" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      What type of feedback is this?
                    </label>
                    <select
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                      value={feedback.type || ""}
                      onChange={(e) => setFeedback((prev) => ({ ...prev, type: e.target.value as any }))}
                    >
                      <option value="">Select type</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="general">General Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tell us more (optional)</label>
                    <textarea
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white h-24 resize-none"
                      placeholder="Your feedback helps us improve..."
                      value={feedback.message || ""}
                      onChange={(e) => setFeedback((prev) => ({ ...prev, message: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleSubmit} className="w-full bg-green-500 hover:bg-green-600 text-black">
                    <Send className="w-4 h-4 mr-2" />
                    Send Feedback
                  </Button>
                </div>
              )}

              {step === "success" && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <ThumbsUp className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Thank you!</h4>
                    <p className="text-gray-300">Your feedback helps us improve the experience.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
