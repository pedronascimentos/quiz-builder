"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/services/api"
import type { QuizSummary } from "@/types/quiz"
import { Plus, Trash2, Eye } from "lucide-react"
import { ConnectionTest } from "@/components/ConnectionTest"

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getQuizzes()

      // Data transformation
      const adaptedData = data.map((quiz) => ({
        ...quiz,
        questionCount: quiz.questionCount || quiz.questions?.length || 0,
      }))

      setQuizzes(adaptedData)
    } catch (err) {
      console.error("Complete error:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch quizzes")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) {
      return
    }

    try {
      await api.deleteQuiz(id)
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id))
      alert("Quiz deleted successfully!")
    } catch (err) {
      console.error("Error deleting quiz:", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">Erro: {error}</p>
          <p className="text-sm text-gray-600 mb-4">Verify that the backend is running at http://localhost:3000</p>
          <Button onClick={fetchQuizzes}>Try again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quiz Dashboard</h1>
          <Link href="/create">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create new quiz
            </Button>
          </Link>
        </div>

        {/* <ConnectionTest /> */}

        {quizzes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No quiz yet</h3>
              <p className="text-gray-600 mb-4">Start by creating your first quiz</p>
              <Link href="/create">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <p className="text-sm text-gray-600">
                    {quiz.questionCount} question{quiz.questionCount !== 1 ? "s" : ""}
                  </p>
                  {quiz.createdAt && (
                    <p className="text-xs text-gray-500">
                      Created: {new Date(quiz.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Link href={`/quizzes/${quiz.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Show details
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(quiz.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
