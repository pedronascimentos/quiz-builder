export interface Quiz {
  id: number
  title: string
  name?: string | null
  createdAt: string
  questions: Question[]
}

export interface Question {
  id?: number
  text: string 
  type: "BOOLEAN" | "INPUT" | "CHECKBOX" 
  options: string 
  quizId?: number
}

export interface QuizSummary {
  id: number
  title: string
  questionCount: number
}

export interface CreateQuizRequest {
  title: string
  questions: Array<{
    text: string
    type: "BOOLEAN" | "INPUT" | "CHECKBOX"
    options: string
  }>
}
