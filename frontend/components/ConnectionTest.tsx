"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ConnectionTest() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const testConnection = async () => {
    setTesting(true)
    setResult(null)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      console.log("Testando conexão com:", API_URL)

      const response = await fetch(`${API_URL}/quizzes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setResult(`✅ Conexão OK! Encontrados ${Array.isArray(data) ? data.length : 0} quizzes`)
      } else {
        setResult(`❌ Erro ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error("Erro de conexão:", error)
      setResult(`❌ Erro de conexão: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Backend connection test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={testConnection} disabled={testing}>
            {testing ? "Testing..." : "Testar Conexão"}
          </Button>
          {result && (
            <div className="p-3 bg-gray-100 rounded-md">
              <p className="text-sm">{result}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
