"use client"

import { type UseFormRegister, type FieldErrors, useFieldArray, type Control } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

interface CheckboxQuestionProps {
  index: number
  register: UseFormRegister<any>
  errors: FieldErrors
  control: Control<any>
  question?: string
  options?: string[]
  correctAnswers?: string[]
}

export function CheckboxQuestion({
  index,
  register,
  errors,
  control,
  question = "",
  options = [""],
  correctAnswers = [],
}: CheckboxQuestionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  })

  const addOption = () => {
    append("")
  }

  const removeOption = (optionIndex: number) => {
    if (fields.length > 1) {
      remove(optionIndex)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
        <input
          {...register(`questions.${index}.text`, { required: "Question is required" })}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your multiple choice question"
          defaultValue={question}
        />
        {errors.questions?.[index]?.text && (
          <p className="text-red-500 text-sm mt-1">{errors.questions[index].text?.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
        <div className="space-y-2">
          {fields.map((field, optionIndex) => (
            <div key={field.id} className="flex items-center space-x-2">
              <input
                {...register(`questions.${index}.options.${optionIndex}`, {
                  required: "Option is required",
                })}
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Option ${optionIndex + 1}`}
                defaultValue={options[optionIndex] || ""}
              />
              <label className="flex items-center">
                <input
                  {...register(`questions.${index}.correctAnswers`)}
                  type="checkbox"
                  value={optionIndex.toString()}
                  className="mr-1"
                  defaultChecked={correctAnswers.includes(optionIndex.toString())}
                />
                <span className="text-sm text-gray-600">Correct</span>
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeOption(optionIndex)}
                disabled={fields.length === 1}
                className="p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addOption} className="mt-2 bg-transparent">
          <Plus className="w-4 h-4 mr-2" />
          Add Option
        </Button>
      </div>
    </div>
  )
}