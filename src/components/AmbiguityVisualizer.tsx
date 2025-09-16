'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface TreeNode {
  id: string
  value: string
  children?: TreeNode[]
  isHighlighted?: boolean
}

interface AmbiguityCase {
  expression: string
  description: string
  interpretations: {
    title: string
    tree: TreeNode
    meaning: string
    result?: string
  }[]
}

interface AmbiguityVisualizerProps {
  cases: AmbiguityCase[]
}

export function AmbiguityVisualizer({ cases }: AmbiguityVisualizerProps) {
  const [currentCase, setCurrentCase] = useState(0)
  const [selectedInterpretation, setSelectedInterpretation] = useState(0)
  const [showComparison, setShowComparison] = useState(false)

  const currentCaseData = cases[currentCase]

  const renderTreeNode = (node: TreeNode, level: number = 0, index: number = 0) => {
    return (
      <div 
        key={node.id}
        className="relative"
        style={{
          transform: `translate(${index * 100}px, ${level * 70}px)`
        }}
      >
        {/* Node */}
        <div 
          className={`
            absolute w-16 h-10 rounded-lg flex items-center justify-center text-sm font-bold
            transition-all duration-500 transform hover:scale-110
            ${node.isHighlighted 
              ? 'bg-red-400 text-white shadow-lg shadow-red-400/50 animate-pulse' 
              : 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg'
            }
          `}
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            animation: `fadeIn 0.6s ease-out ${level * 0.3}s both`
          }}
        >
          {node.value}
        </div>

        {/* Connections to children */}
        {node.children && node.children.map((child, childIndex) => (
          <svg
            key={`line-${child.id}`}
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: 40,
              width: '100px',
              height: '70px',
              transform: `translateX(${(childIndex - (node.children!.length - 1) / 2) * 100}px)`
            }}
          >
            <line
              x1="0"
              y1="0"
              x2="50"
              y2="30"
              stroke="rgba(239, 68, 68, 0.6)"
              strokeWidth="2"
              className="animate-pulse"
              style={{
                animation: `drawLine 0.8s ease-out ${(level + 1) * 0.4}s both`
              }}
            />
          </svg>
        ))}

        {/* Render children */}
        {node.children && (
          <div className="relative" style={{ top: 70 }}>
            {node.children.map((child, childIndex) => 
              renderTreeNode(
                child, 
                level + 1, 
                childIndex - Math.floor(node.children!.length / 2)
              )
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Case Selector */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4">⚠️ Visualizador de Ambiguidade</h3>
        <div className="flex justify-center space-x-4 mb-6">
          {cases.map((caseData, index) => (
            <Button
              key={index}
              variant={currentCase === index ? 'default' : 'outline'}
              onClick={() => {
                setCurrentCase(index)
                setSelectedInterpretation(0)
                setShowComparison(false)
              }}
              className={currentCase === index 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-red-600/20 hover:bg-red-600/30 border-red-400/30 text-white'
              }
            >
              Caso {index + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Expression */}
      <div className="text-center p-6 bg-gradient-to-r from-red-500/20 to-orange-600/20 rounded-lg border border-red-400/30">
        <h4 className="text-xl font-semibold text-white mb-2">Expressão Ambígua:</h4>
        <div className="font-mono text-3xl text-red-200 mb-3">{currentCaseData.expression}</div>
        <p className="text-red-100 text-sm">{currentCaseData.description}</p>
      </div>

      {/* Interpretation Selector */}
      <div className="flex justify-center space-x-4">
        {currentCaseData.interpretations.map((interpretation, index) => (
          <Button
            key={index}
            variant={selectedInterpretation === index ? 'default' : 'outline'}
            onClick={() => setSelectedInterpretation(index)}
            className={selectedInterpretation === index 
              ? 'bg-orange-600 hover:bg-orange-700 text-white' 
              : 'bg-orange-600/20 hover:bg-orange-600/30 border-orange-400/30 text-white'
            }
          >
            {interpretation.title}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => setShowComparison(!showComparison)}
          className="bg-yellow-600/20 hover:bg-yellow-600/30 border-yellow-400/30 text-white"
        >
          {showComparison ? '👁️ Individual' : '🔄 Comparar'}
        </Button>
      </div>

      {/* Tree Visualization */}
      {!showComparison ? (
        // Single interpretation view
        <Card className="bg-gradient-to-br from-red-600/10 to-orange-800/10 backdrop-blur-sm border-red-300/20 p-8">
          <div className="mb-6">
            <h4 className="text-xl font-bold text-white mb-2">
              {currentCaseData.interpretations[selectedInterpretation].title}
            </h4>
            <p className="text-red-200 mb-4">
              {currentCaseData.interpretations[selectedInterpretation].meaning}
            </p>
            {currentCaseData.interpretations[selectedInterpretation].result && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3">
                <span className="text-red-100 font-mono">
                  Resultado: {currentCaseData.interpretations[selectedInterpretation].result}
                </span>
              </div>
            )}
          </div>

          <div className="relative min-h-[300px] overflow-auto">
            <div className="flex justify-center">
              <div className="relative">
                {renderTreeNode(currentCaseData.interpretations[selectedInterpretation].tree)}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        // Comparison view
        <div className="grid lg:grid-cols-2 gap-6">
          {currentCaseData.interpretations.map((interpretation, index) => (
            <Card key={index} className="bg-gradient-to-br from-red-600/10 to-orange-800/10 backdrop-blur-sm border-red-300/20 p-6">
              <h4 className="text-lg font-bold text-white mb-2">{interpretation.title}</h4>
              <p className="text-red-200 text-sm mb-4">{interpretation.meaning}</p>
              
              {interpretation.result && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-2 mb-4">
                  <span className="text-red-100 font-mono text-sm">
                    = {interpretation.result}
                  </span>
                </div>
              )}

              <div className="relative h-48 overflow-auto">
                <div className="flex justify-center">
                  <div className="relative scale-75">
                    {renderTreeNode(interpretation.tree)}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Problem Highlight */}
      <Card className="bg-gradient-to-br from-yellow-600/20 to-red-700/20 backdrop-blur-sm border-yellow-400/30 p-6">
        <div className="flex items-start space-x-4">
          <div className="text-4xl">⚠️</div>
          <div>
            <h4 className="text-xl font-bold text-yellow-200 mb-2">Problema da Ambiguidade</h4>
            <p className="text-yellow-100 text-sm mb-3">
              A mesma expressão gera <strong className="text-white">múltiplas árvores sintáticas</strong>, 
              causando incerteza na interpretação do código.
            </p>
            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3">
              <p className="text-red-100 text-sm">
                <strong>Consequência:</strong> O compilador não sabe qual interpretação usar, 
                podendo gerar código incorreto ou até mesmo falhar na compilação.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-15px) scale(0.8); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        
        @keyframes drawLine {
          from { stroke-dasharray: 100; stroke-dashoffset: 100; }
          to { stroke-dasharray: 100; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}