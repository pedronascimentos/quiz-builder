import type { UseFormRegister, FieldErrors } from "react-hook-form"

interface InputQuestionProps {
  index: number
  register: UseFormRegister<any>
  errors: FieldErrors
  question?: string
  correctAnswer?: string
}

export function InputQuestion({ index, register, errors, question = "", correctAnswer = "" }: InputQuestionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
        <input
          {...register(`questions.${index}.text`, { required: "Question is required" })}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your question"
          defaultValue={question}
        />
        {errors.questions?.[index]?.text && (
          <p className="text-red-500 text-sm mt-1">{errors.questions[index].text?.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
        <input
          {...register(`questions.${index}.correctAnswer`, { required: "Correct answer is required" })}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the correct answer"
          defaultValue={correctAnswer}
        />
        {errors.questions?.[index]?.correctAnswer && (
          <p className="text-red-500 text-sm mt-1">{errors.questions[index].correctAnswer?.message}</p>
        )}
      </div>
    </div>
  )
}