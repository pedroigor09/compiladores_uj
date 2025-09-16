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

const ambiguityQuestions: Question[] = [
  {
    id: 1,
    question: "O que é uma gramática ambígua?",
    type: 'multiple-choice',
    options: [
      "Uma gramática onde uma sentença pode ter múltiplas árvores sintáticas",
      "Uma gramática com muitas regras de produção",
      "Uma gramática difícil de entender",
      "Uma gramática sem símbolos terminais"
    ],
    correctAnswer: 0,
    explanation: "Uma gramática é ambígua quando uma mesma sentença pode ser derivada de mais de uma forma, gerando múltiplas árvores sintáticas diferentes."
  },
  {
    id: 2,
    question: "Dê um exemplo de sentença ambígua:",
    type: 'open-ended',
    explanation: "Exemplo clássico: 'a + b * c' pode ser interpretada como '(a + b) * c' ou 'a + (b * c)' sem regras de precedência."
  },
  {
    id: 3,
    question: "Como resolver ambiguidade em expressões matemáticas?",
    type: 'multiple-choice',
    options: [
      "Definindo regras de precedência e associatividade",
      "Removendo operadores da gramática",
      "Usando apenas um tipo de operador",
      "Ignorando o problema"
    ],
    correctAnswer: 0,
    explanation: "Regras de precedência (*, / antes de +, -) e associatividade (esquerda para direita) eliminam a ambiguidade em expressões matemáticas."
  },
  {
    id: 4,
    question: "Qual é o clássico problema do 'dangling else'?",
    type: 'multiple-choice',
    options: [
      "else pode se associar a qualquer if em estruturas aninhadas",
      "else sem if correspondente",
      "if sem else obrigatório",
      "else com sintaxe incorreta"
    ],
    correctAnswer: 0,
    explanation: "Em 'if (a) if (b) X else Y', o else pode se associar ao primeiro ou segundo if, criando ambiguidade sobre qual condição controla o else."
  },
  {
    id: 5,
    question: "Como a precedência ajuda a resolver ambiguidades?",
    type: 'multiple-choice',
    options: [
      "Define qual operador tem prioridade na construção da árvore",
      "Remove operadores desnecessários",
      "Simplifica a gramática",
      "Acelera a compilação"
    ],
    correctAnswer: 0,
    explanation: "Precedência estabelece uma hierarquia: operadores de maior precedência ficam mais baixos na árvore sintática, sendo avaliados primeiro."
  },
  {
    id: 6,
    question: "Diferencie ambiguidade sintática e semântica:",
    type: 'multiple-choice',
    options: [
      "Sintática: múltiplas estruturas; Semântica: múltiplos significados",
      "Sintática: erros de gramática; Semântica: erros de lógica",
      "Sintática: compilação; Semântica: execução",
      "Não há diferença prática"
    ],
    correctAnswer: 0,
    explanation: "Ambiguidade sintática gera múltiplas árvores para o mesmo código. Ambiguidade semântica ocorre quando código sintaticamente correto tem múltiplas interpretações de significado."
  },
  {
    id: 7,
    question: "É possível eliminar ambiguidade em todas as gramáticas?",
    type: 'multiple-choice',
    options: [
      "Nem sempre - algumas linguagens são inerentemente ambíguas",
      "Sim, sempre é possível",
      "Não, nunca é possível",
      "Apenas em gramáticas simples"
    ],
    correctAnswer: 0,
    explanation: "Algumas linguagens formais são inerentemente ambíguas - não existe gramática livre de contexto não-ambígua para elas. Porém, a maioria das linguagens de programação pode ser expressa sem ambiguidade."
  },
  {
    id: 8,
    question: "O que pode acontecer em um compilador com gramática ambígua?",
    type: 'multiple-choice',
    options: [
      "Comportamento imprevisível ou falha na compilação",
      "Compilação mais rápida",
      "Melhor otimização de código",
      "Nada, funciona normalmente"
    ],
    correctAnswer: 0,
    explanation: "Compiladores com gramáticas ambíguas podem escolher interpretações diferentes para o mesmo código, causando comportamento inconsistente ou erros de compilação."
  },
  {
    id: 9,
    question: "Por que as linguagens de programação evitam gramáticas ambíguas?",
    type: 'multiple-choice',
    options: [
      "Para garantir interpretação única e previsível do código",
      "Para facilitar a digitação",
      "Para reduzir o tamanho dos arquivos",
      "Para aumentar a velocidade de execução"
    ],
    correctAnswer: 0,
    explanation: "Linguagens não-ambíguas garantem que cada programa tenha interpretação única, essencial para comportamento previsível e confiável do software."
  },
  {
    id: 10,
    question: "Cite uma técnica de compilador para evitar ambiguidade:",
    type: 'multiple-choice',
    options: [
      "Definir precedência e associatividade de operadores",
      "Usar apenas tokens simples",
      "Eliminar recursão da gramática",
      "Reduzir o número de regras"
    ],
    correctAnswer: 0,
    explanation: "Definir precedência (qual operador tem prioridade) e associatividade (ordem de avaliação para operadores de mesma precedência) é a técnica mais comum para resolver ambiguidades."
  }
]

