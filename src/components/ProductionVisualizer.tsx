'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ProductionRule {
  left: string
  right: string[]
  description: string
}

interface ProductionVisualizerProps {
  rules: ProductionRule[]
  title: string
}

export function ProductionVisualizer({ rules, title }: ProductionVisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [derivation, setDerivation] = useState<string[]>([])

  useEffect(() => {
    if (rules.length > 0) {
      setDerivation([rules[0].left])
    }
  }, [rules])

  const applyRule = (ruleIndex: number) => {
    if (isAnimating) return
    
    setIsAnimating(true)
    const rule = rules[ruleIndex]
    
    setTimeout(() => {
      setDerivation(prev => [...prev, rule.right.join(' ')])
      setCurrentStep(prev => prev + 1)
      setIsAnimating(false)
    }, 500)
  }

  const reset = () => {
    if (rules.length > 0) {
      setDerivation([rules[0].left])
      setCurrentStep(0)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-purple-600/10 to-indigo-800/10 backdrop-blur-sm border-purple-300/20 p-8">
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
      
      {/* Production Rules */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-purple-200 mb-4">Regras de Produção:</h4>
        <div className="space-y-2">
          {rules.map((rule, index) => (
            <div 
              key={index}
              className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
                currentStep === index ? 'bg-purple-500/20 border border-purple-400/30' : 'bg-white/5'
              }`}
            >
              <span className="font-mono text-lg text-white min-w-[60px]">{rule.left} →</span>
              <span className="font-mono text-lg text-purple-200">{rule.right.join(' ')}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => applyRule(index)}
                disabled={isAnimating}
                className="ml-auto bg-purple-600/20 hover:bg-purple-600/30 border-purple-400/30 text-white"
              >
                Aplicar
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Derivation Steps */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-purple-200 mb-4">Derivação:</h4>
        <div className="bg-black/30 rounded-lg p-6 min-h-[120px]">
          {derivation.map((step, index) => (
            <div 
              key={index}
              className={`font-mono text-xl transition-all duration-500 ${
                index === derivation.length - 1 ? 'text-white' : 'text-purple-300'
              }`}
              style={{
                opacity: isAnimating && index === derivation.length - 1 ? 0.5 : 1,
                transform: isAnimating && index === derivation.length - 1 ? 'translateX(10px)' : 'translateX(0)'
              }}
            >
              {index > 0 && <span className="text-purple-400 mr-4">⇒</span>}
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-4">
        <Button
          onClick={reset}
          variant="outline"
          className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
        >
          🔄 Reiniciar
        </Button>
        <div className="text-purple-200 flex items-center">
          Passo: {currentStep + 1} / {rules.length + 1}
        </div>
      </div>
    </Card>
  )
}