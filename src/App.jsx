import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Mono Sashi
        </h1>
        <p className="text-gray-600 text-center mb-8">
          ようこそ！このプロジェクトへ
        </p>
        <div className="bg-indigo-50 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            React + Vite + Tailwind CSS で構築されています
          </p>
        </div>
      </div>
    </div>
  )
}
