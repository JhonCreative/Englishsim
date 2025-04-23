"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getScenariosByDifficulty } from "@/lib/scenarios"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Utensils, Plane, Building2, ShoppingBag, Briefcase, ArrowLeft, Stethoscope, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/context/user-context"
import { Progress } from "@/components/ui/progress"

export function ScenarioList() {
  const router = useRouter()
  const { isLoggedIn, progress } = useUser()
  const [difficulty, setDifficulty] = useState<"Todos" | "Principiante" | "Intermedio" | "Avanzado">("Todos")

  const filteredScenarios = getScenariosByDifficulty(difficulty)

  const scenarioIcons = {
    restaurant: <Utensils className="h-8 w-8 text-orange-500" />,
    airport: <Plane className="h-8 w-8 text-blue-500" />,
    hotel: <Building2 className="h-8 w-8 text-purple-500" />,
    store: <ShoppingBag className="h-8 w-8 text-green-500" />,
    interview: <Briefcase className="h-8 w-8 text-red-500" />,
    doctor: <Stethoscope className="h-8 w-8 text-teal-500" />,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => router.push("/")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>

          {isLoggedIn ? (
            <Button variant="outline" onClick={() => router.push("/profile")} className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Mi perfil
            </Button>
          ) : (
            <Button variant="outline" onClick={() => router.push("/auth")} className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Iniciar sesión
            </Button>
          )}
        </div>

        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">Elige un escenario</h1>

        <Tabs defaultValue="Todos" className="mb-8">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="Todos" onClick={() => setDifficulty("Todos")}>
              Todos
            </TabsTrigger>
            <TabsTrigger value="Principiante" onClick={() => setDifficulty("Principiante")}>
              Principiante
            </TabsTrigger>
            <TabsTrigger value="Intermedio" onClick={() => setDifficulty("Intermedio")}>
              Intermedio
            </TabsTrigger>
            <TabsTrigger value="Avanzado" onClick={() => setDifficulty("Avanzado")}>
              Avanzado
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScenarios.map((scenario, index) => {
            // Calcular progreso del escenario si el usuario está logueado
            const scenarioScore = progress.scenarioScores[scenario.id] || 0
            const maxPossibleScore = scenario.dialogs.reduce((sum, dialog) => sum + dialog.points, 0)
            const scorePercentage = Math.round((scenarioScore / maxPossibleScore) * 100) || 0
            const isCompleted = progress.completedScenarios[scenario.id] || false

            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer hover:shadow-lg transition-shadow ${
                    isCompleted ? "border-green-200 bg-green-50" : ""
                  }`}
                  onClick={() => router.push(`/scenarios/${scenario.id}`)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-3">
                      {scenarioIcons[scenario.id as keyof typeof scenarioIcons]}
                      {scenario.title}
                    </CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        {scenario.dialogCount} diálogos • {scenario.difficulty}
                      </p>

                      {isLoggedIn && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progreso</span>
                            <span>{scorePercentage}%</span>
                          </div>
                          <Progress value={scorePercentage} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredScenarios.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay escenarios disponibles con el filtro seleccionado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
