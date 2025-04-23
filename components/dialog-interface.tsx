"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Scenario } from "@/lib/scenarios"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Feedback } from "@/components/feedback"
import { AudioPlayer } from "@/components/audio-player"
import { useUser } from "@/context/user-context"
import { Progress } from "@/components/ui/progress"

export function DialogInterface({ scenario }: { scenario: Scenario }) {
  const router = useRouter()
  const { isLoggedIn, updateProgress } = useUser()
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [sessionPoints, setSessionPoints] = useState(0)

  const currentDialog = scenario.dialogs[currentDialogIndex]
  const isLastDialog = currentDialogIndex === scenario.dialogs.length - 1
  const isMultipleChoice = currentDialog.options && currentDialog.options.length > 0
  const progressPercentage = ((currentDialogIndex + 1) / scenario.dialogs.length) * 100

  // Calcular puntos totales posibles para el escenario
  useEffect(() => {
    const total = scenario.dialogs.reduce((sum, dialog) => sum + dialog.points, 0)
    setTotalPoints(total)
  }, [scenario])

  const handleSubmit = () => {
    let correct = false

    if (isMultipleChoice) {
      const correctOption = currentDialog.options?.find((option) => option.isCorrect)
      correct = selectedOption === correctOption?.id
    } else {
      // Para respuestas de texto libre, podríamos implementar una lógica más compleja
      // Por ahora, simplemente verificamos si la respuesta contiene palabras clave
      const answerLower = userAnswer.toLowerCase()
      const correctAnswerLower = currentDialog.correctAnswer?.toLowerCase() || ""
      correct = answerLower.includes(correctAnswerLower)
    }

    setIsCorrect(correct)

    // Asignar puntos si la respuesta es correcta
    if (correct) {
      setCurrentPoints(currentDialog.points)
      setSessionPoints((prev) => prev + currentDialog.points)
    } else {
      setCurrentPoints(0)
    }

    setShowFeedback(true)
  }

  const handleNext = () => {
    if (isLastDialog) {
      // Actualizar progreso del usuario si está logueado
      if (isLoggedIn) {
        updateProgress(scenario.id, sessionPoints, true)
      }
      router.push("/scenarios")
    } else {
      setCurrentDialogIndex((prev) => prev + 1)
      setUserAnswer("")
      setSelectedOption(null)
      setShowFeedback(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => router.push("/scenarios")} className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a escenarios
        </Button>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-blue-600">{scenario.title}</h1>
            <span className="text-sm text-gray-500">
              Diálogo {currentDialogIndex + 1} de {scenario.dialogs.length}
            </span>
          </div>

          <Progress value={progressPercentage} className="h-2 mb-2" />

          <div className="flex justify-between text-sm text-gray-500">
            <span>Dificultad: {scenario.difficulty}</span>
            <span>Puntos acumulados: {sessionPoints}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentDialogIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6">
              <CardHeader className="pb-2 bg-blue-50 rounded-t-lg">
                <CardTitle className="text-lg text-blue-700 flex justify-between items-center">
                  <span>{currentDialog.character}</span>
                  {currentDialog.audioUrl && <AudioPlayer audioUrl={currentDialog.audioUrl} />}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-lg mb-4">{currentDialog.text}</p>

                {!showFeedback && (
                  <div className="mt-6">
                    {isMultipleChoice ? (
                      <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
                        {currentDialog.options?.map((option) => (
                          <div key={option.id} className="flex items-start space-x-2 mb-3 p-2 rounded hover:bg-gray-50">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="cursor-pointer flex-1">
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <Input
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Escribe tu respuesta en inglés..."
                        className="w-full"
                      />
                    )}

                    <Button
                      onClick={handleSubmit}
                      className="mt-4 w-full"
                      disabled={isMultipleChoice ? !selectedOption : !userAnswer.trim()}
                    >
                      Responder
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {showFeedback && (
              <Feedback
                isCorrect={isCorrect}
                explanation={currentDialog.explanation}
                correctAnswer={
                  isMultipleChoice ? currentDialog.options?.find((o) => o.isCorrect)?.text : currentDialog.correctAnswer
                }
                onNext={handleNext}
                isLastDialog={isLastDialog}
                points={currentPoints}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
