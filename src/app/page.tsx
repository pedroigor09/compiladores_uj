'use client'

import { TopicCard } from "@/components/TopicCard"
import QRCodeComponent from "@/components/QRCodeComponent"
import { useState } from "react"
import { Share2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [showQR, setShowQR] = useState(false)
  const router = useRouter()
  
  const topics = [
    {
      title: "Gramática Livre de Contexto",
      description: "Explore as regras de produção e estruturas que definem linguagens de programação",
      icon: "📝",
      gradient: "bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800"
    },
    {
      title: "Árvore Sintática",
      description: "Visualize como o código é analisado e estruturado em árvores de sintaxe abstrata",
      icon: "🌳",
      gradient: "bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800"
    },
    {
      title: "Ambiguidade",
      description: "Compreenda quando uma gramática pode gerar múltiplas interpretações para o mesmo código",
      icon: "🤔",
      gradient: "bg-gradient-to-br from-orange-600 via-red-700 to-pink-800"
    }
  ]

  const handleTopicClick = (topicTitle: string) => {
    if (topicTitle === "Gramática Livre de Contexto") {
      router.push('/gramatica')
    } else if (topicTitle === "Árvore Sintática") {
      router.push('/arvore')
    } else if (topicTitle === "Ambiguidade") {
      router.push('/ambiguidade')
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="relative z-20 p-6 text-center bg-black/20 backdrop-blur-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Compiladores
            </h1>
            <p className="text-lg text-slate-300">
              Escolha um tópico para explorar os fundamentos teóricos dos compiladores
            </p>
          </div>
          <button
            onClick={() => setShowQR(!showQR)}
            className="ml-4 p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200 group"
            title="Compartilhar com a turma"
          >
            <Share2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </header>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative">
            <button
              onClick={() => setShowQR(false)}
              className="absolute -top-4 -right-4 z-10 w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
            <QRCodeComponent />
          </div>
        </div>
      )}

      {/* Main Content - Full height cards */}
      <main className="h-[calc(100vh-140px)] flex">
        {topics.map((topic, index) => (
          <div key={topic.title} className="flex-1 relative">
            <TopicCard
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
              gradient={topic.gradient}
              onClick={() => handleTopicClick(topic.title)}
            />
          </div>
        ))}
      </main>
    </div>
  )
}
