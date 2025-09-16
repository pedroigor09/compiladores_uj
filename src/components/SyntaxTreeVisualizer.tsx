'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface TreeNode {
  id: string
  value: string
  children?: TreeNode[]
  x?: number
  y?: number
  isHighlighted?: boolean
}

interface SyntaxTreeVisualizerProps {
  title: string
  expression: string
  astTree: TreeNode
  cstTree?: TreeNode
}

export function SyntaxTreeVisualizer({ title, expression, astTree, cstTree }: SyntaxTreeVisualizerProps) {
  const [currentTree, setCurrentTree] = useState<'ast' | 'cst'>('ast')
  const [animationStep, setAnimationStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const renderTreeNode = (node: TreeNode, level: number = 0, index: number = 0) => {
    const nodeWidth = 80
    const nodeHeight = 40
    const levelHeight = 80
    
    return (
      <div 
        key={node.id}
        className="relative"
        style={{
          transform: `translate(${index * 120}px, ${level * levelHeight}px)`
        }}
      >
        {/* Node */}
        <div 
          className={`
            absolute w-20 h-10 rounded-lg flex items-center justify-center text-sm font-bold
            transition-all duration-500 transform hover:scale-110
            ${node.isHighlighted 
              ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50' 
              : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg'
            }
          `}
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            animation: `fadeIn 0.5s ease-out ${level * 0.2}s both`
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
              top: nodeHeight,
              width: '120px',
              height: `${levelHeight}px`,
              transform: `translateX(${(childIndex - (node.children!.length - 1) / 2) * 120}px)`
            }}
          >
            <line
              x1="0"
              y1="0"
              x2="60"
              y2={levelHeight - nodeHeight}
              stroke="rgba(34, 197, 94, 0.6)"
              strokeWidth="2"
              className="animate-pulse"
              style={{
                animation: `drawLine 0.8s ease-out ${(level + 1) * 0.3}s both`
              }}
            />
          </svg>
        ))}

        {/* Render children */}
        {node.children && (
          <div className="relative" style={{ top: levelHeight }}>
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

  const highlightPath = (nodeId: string) => {
    // Função para destacar um caminho específico na árvore
    console.log(`Highlighting path to node: ${nodeId}`)
  }

  const tree = currentTree === 'ast' ? astTree : (cstTree || astTree)

  return (
    <Card className="bg-gradient-to-br from-green-600/10 to-emerald-800/10 backdrop-blur-sm border-green-300/20 p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <div className="flex space-x-2">
          <Button
            variant={currentTree === 'ast' ? 'default' : 'outline'}
            onClick={() => setCurrentTree('ast')}
            className={currentTree === 'ast' 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-green-600/20 hover:bg-green-600/30 border-green-400/30 text-white'
            }
          >
            AST
          </Button>
          {cstTree && (
            <Button
              variant={currentTree === 'cst' ? 'default' : 'outline'}
              onClick={() => setCurrentTree('cst')}
              className={currentTree === 'cst' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-green-600/20 hover:bg-green-600/30 border-green-400/30 text-white'
              }
            >
              CST
            </Button>
          )}
        </div>
      </div>

      {/* Expression */}
      <div className="mb-8 p-4 bg-black/30 rounded-lg">
        <h4 className="text-lg font-semibold text-green-200 mb-2">Expressão:</h4>
        <div className="font-mono text-2xl text-white text-center">{expression}</div>
      </div>

      {/* Tree Visualization */}
      <div className="relative min-h-[400px] overflow-auto">
        <div className="flex justify-center">
          <div className="relative">
            {renderTreeNode(tree)}
          </div>
        </div>
      </div>

      {/* Tree Type Info */}
      <div className="mt-8 p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
        <h4 className="font-bold text-green-200 mb-2">
          {currentTree === 'ast' ? '🌿 Árvore Sintática Abstrata (AST)' : '🌳 Árvore Sintática Concreta (CST)'}
        </h4>
        <p className="text-green-100 text-sm">
          {currentTree === 'ast' 
            ? 'Versão simplificada focada na estrutura lógica, usada pelo compilador para interpretação.'
            : 'Mostra todas as etapas detalhadas da derivação, incluindo todos os símbolos da gramática.'
          }
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        @keyframes drawLine {
          from { stroke-dasharray: 100; stroke-dashoffset: 100; }
          to { stroke-dasharray: 100; stroke-dashoffset: 0; }
        }
      `}</style>
    </Card>
  )
}