"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/services/api"
import type { Quiz } from "@/types/quiz"
import { ArrowLeft, Circle } from "lucide-react"

export default function QuizDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchQuiz(params.id as string)
    }
  }, [params.id])

  const fetchQuiz = async (id: string) => {
    try {
      setLoading(true)
      const data = await api.getQuiz(id)
      setQuiz(data)
    } catch (err) {
      setError("Failed to fetch quiz")
      console.error("Error fetching quiz:", err)
    } finally {
      setLoading(false)
    }
  }

  const parseOptions = (optionsString: string): string[] => {
    try {
      if (!optionsString || optionsString === "") return []
      return JSON.parse(optionsString)
    } catch {
      return []
    }
  }

  const renderQuestion = (question: Quiz["questions"][0], index: number) => {
    const options = parseOptions(question.options)

    return (
      <Card key={question.id} className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Question {index + 1}</CardTitle>
            <Badge variant="outline" className="border-orange-500 text-orange-600">
              {question.type === "BOOLEAN"
                ? "True/False"
                : question.type === "INPUT"
                  ? "Text"
                  : "Multiple Choice"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800 mb-4 font-medium">{question.text}</p>

          {question.type === "BOOLEAN" && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Circle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">True</span>
              </div>
              <div className="flex items-center space-x-2">
                <Circle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">False</span>
              </div>
            </div>
          )}

          {question.type === "INPUT" && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-sm text-gray-600 mb-1">Free text question</p>
              <p className="text-blue-700 font-medium">The user will type the answer</p>
            </div>
          )}

          {question.type === "CHECKBOX" && options.length > 0 && (
            <div className="space-y-2">
              {options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <Circle className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{option}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Quiz not found"}</p>
          <Button onClick={() => router.push("/quizzes")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quizzes
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.push("/quizzes")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quizzes
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{quiz.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  {quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}
                </span>
                <span>Created: {new Date(quiz.createdAt).toLocaleDateString("en-US")}</span>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-4">
          {quiz.questions.map((question, index) => renderQuestion(question, index))}
        </div>
      </div>
    </div>
  )
}
