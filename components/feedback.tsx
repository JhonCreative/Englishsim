"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface FeedbackProps {
  isCorrect: boolean
  explanation: string
  correctAnswer?: string
  onNext: () => void
  isLastDialog: boolean
  points: number
}

export function Feedback({ isCorrect, explanation, correctAnswer, onNext, isLastDialog, points }: FeedbackProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className={`border-2 ${isCorrect ? "border-green-500" : "border-red-500"}`}>
        <CardHeader
          className={`pb-2 ${isCorrect ? "bg-green-50" : "bg-red-50"} rounded-t-lg flex flex-row items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <CardTitle className={`text-lg ${isCorrect ? "text-green-700" : "text-red-700"}`}>
              {isCorrect ? "¡Correcto!" : "Incorrecto"}
            </CardTitle>
          </div>

          {isCorrect && points > 0 && (
            <div className="bg-green-100 px-3 py-1 rounded-full text-green-700 font-medium text-sm">
              +{points} puntos
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-4">
          {!isCorrect && correctAnswer && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Respuesta correcta:</p>
              <p className="font-medium">{correctAnswer}</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Explicación:</p>
            <p>{explanation}</p>
          </div>

          <Button onClick={onNext} className="w-full flex items-center justify-center gap-2">
            {isLastDialog ? "Finalizar" : "Siguiente"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
