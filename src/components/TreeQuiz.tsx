'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Question {
  id: number
  question: string
  options?: string[]
  type: 'multiple-choice' | 'open-ended'
  correctAnswer?: string | number
  explanation: string
}

const treeQuestions: Question[] = [
  {
    id: 1,
    question: "O que é uma árvore sintática?",
    type: 'multiple-choice',
    options: [
      "Representação hierárquica de como uma sentença é derivada",
      "Uma lista de tokens do código",
      "Conjunto de regras da gramática",
      "Estrutura de dados para armazenar variáveis"
    ],
    correctAnswer: 0,
    explanation: "A árvore sintática é a representação hierárquica que mostra como uma sentença é derivada a partir de uma gramática."
  },
  {
    id: 2,
    question: "Qual a diferença entre árvore sintática concreta e abstrata?",
    type: 'multiple-choice',
    options: [
      "CST mostra todos os detalhes, AST é simplificada",
      "CST é menor, AST é maior",
      "CST é para interpretadores, AST para compiladores",
      "Não há diferença prática"
    ],
    correctAnswer: 0,
    explanation: "CST (Concrete Syntax Tree) mostra todas as etapas detalhadas, enquanto AST (Abstract Syntax Tree) é uma versão simplificada focada na estrutura lógica."
  },
  {
    id: 3,
    question: "Qual árvore (CST ou AST) os compiladores usam mais?",
    type: 'multiple-choice',
    options: [
      "AST - por ser otimizada e mais eficiente",
      "CST - por ter mais informações",
      "Ambas igualmente",
      "Depende da linguagem"
    ],
    correctAnswer: 0,
    explanation: "Compiladores usam principalmente AST porque é otimizada, consome menos memória e contém apenas as informações essenciais para interpretação e otimização."
  },
  {
    id: 4,
    question: "Desenhe mentalmente a árvore para 'a + b * c'. Qual operador fica na raiz?",
    type: 'multiple-choice',
    options: [
      "+ (soma fica na raiz)",
      "* (multiplicação fica na raiz)", 
      "a (primeiro operando)",
      "c (último operando)"
    ],
    correctAnswer: 0,
    explanation: "A soma (+) fica na raiz porque tem menor precedência. A multiplicação (*) tem maior precedência e fica como subárvore: (+) na raiz, com 'a' à esquerda e (*) à direita (que tem 'b' e 'c')."
  },
  {
    id: 5,
    question: "Qual operador aparece mais alto na árvore: + ou *?",
    type: 'multiple-choice',
    options: [
      "+ aparece mais alto (menor precedência)",
      "* aparece mais alto (maior precedência)",
      "Ambos no mesmo nível",
      "Depende da expressão"
    ],
    correctAnswer: 0,
    explanation: "O operador + aparece mais alto na árvore porque tem menor precedência. Operadores de menor precedência ficam mais próximos da raiz."
  },
  {
    id: 6,
    question: "Qual a relação entre árvores e regras da gramática?",
    type: 'multiple-choice',
    options: [
      "Cada nó da árvore representa uma aplicação de regra",
      "Árvores são independentes das regras",
      "Regras destroem as árvores",
      "Não há relação direta"
    ],
    correctAnswer: 0,
    explanation: "Cada nó interno da árvore sintática representa a aplicação de uma regra de produção da gramática. A árvore é construída seguindo essas regras."
  },
  {
    id: 7,
    question: "Se uma expressão tiver ambiguidade, quantas árvores podem ser geradas?",
    type: 'multiple-choice',
    options: [
      "Múltiplas árvores (2 ou mais)",
      "Sempre apenas uma árvore",
      "Nenhuma árvore",
      "Exatamente duas árvores"
    ],
    correctAnswer: 0,
    explanation: "Expressões ambíguas podem gerar múltiplas árvores sintáticas diferentes, cada uma representando uma interpretação possível da expressão."
  },
  {
    id: 8,
    question: "Como uma árvore sintática ajuda na detecção de erros?",
    type: 'multiple-choice',
    options: [
      "Se não conseguir construir a árvore, há erro sintático",
      "Conta o número de nós",
      "Verifica a cor dos nós",
      "Mede a altura da árvore"
    ],
    correctAnswer: 0,
    explanation: "Se o analisador sintático não conseguir construir uma árvore válida para o código, isso indica um erro sintático - o código não segue as regras da gramática."
  },
  {
    id: 9,
    question: "Por que a árvore sintática é considerada hierárquica?",
    type: 'multiple-choice',
    options: [
      "Organiza elementos em níveis de precedência",
      "Tem muitas folhas",
      "É colorida",
      "Cresce verticalmente"
    ],
    correctAnswer: 0,
    explanation: "É hierárquica porque organiza os elementos do código em níveis, respeitando precedência de operadores e estrutura da gramática, com dependências claras entre pais e filhos."
  },
  {
    id: 10,
    question: "O que acontece depois que a AST é construída no compilador?",
    type: 'multiple-choice',
    options: [
      "Análise semântica e geração de código",
      "O processo termina",
      "Volta para análise léxica",
      "É descartada imediatamente"
    ],
    correctAnswer: 0,
    explanation: "Após construir a AST, o compilador realiza análise semântica (verificação de tipos, escopo), otimizações e finalmente geração de código máquina."
  }
]

