"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useUser } from "@/context/user-context"
import { User, BookOpen } from "lucide-react"

export function WelcomePage() {
  const router = useRouter()
  const { isLoggedIn, username, progress } = useUser()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-blue-600 mb-2">EnglishSim</h1>
        <p className="text-xl text-gray-600 mb-8">Aprende inglés a través de escenarios de la vida real</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 mb-8"
      >
        {isLoggedIn ? (
          <div className="text-center mb-6">
            <p className="text-lg font-medium">Bienvenido de nuevo, {username}</p>
            <div className="mt-2 text-sm text-gray-600">
              <p>Nivel: {progress.level}</p>
              <p>Puntos totales: {progress.totalPoints}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 mb-6">
            Practica conversaciones en inglés en situaciones cotidianas como restaurantes, aeropuertos, hoteles y más.
            Recibe retroalimentación inmediata y mejora tus habilidades.
          </p>
        )}

        <div className="space-y-3">
          <Button
            onClick={() => router.push("/scenarios")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg flex items-center justify-center gap-2"
          >
            <BookOpen className="h-5 w-5" />
            {isLoggedIn ? "Continuar aprendiendo" : "Empezar"}
          </Button>

          {isLoggedIn ? (
            <Button
              onClick={() => router.push("/profile")}
              variant="outline"
              className="w-full py-3 rounded-lg text-lg flex items-center justify-center gap-2"
            >
              <User className="h-5 w-5" />
              Ver mi perfil
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/auth")}
              variant="outline"
              className="w-full py-3 rounded-lg text-lg flex items-center justify-center gap-2"
            >
              <User className="h-5 w-5" />
              Iniciar sesión / Registrarse
            </Button>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-sm text-gray-500"
      >
        Diseñado para estudiantes de nivel principiante, intermedio y avanzado
      </motion.div>
    </div>
  )
}
