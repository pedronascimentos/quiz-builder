import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quiz Builder",
  description: "Create and manage custom quizzes",
  icons: {
    icon: "https://public-assets.develops.today/logo.png",
    shortcut: "https://public-assets.develops.today/logo.png",
    apple: "https://public-assets.develops.today/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <head>
        <link rel="icon" href="https://public-assets.develops.today/logo.png" />
        <link rel="shortcut icon" href="https://public-assets.develops.today/logo.png" />
        <link rel="apple-touch-icon" href="https://public-assets.develops.today/logo.png" />
      </head>
      <body className={inter.className}>
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo-developers-today.png" alt="Developers Today" className="h-12 w-auto" />
                <h1 className="text-xl font-bold text-gray-900">Quiz Builder</h1>
              </div>
              <div className="space-x-4">
                <a href="/quizzes" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Quizzes
                </a>
                <a href="/create" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Create
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
