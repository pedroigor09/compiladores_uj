'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AmbiguityVisualizer } from "@/components/AmbiguityVisualizer"
import { DanglingElseDemo } from "@/components/DanglingElseDemo"
import { AmbiguityQuiz } from "@/components/AmbiguityQuiz"

export default function AmbiguidadePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Example ambiguity cases
  const ambiguityCases = [
    {
      expression: "id + id * id",
      description: "Ambiguidade em precedência de operadores",
      interpretations: [
        {
          title: "Interpretação 1: (id + id) * id",
          tree: {
            id: "mult1",
            value: "*",
            children: [
              {
                id: "plus1",
                value: "+",
                children: [
                  { id: "id1", value: "id" },
                  { id: "id2", value: "id" }
                ]
              },
              { id: "id3", value: "id" }
            ]
          },
          meaning: "Soma primeiro, depois multiplica",
          result: "Se id=2: (2+2)*2 = 8"
        },
        {
          title: "Interpretação 2: id + (id * id)",
          tree: {
            id: "plus2",
            value: "+",
            children: [
              { id: "id4", value: "id" },
              {
                id: "mult2",
                value: "*",
                children: [
                  { id: "id5", value: "id" },
                  { id: "id6", value: "id" }
                ]
              }
            ]
          },
          meaning: "Multiplica primeiro, depois soma",
          result: "Se id=2: 2+(2*2) = 6"
        }
      ]
    },
    {
      expression: "a - b - c",
      description: "Ambiguidade em associatividade",
      interpretations: [
        {
          title: "Associatividade à esquerda: (a - b) - c",
          tree: {
            id: "sub1",
            value: "-",
            children: [
              {
                id: "sub_inner1",
                value: "-",
                children: [
                  { id: "a1", value: "a" },
                  { id: "b1", value: "b" }
                ]
              },
              { id: "c1", value: "c" }
            ]
          },
          meaning: "Subtrai da esquerda para direita",
          result: "Se a=10,b=3,c=2: (10-3)-2 = 5"
        },
        {
          title: "Associatividade à direita: a - (b - c)",
          tree: {
            id: "sub2",
            value: "-",
            children: [
              { id: "a2", value: "a" },
              {
                id: "sub_inner2",
                value: "-",
                children: [
                  { id: "b2", value: "b" },
                  { id: "c2", value: "c" }
                ]
              }
            ]
          },
          meaning: "Subtrai da direita para esquerda",
          result: "Se a=10,b=3,c=2: 10-(3-2) = 9"
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-pink-900">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="text-white hover:bg-white/10"
          >
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold text-white">🤔 Ambiguidade</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </nav>

      {/* Parallax Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-800/20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        {/* Confused/conflicting paths animation */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-0.5 bg-gradient-to-b opacity-30 animate-pulse ${
                i % 2 === 0 ? 'from-red-400 to-transparent' : 'from-orange-400 to-transparent'
              }`}
              style={{
                left: `${15 + (i * 7)}%`,
                top: `${5 + (i * 3)}%`,
                height: `${40 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `translateY(${scrollY * (0.2 + Math.random() * 0.3)}px) rotate(${15 + i * 30}deg)`
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div 
            className="text-8xl mb-8 animate-bounce"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            🤔
          </div>
          <h1 
            className="text-6xl font-bold text-white mb-6 tracking-tight"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            Ambiguidade
          </h1>
          <p 
            className="text-2xl text-red-200 mb-8 leading-relaxed"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          >
            Quando o mesmo código pode ter múltiplas interpretações - um problema crítico em compiladores
          </p>
          <Button 
            size="lg"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 text-lg px-8 py-6"
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            Explorar Ambiguidades
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="intro" className="py-20 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">🔹 O que é</h2>
              <div className="space-y-6 text-lg text-red-100 leading-relaxed">
                <p>
                  Uma gramática é <strong className="text-white">ambígua</strong> quando uma mesma sentença pode ter mais de uma árvore sintática diferente.
                </p>
                <p>
                  Isso significa que a <em className="text-red-200">interpretação do código não é única</em>, o que causa problemas sérios na análise sintática.
                </p>
                <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
                  <p className="text-red-100 text-base">
                    <strong>⚠️ Problema:</strong> O mesmo código pode produzir resultados diferentes dependendo da interpretação escolhida!
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Example */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Exemplo Visual:</h3>
              <div className="text-center">
                <div className="font-mono text-xl text-red-200 mb-6">2 + 3 * 4</div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-red-500/20 p-3 rounded-lg">
                    <div className="font-semibold text-red-200 mb-2">Interpretação 1:</div>
                    <div className="font-mono text-red-100">(2 + 3) * 4 = 20</div>
                  </div>
                  <div className="bg-orange-500/20 p-3 rounded-lg">
                    <div className="font-semibold text-orange-200 mb-2">Interpretação 2:</div>
                    <div className="font-mono text-orange-100">2 + (3 * 4) = 14</div>
                  </div>
                </div>

                <div className="mt-4 text-yellow-200 text-sm">
                  <strong>Resultado:</strong> Duas respostas diferentes para a mesma expressão!
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Ambiguity Visualizer */}
      <section id="visualizer" className="py-20 bg-black/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🔹 Exemplos Interativos</h2>
          
          <AmbiguityVisualizer cases={ambiguityCases} />
        </div>
      </section>

      {/* Dangling Else Demo */}
      <section id="dangling-else" className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <DanglingElseDemo />
        </div>
      </section>

      {/* Consequences Section */}
      <section id="consequences" className="py-20 bg-black/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🔹 Consequências / Importância</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "❓",
                title: "Incerteza Sintática",
                desc: "Torna a análise sintática incerta e imprevisível"
              },
              {
                icon: "🔀",
                title: "Múltiplos Significados",
                desc: "Pode gerar diferentes significados para o mesmo código"
              },
              {
                icon: "⚖️",
                title: "Necessita Precedência",
                desc: "Exige regras de precedência e associatividade"
              },
              {
                icon: "🚨",
                title: "Riscos de Segurança",
                desc: "Pode gerar erros de interpretação e vulnerabilidades"
              }
            ].map((item, i) => (
              <Card key={i} className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-red-200 text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Problem Example */}
            <Card className="bg-gradient-to-br from-red-500/20 to-pink-600/20 border-red-400/30 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3">🚫</span>
                Problema Real
              </h3>
              <div className="space-y-3 text-red-100 text-sm">
                <p>• Compiladores diferentes podem interpretar o mesmo código de formas distintas</p>
                <p>• Bugs difíceis de detectar e reproduzir</p>
                <p>• Comportamento inconsistente entre versões</p>
                <p>• Vulnerabilidades de segurança em parsing</p>
              </div>
            </Card>

            {/* Solution Example */}
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-400/30 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3">✅</span>
                Soluções
              </h3>
              <div className="space-y-3 text-green-100 text-sm">
                <p>• Definir precedência de operadores</p>
                <p>• Estabelecer regras de associatividade</p>
                <p>• Redesenhar a gramática para eliminar ambiguidade</p>
                <p>• Usar parênteses para forçar interpretação</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 bg-black/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🔹 Quiz: Domine a Ambiguidade</h2>
          <AmbiguityQuiz />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center">
        <div className="container mx-auto px-6">
          <p className="text-red-300 mb-4">Parabéns! Agora você entende os perigos e soluções da ambiguidade! 🎯</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
          >
            🏠 Voltar ao Menu Principal
          </Button>
        </div>
      </footer>
    </div>
  )
}