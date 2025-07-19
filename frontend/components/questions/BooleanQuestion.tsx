import type { UseFormRegister, FieldErrors } from "react-hook-form"

interface BooleanQuestionProps {
  index: number
  register: UseFormRegister<any>
  errors: FieldErrors
  question?: string
  correctAnswer?: boolean
}

export function BooleanQuestion({ index, register, errors, question = "", correctAnswer }: BooleanQuestionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
        <input
          {...register(`questions.${index}.text`, { required: "Question is required" })}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your true/false question"
          defaultValue={question}
        />
        {errors.questions?.[index]?.text && (
          <p className="text-red-500 text-sm mt-1">{errors.questions[index].text?.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              {...register(`questions.${index}.correctAnswer`)}
              type="radio"
              value="true"
              className="mr-2"
              defaultChecked={correctAnswer === true}
            />
            True
          </label>
          <label className="flex items-center">
            <input
              {...register(`questions.${index}.correctAnswer`)}
              type="radio"
              value="false"
              className="mr-2"
              defaultChecked={correctAnswer === false}
            />
            False
          </label>
        </div>
      </div>
    </div>
  )
}