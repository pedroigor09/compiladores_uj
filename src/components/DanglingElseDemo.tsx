'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CodeInterpretation {
  title: string
  description: string
  code: string
  execution: string[]
  result: string
}

export function DanglingElseDemo() {
  const [selectedInterpretation, setSelectedInterpretation] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isExecuting, setIsExecuting] = useState(false)

  const code = "if (x > 0) if (y > 0) print('A') else print('B')"
  
  const interpretations: CodeInterpretation[] = [
    {
      title: "Interpretação 1: else associado ao if interno",
      description: "O else se refere ao segundo if (if y > 0)",
      code: `if (x > 0) {
    if (y > 0) 
        print('A')
    else 
        print('B')
}`,
      execution: [
        "x > 0? Verdadeiro → Entra no primeiro if",
        "y > 0? Falso → else do if interno",
        "Executa: print('B')",
        "Resultado: B é impresso"
      ],
      result: "B"
    },
    {
      title: "Interpretação 2: else associado ao if externo",
      description: "O else se refere ao primeiro if (if x > 0)",
      code: `if (x > 0) {
    if (y > 0) 
        print('A')
} else {
    print('B')
}`,
      execution: [
        "x > 0? Verdadeiro → Entra no primeiro if",
        "y > 0? Falso → Não executa print('A')",
        "Sai do if interno, sem else externo",
        "Resultado: Nada é impresso"
      ],
      result: "Nada"
    }
  ]

  const executeStep = () => {
    if (isExecuting) return
    
    setIsExecuting(true)
    setCurrentStep(0)
    
    const steps = interpretations[selectedInterpretation].execution
    
    const executeNextStep = (step: number) => {
      if (step < steps.length) {
        setTimeout(() => {
          setCurrentStep(step + 1)
          executeNextStep(step + 1)
        }, 1000)
      } else {
        setTimeout(() => {
          setIsExecuting(false)
        }, 1000)
      }
    }
    
    executeNextStep(0)
  }

  const resetExecution = () => {
    setCurrentStep(0)
    setIsExecuting(false)
  }

  const currentInterpretation = interpretations[selectedInterpretation]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4">🚫 Problema do "Dangling Else"</h3>
        <p className="text-red-200 max-w-3xl mx-auto">
          Um dos exemplos mais famosos de ambiguidade sintática. 
          O <code className="bg-red-500/20 px-2 py-1 rounded">else</code> pode se associar a qualquer um dos <code className="bg-red-500/20 px-2 py-1 rounded">if</code>s!
        </p>
      </div>

      {/* Original Code */}
      <Card className="bg-gradient-to-br from-red-600/10 to-orange-800/10 backdrop-blur-sm border-red-300/20 p-6">
        <h4 className="text-xl font-bold text-white mb-4">🔥 Código Ambíguo:</h4>
        <div className="bg-black/30 rounded-lg p-4 font-mono text-lg text-red-200 text-center">
          {code}
        </div>
        <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
          <p className="text-yellow-100 text-sm">
            <strong>Pergunta:</strong> A qual <code>if</code> o <code>else</code> pertence? 
            Com <code>x = 1</code> e <code>y = -1</code>, o que acontece?
          </p>
        </div>
      </Card>

      {/* Interpretation Selector */}
      <div className="flex justify-center space-x-4">
        {interpretations.map((interpretation, index) => (
          <Button
            key={index}
            variant={selectedInterpretation === index ? 'default' : 'outline'}
            onClick={() => {
              setSelectedInterpretation(index)
              resetExecution()
            }}
            className={selectedInterpretation === index 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-red-600/20 hover:bg-red-600/30 border-red-400/30 text-white'
            }
          >
            Interpretação {index + 1}
          </Button>
        ))}
      </div>

      {/* Current Interpretation */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Structure */}
        <Card className="bg-gradient-to-br from-orange-600/10 to-red-700/10 backdrop-blur-sm border-orange-300/20 p-6">
          <h4 className="text-lg font-bold text-white mb-4">{currentInterpretation.title}</h4>
          <p className="text-orange-200 text-sm mb-4">{currentInterpretation.description}</p>
          
          <div className="bg-black/40 rounded-lg p-4 font-mono text-sm text-orange-100 whitespace-pre-line">
            {currentInterpretation.code}
          </div>

          <div className="mt-4 p-3 bg-orange-500/20 border border-orange-400/30 rounded-lg">
            <div className="text-orange-200 text-sm">
              <strong>Valores de teste:</strong> x = 1, y = -1
            </div>
          </div>
        </Card>

        {/* Execution Steps */}
        <Card className="bg-gradient-to-br from-blue-600/10 to-indigo-700/10 backdrop-blur-sm border-blue-300/20 p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-bold text-white">🔍 Execução Passo a Passo</h4>
            <div className="flex space-x-2">
              <Button
                onClick={executeStep}
                disabled={isExecuting}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1"
              >
                {isExecuting ? '⏳ Executando...' : '▶️ Executar'}
              </Button>
              <Button
                onClick={resetExecution}
                variant="outline"
                className="bg-blue-600/20 hover:bg-blue-600/30 border-blue-400/30 text-white text-sm px-3 py-1"
              >
                🔄 Reset
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {currentInterpretation.execution.map((step, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-500 ${
                  index < currentStep
                    ? 'bg-green-500/20 border-green-400/30 text-green-200'
                    : index === currentStep
                    ? 'bg-blue-500/20 border-blue-400/30 text-blue-200 animate-pulse'
                    : 'bg-gray-500/10 border-gray-400/20 text-gray-400'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full min-w-[24px] text-center">
                    {index + 1}
                  </span>
                  <span className="text-sm">{step}</span>
                  {index < currentStep && <span className="ml-auto text-green-400">✓</span>}
                  {index === currentStep && <span className="ml-auto text-blue-400">👁️</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Result */}
          {(currentStep >= currentInterpretation.execution.length || !isExecuting) && currentStep > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-lg">
              <h5 className="font-bold text-purple-200 mb-2">🎯 Resultado Final:</h5>
              <div className="text-2xl font-mono text-white text-center py-2">
                {currentInterpretation.result}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Comparison Table */}
      <Card className="bg-gradient-to-br from-yellow-600/10 to-red-700/10 backdrop-blur-sm border-yellow-300/20 p-6">
        <h4 className="text-xl font-bold text-white mb-4">📊 Comparação dos Resultados</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-yellow-400/30">
                <th className="text-left py-3 px-4 text-yellow-200">Interpretação</th>
                <th className="text-left py-3 px-4 text-yellow-200">else associado a</th>
                <th className="text-left py-3 px-4 text-yellow-200">Resultado (x=1, y=-1)</th>
                <th className="text-left py-3 px-4 text-yellow-200">Comportamento</th>
              </tr>
            </thead>
            <tbody>
              {interpretations.map((interp, index) => (
                <tr key={index} className="border-b border-yellow-400/10">
                  <td className="py-3 px-4 text-yellow-100">Interpretação {index + 1}</td>
                  <td className="py-3 px-4 text-yellow-100">
                    {index === 0 ? 'if interno (y > 0)' : 'if externo (x > 0)'}
                  </td>
                  <td className="py-3 px-4 font-mono text-lg text-white">{interp.result}</td>
                  <td className="py-3 px-4 text-yellow-200 text-sm">
                    {index === 0 ? 'Executa o else' : 'Ignora o else'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
          <p className="text-red-100 text-sm">
            <strong>⚠️ Problema:</strong> A mesma entrada produz resultados diferentes! 
            Isso torna o comportamento do programa imprevisível e pode causar bugs sérios.
          </p>
        </div>
      </Card>

      {/* Solution */}
      <Card className="bg-gradient-to-br from-green-600/10 to-emerald-700/10 backdrop-blur-sm border-green-300/20 p-6">
        <h4 className="text-xl font-bold text-white mb-4">✅ Solução: Regras de Precedência</h4>
        
        <p className="text-green-200 mb-4">
          A maioria das linguagens resolve isso com a regra: 
          <strong className="text-white">"else sempre se associa ao if mais próximo"</strong>
        </p>

        <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
          <div className="font-mono text-green-100 whitespace-pre-line text-sm">
{`// Interpretação padrão (Interpretação 1)
if (x > 0) {
    if (y > 0) 
        print('A')
    else 
        print('B')  // ← else associado ao if mais próximo
}`}
          </div>
        </div>

        <p className="text-green-200 text-sm mt-4">
          Se você quiser a Interpretação 2, deve usar chaves explicitamente:
        </p>

        <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 mt-2">
          <div className="font-mono text-green-100 whitespace-pre-line text-sm">
{`// Forçar Interpretação 2 com chaves
if (x > 0) {
    if (y > 0) 
        print('A')
} else {
    print('B')
}`}
          </div>
        </div>
      </Card>
    </div>
  )
}