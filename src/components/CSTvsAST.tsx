'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ComparisonData {
  expression: string
  cst: {
    description: string
    details: string[]
    nodeCount: number
  }
  ast: {
    description: string
    details: string[]
    nodeCount: number
  }
}

export function CSTvsAST() {
  const [currentExample, setCurrentExample] = useState(0)

  const examples: ComparisonData[] = [
    {
      expression: "a + b * c",
      cst: {
        description: "Árvore Sintática Concreta - Mostra TODOS os detalhes",
        details: [
          "Inclui todos os símbolos não-terminais",
          "Mostra cada passo da derivação",
          "Contém informações redundantes",
          "Maior consumo de memória"
        ],
        nodeCount: 15
      },
      ast: {
        description: "Árvore Sintática Abstrata - Foca no ESSENCIAL",
        details: [
          "Remove informações desnecessárias",
          "Estrutura simplificada",
          "Otimizada para compilação",
          "Menor consumo de memória"
        ],
        nodeCount: 5
      }
    },
    {
      expression: "(x + y) * z",
      cst: {
        description: "CST - Inclui parênteses e todos os símbolos",
        details: [
          "Tokens '(' e ')' aparecem na árvore",
          "Símbolos intermediários preservados",
          "Estrutura completa da gramática",
          "Útil para formatação de código"
        ],
        nodeCount: 13
      },
      ast: {
        description: "AST - Precedência implícita na estrutura",
        details: [
          "Parênteses removidos (precedência na hierarquia)",
          "Apenas operadores e operandos",
          "Estrutura otimizada para avaliação",
          "Base para otimizações"
        ],
        nodeCount: 5
      }
    }
  ]

  const currentData = examples[currentExample]

  return (
    <div className="space-y-8">
      {/* Expression Selector */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4">🔄 Comparação: CST vs AST</h3>
        <div className="flex justify-center space-x-4 mb-6">
          {examples.map((example, index) => (
            <Button
              key={index}
              variant={currentExample === index ? 'default' : 'outline'}
              onClick={() => setCurrentExample(index)}
              className={currentExample === index 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-green-600/20 hover:bg-green-600/30 border-green-400/30 text-white'
              }
            >
              {example.expression}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Expression */}
      <div className="text-center p-6 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-lg border border-green-400/30">
        <h4 className="text-xl font-semibold text-white mb-2">Expressão Atual:</h4>
        <div className="font-mono text-3xl text-green-200">{currentData.expression}</div>
      </div>

      {/* Side by Side Comparison */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* CST Card */}
        <Card className="bg-gradient-to-br from-orange-600/10 to-red-700/10 backdrop-blur-sm border-orange-300/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-white">🌳 CST</h4>
            <div className="bg-orange-500/20 px-3 py-1 rounded-full">
              <span className="text-orange-200 text-sm font-semibold">{currentData.cst.nodeCount} nós</span>
            </div>
          </div>
          
          <p className="text-orange-100 mb-4 text-sm">{currentData.cst.description}</p>
          
          <div className="space-y-2">
            {currentData.cst.details.map((detail, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-orange-400 mt-1">•</span>
                <span className="text-orange-200 text-sm">{detail}</span>
              </div>
            ))}
          </div>

          {/* Visual representation placeholder */}
          <div className="mt-6 h-32 bg-orange-500/10 rounded-lg border-2 border-dashed border-orange-400/30 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🌳</div>
              <div className="text-orange-300 text-sm">Árvore Completa</div>
              <div className="text-orange-400 text-xs">Todos os detalhes</div>
            </div>
          </div>
        </Card>

        {/* AST Card */}
        <Card className="bg-gradient-to-br from-green-600/10 to-emerald-700/10 backdrop-blur-sm border-green-300/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-white">🌿 AST</h4>
            <div className="bg-green-500/20 px-3 py-1 rounded-full">
              <span className="text-green-200 text-sm font-semibold">{currentData.ast.nodeCount} nós</span>
            </div>
          </div>
          
          <p className="text-green-100 mb-4 text-sm">{currentData.ast.description}</p>
          
          <div className="space-y-2">
            {currentData.ast.details.map((detail, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-green-200 text-sm">{detail}</span>
              </div>
            ))}
          </div>

          {/* Visual representation placeholder */}
          <div className="mt-6 h-32 bg-green-500/10 rounded-lg border-2 border-dashed border-green-400/30 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🌿</div>
              <div className="text-green-300 text-sm">Árvore Otimizada</div>
              <div className="text-green-400 text-xs">Apenas o essencial</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Comparison */}
      <Card className="bg-gradient-to-br from-blue-600/10 to-indigo-700/10 backdrop-blur-sm border-blue-300/20 p-6">
        <h4 className="text-xl font-bold text-white mb-4">📊 Comparação de Performance</h4>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-200 mb-2">
              {Math.round((currentData.ast.nodeCount / currentData.cst.nodeCount) * 100)}%
            </div>
            <div className="text-blue-300 text-sm">Redução de nós</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">🚀</div>
            <div className="text-blue-300 text-sm">Velocidade AST</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400 mb-2">💾</div>
            <div className="text-blue-300 text-sm">Memória CST</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-500/20 rounded-lg">
          <p className="text-blue-100 text-sm text-center">
            <strong>Conclusão:</strong> AST é mais eficiente para compiladores, enquanto CST é útil para análise detalhada e formatação.
          </p>
        </div>
      </Card>
    </div>
  )
}