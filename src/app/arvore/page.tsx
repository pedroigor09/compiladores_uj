'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SyntaxTreeVisualizer } from "@/components/SyntaxTreeVisualizer"
import { CSTvsAST } from "@/components/CSTvsAST"
import { TreeQuiz } from "@/components/TreeQuiz"
import { useRouter } from 'next/navigation'

export default function ArvorePage() {
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Example tree data
  const exampleAST = {
    id: "mult",
    value: "*",
    children: [
      {
        id: "plus",
        value: "+",
        children: [
          { id: "a", value: "a" },
          { id: "b", value: "b" }
        ]
      },
      { id: "c", value: "c" }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
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
          <h1 className="text-2xl font-bold text-white">🌳 Árvore Sintática</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </nav>

      {/* Parallax Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-800/20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        {/* Animated tree branches */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 bg-green-400/20 rounded-full animate-pulse"
              style={{
                left: `${20 + (i * 5)}%`,
                top: `${10 + (i * 4)}%`,
                height: `${30 + Math.random() * 40}px`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `translateY(${scrollY * (0.1 + Math.random() * 0.15)}px) rotate(${Math.random() * 30 - 15}deg)`
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div 
            className="text-8xl mb-8 animate-bounce"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            🌳
          </div>
          <h1 
            className="text-6xl font-bold text-white mb-6 tracking-tight"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            Árvore Sintática
          </h1>
          <p 
            className="text-2xl text-green-200 mb-8 leading-relaxed"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          >
            Descubra como o código é estruturado hierarquicamente pelos compiladores
          </p>
          <Button 
            size="lg"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 text-lg px-8 py-6"
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            Explorar Árvores
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="intro" className="py-20 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">🔹 O que é</h2>
              <div className="space-y-6 text-lg text-green-100 leading-relaxed">
                <p>
                  A <strong className="text-white">Árvore Sintática</strong> (ou árvore de derivação) é a representação hierárquica que mostra como uma sentença é derivada a partir de uma gramática.
                </p>
                <p>
                  Existem <em className="text-green-200">dois tipos principais:</em>
                </p>
                <div className="ml-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-400 font-bold">CST</span>
                    <span>Árvore Sintática Concreta → mostra todas as etapas detalhadas</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-400 font-bold">AST</span>
                    <span>Árvore Sintática Abstrata → versão simplificada, usada pelo compilador</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Tree Preview */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Exemplo Visual:</h3>
              <div className="text-center">
                <div className="font-mono text-xl text-green-200 mb-6">(a + b) * c</div>
                
                {/* Simple tree visualization */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    *
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">
                        +
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center text-white text-sm">a</div>
                        <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center text-white text-sm">b</div>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">
                      c
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Tree Visualizer */}
      <section id="visualizer" className="py-20 bg-black/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🔹 Visualizador Interativo</h2>
          
          <SyntaxTreeVisualizer
            title="🎯 Árvore para: (a + b) * c"
            expression="(a + b) * c"
            astTree={exampleAST}
          />
        </div>
      </section>

      {/* CST vs AST Comparison */}
      <section id="comparison" className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <CSTvsAST />
        </div>
      </section>

      {/* Importance Section */}
      <section id="importance" className="py-20 bg-black/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🔹 Consequências / Importância</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🧠",
                title: "Análise Semântica",
                desc: "Fundamentais para entender o sentido do código"
              },
              {
                icon: "⚙️",
                title: "Compiladores",
                desc: "Usadas para organizar e executar código"
              },
              {
                icon: "🚀",
                title: "Otimização",
                desc: "Auxiliam na otimização de expressões"
              },
              {
                icon: "🔄",
                title: "Transformação",
                desc: "Essenciais para transformar código em linguagem de máquina"
              }
            ].map((item, i) => (
              <Card key={i} className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-green-200 text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-green-400/30 p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">💡 Ponto-chave</h3>
              <p className="text-green-100 text-lg leading-relaxed">
                <strong>Sem árvores sintáticas, seria impossível transformar código em algo que a máquina entenda.</strong> 
                Elas são a ponte entre a sintaxe da linguagem de programação e a semântica do programa.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 bg-black/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">🔹 Quiz: Teste seu conhecimento</h2>
          <TreeQuiz />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center">
        <div className="container mx-auto px-6">
          <p className="text-green-300 mb-4">Excelente! Agora você domina as Árvores Sintáticas! 🌳</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
          >
            🏠 Voltar ao Menu Principal
          </Button>
        </div>
      </footer>
    </div>
  )
}