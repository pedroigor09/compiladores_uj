'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProductionVisualizer } from "@/components/ProductionVisualizer"
import { InteractiveQuiz } from "@/components/InteractiveQuiz"
import { useRouter } from 'next/navigation'

export default function GramaticaPage() {
  const [scrollY, setScrollY] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = [
    { id: 'intro', title: 'Introdução', icon: '📘' },
    { id: 'definition', title: 'Definição Formal', icon: '🔬' },
    { id: 'examples', title: 'Exemplos Práticos', icon: '💡' },
    { id: 'importance', title: 'Importância', icon: '⚡' },
    { id: 'quiz', title: 'Quiz Interativo', icon: '🎯' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/')}
            className="text-white hover:bg-white/10"
          >
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold text-white">📘 Gramática Livre de Contexto</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </nav>

      {/* Parallax Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-800/20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px)`
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div 
            className="text-8xl mb-8 animate-bounce"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            📘
          </div>
          <h1 
            className="text-6xl font-bold text-white mb-6 tracking-tight"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            Gramática Livre de Contexto
          </h1>
          <p 
            className="text-2xl text-purple-200 mb-8 leading-relaxed"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          >
            Explore as regras fundamentais que definem a estrutura das linguagens de programação
          </p>
          <Button 
            size="lg"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 text-lg px-8 py-6"
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            Começar Estudos
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="intro" className="py-20 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">🔹 O que é</h2>
              <div className="space-y-6 text-lg text-purple-100 leading-relaxed">
                <p>
                  Uma <strong className="text-white">Gramática Livre de Contexto (GLC)</strong> é um conjunto de regras de produção que definem a estrutura de uma linguagem.
                </p>
                <p>
                  Elas são chamadas <em className="text-purple-200">"livres de contexto"</em> porque as substituições podem ser aplicadas independentemente do contexto onde o símbolo aparece.
                </p>
              </div>
            </div>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Definição Formal:</h3>
              <div className="space-y-4 text-purple-100 font-mono text-lg">
                <div>G = (V, Σ, R, S)</div>
                <div className="ml-4 space-y-2 text-base">
                  <div><strong className="text-white">V</strong> = conjunto de variáveis (não-terminais)</div>
                  <div><strong className="text-white">Σ</strong> = conjunto de símbolos terminais</div>
                  <div><strong className="text-white">R</strong> = conjunto de regras de produção</div>
                  <div><strong className="text-white">S</strong> = símbolo inicial</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 bg-black/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🔹 Exemplos Práticos</h2>
          
          <div className="space-y-12">
            {/* Interactive Production Visualizer */}
            <ProductionVisualizer
              title="🎯 Visualizador Interativo - Expressões Aritméticas"
              rules={[
                { left: "E", right: ["E", "+", "T"], description: "Expressão com soma" },
                { left: "T", right: ["T", "*", "F"], description: "Termo com multiplicação" },
                { left: "F", right: ["(", "E", ")"], description: "Fator com parênteses" },
                { left: "F", right: ["id"], description: "Identificador" }
              ]}
            />

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Example 1 */}
              <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border-purple-300/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Exemplo 1 – Expressões Simples</h3>
                <div className="space-y-4 font-mono text-lg">
                  <div className="text-purple-200">E → E + E</div>
                  <div className="text-purple-200">E → E * E</div>
                  <div className="text-purple-200">E → (E)</div>
                  <div className="text-purple-200">E → id</div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-white mb-3">Pode gerar:</p>
                  <div className="space-y-2 text-purple-100">
                    <div>• id + id</div>
                    <div>• (id * id) + id</div>
                  </div>
                </div>
              </Card>

              {/* Example 2 */}
              <Card className="bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 backdrop-blur-sm border-indigo-300/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Exemplo 2 – Estrutura IF</h3>
                <div className="space-y-4 font-mono text-lg">
                  <div className="text-indigo-200">S → if (E) S else S</div>
                  <div className="text-indigo-200">S → comando</div>
                  <div className="text-indigo-200">E → condicao</div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-white mb-3">Estrutura típica de controle</p>
                  <p className="text-indigo-100 text-sm">Define como construir declarações condicionais</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section id="importance" className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🔹 Consequências / Importância</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🏗️",
                title: "Definição de Linguagens",
                desc: "Permitem definir linguagens formais como linguagens de programação"
              },
              {
                icon: "🔍",
                title: "Análise Sintática",
                desc: "Usadas na fase de análise sintática dos compiladores"
              },
              {
                icon: "✅",
                title: "Validação de Código",
                desc: "Determinam se um código é válido ou não"
              },
              {
                icon: "⚠️",
                title: "Prevenção de Ambiguidades",
                desc: "Se mal projetadas, podem causar ambiguidades"
              }
            ].map((item, i) => (
              <Card key={i} className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-purple-200 text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 bg-black/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🔹 Quiz Interativo</h2>
          <InteractiveQuiz />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center">
        <div className="container mx-auto px-6">
          <p className="text-purple-300 mb-4">Parabéns por completar o estudo sobre Gramática Livre de Contexto!</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            � Voltar ao Menu Principal
          </Button>
        </div>
      </footer>
    </div>
  )
}