export function TreeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [openAnswer, setOpenAnswer] = useState('')

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const question = treeQuestions[currentQuestion]
    
    if (question.type === 'multiple-choice' && selectedAnswer === question.correctAnswer) {
      setScore(score + 1)
    }
    
    if (currentQuestion < treeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setOpenAnswer('')
    } else {
      setQuizCompleted(true)
    }
  }

  const handleShowExplanation = () => {
    setShowExplanation(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
    setOpenAnswer('')
  }

  if (quizCompleted) {
    return (
      <Card className="bg-gradient-to-br from-green-600/20 to-blue-800/20 backdrop-blur-sm border-green-300/20 p-8 text-center">
        <div className="text-6xl mb-6">🌳</div>
        <h2 className="text-3xl font-bold text-white mb-4">Quiz de Árvores Concluído!</h2>
        <p className="text-xl text-green-200 mb-6">
          Sua pontuação: {score}/{treeQuestions.filter(q => q.type === 'multiple-choice').length}
        </p>
        <div className="mb-6">
          {score >= 8 ? (
            <p className="text-green-300">Excepcional! Você é expert em árvores sintáticas! 🌟</p>
          ) : score >= 6 ? (
            <p className="text-yellow-300">Muito bom! Você tem uma base sólida! 🌿</p>
          ) : (
            <p className="text-orange-300">Continue estudando! As árvores são fundamentais! 🌱</p>
          )}
        </div>
        <Button 
          onClick={resetQuiz}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          🔄 Tentar Novamente
        </Button>
      </Card>
    )
  }

  const question = treeQuestions[currentQuestion]

  return (
    <Card className="bg-gradient-to-br from-green-600/10 to-emerald-800/10 backdrop-blur-sm border-green-300/20 p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-green-200">Pergunta {currentQuestion + 1} de {treeQuestions.length}</span>
          <span className="text-green-200">🏆 Pontos: {score}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / treeQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-2xl font-bold text-white mb-6">{question.question}</h3>

      {/* Answer Options */}
      {question.type === 'multiple-choice' && question.options ? (
        <div className="space-y-4 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                selectedAnswer === index
                  ? 'bg-green-500/30 border-green-400 text-white scale-[1.02]'
                  : 'bg-white/5 border-white/20 text-green-100 hover:bg-white/10 hover:border-green-400/50'
              }`}
            >
              <span className="font-bold mr-3 text-green-300">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-6">
          <textarea
            value={openAnswer}
            onChange={(e) => setOpenAnswer(e.target.value)}
            placeholder="Desenhe ou descreva sua resposta aqui..."
            className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-green-300 min-h-[120px] resize-none"
          />
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-lg">
          <h4 className="font-bold text-emerald-200 mb-2">🌿 Explicação:</h4>
          <p className="text-emerald-100">{question.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-4">
        {!showExplanation ? (
          <Button
            onClick={handleShowExplanation}
            variant="outline"
            disabled={question.type === 'multiple-choice' && selectedAnswer === null}
            className="bg-emerald-600/20 hover:bg-emerald-600/30 border-emerald-400/30 text-white"
          >
            💡 Ver Explicação
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
          >
            {currentQuestion < treeQuestions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'} →
          </Button>
        )}
      </div>
    </Card>
  )
}