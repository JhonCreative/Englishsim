"use client"

import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { scenarios } from "@/lib/scenarios"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trophy, Star, BarChart, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

export function UserProfile() {
  const { username, progress, logout } = useUser()
  const router = useRouter()

  // Calcular estadísticas
  const totalScenarios = scenarios.length
  const completedScenarios = Object.values(progress.completedScenarios).filter(Boolean).length
  const completionPercentage = Math.round((completedScenarios / totalScenarios) * 100)

  // Calcular puntos necesarios para el siguiente nivel
  const currentLevel = progress.level
  const pointsForNextLevel = currentLevel * currentLevel * 100
  const pointsNeeded = pointsForNextLevel - progress.totalPoints
  const levelProgress = Math.min(100, Math.round((progress.totalPoints / pointsForNextLevel) * 100))

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full md:w-1/3">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Perfil
                  </CardTitle>
                  <CardDescription>Tu progreso en EnglishSim</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">{username}</h3>
                      <p className="text-sm text-gray-500">Nivel {currentLevel}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progreso al nivel {currentLevel + 1}</span>
                        <span>{levelProgress}%</span>
                      </div>
                      <Progress value={levelProgress} className="h-2" />
                      <p className="text-xs text-gray-500">{pointsNeeded} puntos más para el siguiente nivel</p>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" className="w-full" onClick={logout}>
                        Cerrar sesión
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-500" />
                    Estadísticas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">{progress.totalPoints}</p>
                      <p className="text-sm text-gray-600">Puntos totales</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">{completedScenarios}</p>
                      <p className="text-sm text-gray-600">Escenarios completados</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-600">{completionPercentage}%</p>
                      <p className="text-sm text-gray-600">Progreso total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-green-500" />
                    Puntuaciones por escenario
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scenarios.map((scenario) => {
                      const scenarioScore = progress.scenarioScores[scenario.id] || 0
                      const maxPossibleScore = scenario.dialogs.reduce((sum, dialog) => sum + dialog.points, 0)
                      const scorePercentage = Math.round((scenarioScore / maxPossibleScore) * 100) || 0

                      return (
                        <div key={scenario.id} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{scenario.title}</span>
                            <span>
                              {scenarioScore} / {maxPossibleScore} puntos
                            </span>
                          </div>
                          <Progress value={scorePercentage} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button
                onClick={() => router.push("/scenarios")}
                className="w-full flex items-center justify-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Continuar aprendiendo
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
