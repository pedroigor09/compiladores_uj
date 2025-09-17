'use client'

import { useState, useCallback } from 'react'
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

const questions: Question[] = [
  {
    id: 1,
    question: "O que significa 'livre de contexto' em uma gramática?",
    type: 'multiple-choice',
    options: [
      "As regras podem ser aplicadas independentemente do contexto",
      "A gramática não possui contexto algum",
      "Todas as regras são livres para usar",
      "O contexto é opcional"
    ],
    correctAnswer: 0,
    explanation: "'Livre de contexto' significa que as substituições podem ser aplicadas independentemente do contexto onde o símbolo aparece."
  },
  {
    id: 2,
    question: "Qual é a diferença entre terminal e não-terminal?",
    type: 'multiple-choice',
    options: [
      "Terminal é final, não-terminal pode ser expandido",
      "Terminal é variável, não-terminal é constante",
      "Terminal é opcional, não-terminal é obrigatório",
      "Não há diferença"
    ],
    correctAnswer: 0,
    explanation: "Terminais são símbolos finais da linguagem, enquanto não-terminais (variáveis) podem ser expandidos usando regras de produção."
  },
  {
    id: 3,
    question: "Dê um exemplo de regra de produção de uma GLC:",
    type: 'open-ended',
    explanation: "Exemplo: E → E + E (uma expressão pode ser duas expressões somadas)"
  },
  {
    id: 4,
    question: "Qual é a função do símbolo inicial na gramática?",
    type: 'multiple-choice',
    options: [
      "É o ponto de partida para todas as derivações",
      "É o símbolo mais importante",
      "É opcional na gramática",
      "Define o fim da gramática"
    ],
    correctAnswer: 0,
    explanation: "O símbolo inicial (S) é o ponto de partida para todas as derivações na gramática."
  },
  {
    id: 5,
    question: "Onde as GLCs são usadas em compiladores?",
    type: 'multiple-choice',
    options: [
      "Na análise sintática (parsing)",
      "Na análise léxica apenas",
      "Na otimização de código",
      "Na geração de código"
    ],
    correctAnswer: 0,
    explanation: "GLCs são fundamentais na fase de análise sintática dos compiladores para verificar se o código segue a estrutura correta."
  },
  {
    id: 6,
    question: "Uma GLC pode descrever a indentação de código (como em Python)?",
    type: 'multiple-choice',
    options: [
      "Não, pois indentação é sensível ao contexto",
      "Sim, facilmente",
      "Apenas com modificações especiais",
      "Somente em casos específicos"
    ],
    correctAnswer: 0,
    explanation: "GLCs não podem descrever indentação porque ela é sensível ao contexto - o significado depende do nível de indentação anterior."
  },
  {
    id: 7,
    question: "O que acontece se uma gramática gerar duas árvores para a mesma expressão?",
    type: 'multiple-choice',
    options: [
      "A gramática é ambígua",
      "A gramática está correta",
      "Isso é impossível",
      "É uma vantagem"
    ],
    correctAnswer: 0,
    explanation: "Quando uma gramática pode gerar múltiplas árvores sintáticas para a mesma entrada, ela é ambígua, o que pode causar problemas na interpretação."
  },
  {
    id: 8,
    question: "Como GLC difere de Gramática Regular?",
    type: 'multiple-choice',
    options: [
      "GLC é mais poderosa, pode ter recursão aninhada",
      "GLC é mais simples",
      "GLC é menos usada",
      "Não há diferença prática"
    ],
    correctAnswer: 0,
    explanation: "GLCs são mais poderosas que gramáticas regulares, podendo expressar estruturas aninhadas como parênteses balanceados."
  },
  {
    id: 9,
    question: "Por que GLC é importante no estudo de linguagens de programação?",
    type: 'multiple-choice',
    options: [
      "Define a sintaxe e estrutura das linguagens",
      "Apenas para fins acadêmicos",
      "Para otimização de performance",
      "Para debugging"
    ],
    correctAnswer: 0,
    explanation: "GLCs são fundamentais porque definem formalmente a sintaxe e estrutura das linguagens de programação, permitindo a construção de compiladores e interpretadores."
  },
  {
    id: 10,
    question: "Qual das seguintes é uma característica das GLCs?",
    type: 'multiple-choice',
    options: [
      "Podem expressar linguagens recursivas",
      "Apenas para linguagens finitas",
      "Não permitem aninhamento",
      "São limitadas a expressões simples"
    ],
    correctAnswer: 0,
    explanation: "GLCs podem expressar linguagens recursivas e estruturas aninhadas, tornando-as ideais para linguagens de programação complexas."
  }
]

export function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [openAnswer, setOpenAnswer] = useState('')

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = useCallback(() => {
    const question = questions[currentQuestion]
    
    if (question.type === 'multiple-choice' && selectedAnswer === question.correctAnswer) {
      setScore(prev => prev + 1)
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setOpenAnswer('')
    } else {
      setQuizCompleted(true)
    }
  }, [currentQuestion, selectedAnswer])

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
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold text-white mb-4">Quiz Concluído!</h2>
        <p className="text-xl text-green-200 mb-6">
          Sua pontuação: {score}/{questions.filter(q => q.type === 'multiple-choice').length}
        </p>
        <div className="mb-6">
          {score >= 7 ? (
            <p className="text-green-300">Excelente! Você domina os conceitos de GLC! 🌟</p>
          ) : score >= 5 ? (
            <p className="text-yellow-300">Bom trabalho! Continue estudando para aprimorar! 📚</p>
          ) : (
            <p className="text-orange-300">Continue praticando! A teoria é fundamental! 💪</p>
          )}
        </div>
        <Button 
          onClick={resetQuiz}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        >
          🔄 Fazer Quiz Novamente
        </Button>
      </Card>
    )
  }

  const question = questions[currentQuestion]

  return (
    <Card className="bg-gradient-to-br from-purple-600/10 to-indigo-800/10 backdrop-blur-sm border-purple-300/20 p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-purple-200">Pergunta {currentQuestion + 1} de {questions.length}</span>
          <span className="text-purple-200">Pontuação: {score}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
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
                  ? 'bg-purple-500/30 border-purple-400 text-white'
                  : 'bg-white/5 border-white/20 text-purple-100 hover:bg-white/10'
              }`}
            >
              <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-6">
          <textarea
            value={openAnswer}
            onChange={(e) => setOpenAnswer(e.target.value)}
            placeholder="Digite sua resposta aqui..."
            className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 min-h-[120px] resize-none"
          />
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className="mb-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
          <h4 className="font-bold text-blue-200 mb-2">💡 Explicação:</h4>
          <p className="text-blue-100">{question.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-4">
        {!showExplanation ? (
          <Button
            onClick={handleShowExplanation}
            variant="outline"
            disabled={question.type === 'multiple-choice' && selectedAnswer === null}
            className="bg-blue-600/20 hover:bg-blue-600/30 border-blue-400/30 text-white"
          >
            💡 Ver Explicação
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'} →
          </Button>
        )}
      </div>
    </Card>
  )
}