'use client'

import { TopicCard } from "@/components/TopicCard"

export default function Home() {
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
      window.location.href = '/gramatica'
    } else if (topicTitle === "Árvore Sintática") {
      window.location.href = '/arvore'
    } else if (topicTitle === "Ambiguidade") {
      window.location.href = '/ambiguidade'
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="relative z-20 p-6 text-center bg-black/20 backdrop-blur-md">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Compiladores
        </h1>
        <p className="text-lg text-slate-300">
          Escolha um tópico para explorar os fundamentos teóricos dos compiladores
        </p>
      </header>

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
