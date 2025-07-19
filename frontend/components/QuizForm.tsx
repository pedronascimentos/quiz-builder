"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BooleanQuestion } from "./questions/BooleanQuestion"
import { InputQuestion } from "./questions/InputQuestion"
import { CheckboxQuestion } from "./questions/CheckboxQuestion"
import { api } from "@/services/api"
import type { CreateQuizRequest } from "@/types/quiz"
import { Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface QuizFormData {
  title: string
  questions: Array<{
    type: "BOOLEAN" | "INPUT" | "CHECKBOX"
    text: string
    options?: string[]
    correctAnswers?: string[]
    correctAnswer?: boolean | string
  }>
}

export function QuizForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<QuizFormData>({
    defaultValues: {
      title: "",
      questions: [{ type: "BOOLEAN", text: "", options: [""] }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  })

  const watchedQuestions = watch("questions")

  const addQuestion = () => {
    append({ type: "BOOLEAN", text: "", options: [""] })
  }

  const removeQuestion = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  const handleTypeChange = (index: number, newType: "BOOLEAN" | "INPUT" | "CHECKBOX") => {
    setValue(`questions.${index}.type`, newType)
    if (newType === "CHECKBOX") {
      setValue(`questions.${index}.options`, [""])
    }
  }

  const onSubmit = async (data: QuizFormData) => {
    setIsSubmitting(true)
    try {
      const processedQuestions = data.questions.map((q) => {
        switch (q.type) {
          case "BOOLEAN":
            return {
              text: q.text,
              type: "BOOLEAN" as const,
              options: JSON.stringify(["True", "False"]),
            }
          case "INPUT":
            return {
              text: q.text,
              type: "INPUT" as const,
              options: "",
            }
          case "CHECKBOX":
            return {
              text: q.text,
              type: "CHECKBOX" as const,
              options: JSON.stringify(q.options || []),
            }
          default:
            return {
              text: q.text,
              type: q.type,
              options: "",
            }
        }
      })

      const quizData: CreateQuizRequest = {
        title: data.title,
        questions: processedQuestions,
      }

      console.log("Sending data:", quizData)
      await api.createQuiz(quizData)
      alert("Quiz successfully created!")
      router.push("/quizzes")
    } catch (error) {
      console.error("Error creating quiz:", error)
      alert("Failed to create quiz. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
              <input
                {...register("title", { required: "Quiz title is required" })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the quiz title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Questions</h3>
                <Button
                  type="button"
                  onClick={addQuestion}
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <div className="flex items-center space-x-2">
                      <Select
                        value={watchedQuestions[index]?.type || "BOOLEAN"}
                        onValueChange={(value: "BOOLEAN" | "INPUT" | "CHECKBOX") => {
                          handleTypeChange(index, value)
                        }}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BOOLEAN">True/False</SelectItem>
                          <SelectItem value="INPUT">Text</SelectItem>
                          <SelectItem value="CHECKBOX">Multiple Choice</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeQuestion(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <input
                    {...register(`questions.${index}.type`)}
                    type="hidden"
                    value={watchedQuestions[index]?.type || "BOOLEAN"}
                  />

                  {watchedQuestions[index]?.type === "BOOLEAN" && (
                    <BooleanQuestion index={index} register={register} errors={errors} />
                  )}

                  {watchedQuestions[index]?.type === "INPUT" && (
                    <InputQuestion index={index} register={register} errors={errors} />
                  )}

                  {watchedQuestions[index]?.type === "CHECKBOX" && (
                    <CheckboxQuestion index={index} register={register} errors={errors} control={control} />
                  )}
                </Card>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/quizzes")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600 text-white">
                {isSubmitting ? "Creating..." : "Create Quiz"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
