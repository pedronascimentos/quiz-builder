import type { Quiz, QuizSummary, CreateQuizRequest } from "@/types/quiz"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

console.log("Configured API_URL:", API_URL)

export const api = {
  async createQuiz(quiz: CreateQuizRequest): Promise<Quiz> {
    console.log("Creating quiz:", quiz)

    try {
      const response = await fetch(`${API_URL}/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", errorText)
        throw new Error(`Failed to create quiz: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log("Quiz created successfully:", result)
      return result
    } catch (error) {
      console.error("Error creating quiz:", error)
      throw error
    }
  },

  async getQuizzes(): Promise<QuizSummary[]> {
    console.log("Fetching quizzes from:", `${API_URL}/quizzes`)

    try {
      const response = await fetch(`${API_URL}/quizzes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", errorText)
        throw new Error(`Failed to fetch quizzes: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log("Quizzes retrieved:", result)
      return result
    } catch (error) {
      console.error("Error fetching quizzes:", error)
      throw error
    }
  },

  async getQuiz(id: string): Promise<Quiz> {
    console.log("Fetching quiz:", id)

    try {
      const response = await fetch(`${API_URL}/quizzes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", errorText)
        throw new Error(`Failed to fetch quiz: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log("Quiz retrieved:", result)
      return result
    } catch (error) {
      console.error("Error fetching quiz:", error)
      throw error
    }
  },

  async deleteQuiz(id: string): Promise<void> {
    console.log("Deleting quiz:", id)

    try {
      const response = await fetch(`${API_URL}/quizzes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", errorText)
        throw new Error(`Failed to delete quiz: ${response.status} - ${errorText}`)
      }

      console.log("Quiz deleted successfully")
    } catch (error) {
      console.error("Error deleting quiz:", error)
      throw error
    }
  },
}