export function AmbiguityQuiz() {
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
    const question = ambiguityQuestions[currentQuestion]
    
    if (question.type === 'multiple-choice' && selectedAnswer === question.correctAnswer) {
      setScore(score + 1)
    }
    
    if (currentQuestion < ambiguityQuestions.length - 1) {
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
      <Card className="bg-gradient-to-br from-red-600/20 to-orange-800/20 backdrop-blur-sm border-red-300/20 p-8 text-center">
        <div className="text-6xl mb-6">🤔</div>
        <h2 className="text-3xl font-bold text-white mb-4">Quiz de Ambiguidade Concluído!</h2>
        <p className="text-xl text-red-200 mb-6">
          Sua pontuação: {score}/{ambiguityQuestions.filter(q => q.type === 'multiple-choice').length}
        </p>
        <div className="mb-6">
          {score >= 8 ? (
            <p className="text-green-300">Fantástico! Você é expert em resolver ambiguidades! 🎯</p>
          ) : score >= 6 ? (
            <p className="text-yellow-300">Muito bem! Você entende os conceitos fundamentais! ⚡</p>
          ) : (
            <p className="text-orange-300">Continue estudando! Ambiguidade é um tópico complexo! 📚</p>
          )}
        </div>
        <Button 
          onClick={resetQuiz}
          className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
        >
          🔄 Refazer Quiz
        </Button>
      </Card>
    )
  }

  const question = ambiguityQuestions[currentQuestion]

  return (
    <Card className="bg-gradient-to-br from-red-600/10 to-orange-800/10 backdrop-blur-sm border-red-300/20 p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-red-200">Pergunta {currentQuestion + 1} de {ambiguityQuestions.length}</span>
          <span className="text-red-200">🎯 Score: {score}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / ambiguityQuestions.length) * 100}%` }}
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
                  ? 'bg-red-500/30 border-red-400 text-white scale-[1.02] shadow-lg'
                  : 'bg-white/5 border-white/20 text-red-100 hover:bg-white/10 hover:border-red-400/50'
              }`}
            >
              <span className="font-bold mr-3 text-red-300">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-6">
          <textarea
            value={openAnswer}
            onChange={(e) => setOpenAnswer(e.target.value)}
            placeholder="Descreva um exemplo de ambiguidade..."
            className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-red-300 min-h-[120px] resize-none"
          />
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className="mb-6 p-4 bg-orange-500/20 border border-orange-400/30 rounded-lg">
          <h4 className="font-bold text-orange-200 mb-2">🤔 Explicação:</h4>
          <p className="text-orange-100">{question.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-4">
        {!showExplanation ? (
          <Button
            onClick={handleShowExplanation}
            variant="outline"
            disabled={question.type === 'multiple-choice' && selectedAnswer === null}
            className="bg-orange-600/20 hover:bg-orange-600/30 border-orange-400/30 text-white"
          >
            💡 Ver Explicação
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
          >
            {currentQuestion < ambiguityQuestions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'} →
          </Button>
        )}
      </div>
    </Card>
  )
}