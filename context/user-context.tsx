"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface UserProgress {
  completedScenarios: Record<string, boolean>
  scenarioScores: Record<string, number>
  totalPoints: number
  level: number
}

interface UserContextType {
  isLoggedIn: boolean
  username: string | null
  progress: UserProgress
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  register: (username: string, password: string) => Promise<boolean>
  updateProgress: (scenarioId: string, points: number, completed: boolean) => void
}

const defaultProgress: UserProgress = {
  completedScenarios: {},
  scenarioScores: {},
  totalPoints: 0,
  level: 1,
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [progress, setProgress] = useState<UserProgress>(defaultProgress)

  // Cargar datos del usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("englishsim_user")
    const storedProgress = localStorage.getItem("englishsim_progress")

    if (storedUser) {
      setUsername(storedUser)
      setIsLoggedIn(true)
    }

    if (storedProgress) {
      try {
        setProgress(JSON.parse(storedProgress))
      } catch (error) {
        console.error("Error parsing progress:", error)
      }
    }
  }, [])

  // Guardar progreso en localStorage cuando cambie
  useEffect(() => {
    if (isLoggedIn && username) {
      localStorage.setItem("englishsim_progress", JSON.stringify(progress))
    }
  }, [progress, isLoggedIn, username])

  const calculateLevel = (points: number): number => {
    // Cada nivel requiere 100 puntos más que el anterior
    // Nivel 1: 0-99, Nivel 2: 100-299, Nivel 3: 300-599, etc.
    return Math.floor(Math.sqrt(points / 100)) + 1
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulación de login - en una app real, esto sería una llamada a API
    const storedPassword = localStorage.getItem(`englishsim_password_${username}`)

    if (storedPassword === password) {
      setUsername(username)
      setIsLoggedIn(true)

      // Cargar progreso del usuario
      const storedProgress = localStorage.getItem(`englishsim_progress_${username}`)
      if (storedProgress) {
        try {
          setProgress(JSON.parse(storedProgress))
        } catch (error) {
          console.error("Error parsing progress:", error)
        }
      }

      localStorage.setItem("englishsim_user", username)
      return true
    }

    return false
  }

  const register = async (username: string, password: string): Promise<boolean> => {
    // Verificar si el usuario ya existe
    const storedPassword = localStorage.getItem(`englishsim_password_${username}`)

    if (storedPassword) {
      return false // Usuario ya existe
    }

    // Guardar nuevo usuario
    localStorage.setItem(`englishsim_password_${username}`, password)
    localStorage.setItem(`englishsim_progress_${username}`, JSON.stringify(defaultProgress))

    // Iniciar sesión automáticamente
    setUsername(username)
    setIsLoggedIn(true)
    setProgress(defaultProgress)
    localStorage.setItem("englishsim_user", username)

    return true
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUsername(null)
    setProgress(defaultProgress)
    localStorage.removeItem("englishsim_user")
  }

  const updateProgress = (scenarioId: string, points: number, completed: boolean) => {
    setProgress((prev) => {
      // Actualizar puntuación del escenario
      const currentScenarioScore = prev.scenarioScores[scenarioId] || 0
      const newScenarioScore = Math.max(currentScenarioScore, points)

      // Calcular puntos totales
      const newTotalPoints = Object.values({
        ...prev.scenarioScores,
        [scenarioId]: newScenarioScore,
      }).reduce((sum, score) => sum + score, 0)

      // Actualizar escenarios completados
      const newCompletedScenarios = {
        ...prev.completedScenarios,
        [scenarioId]: completed || prev.completedScenarios[scenarioId] || false,
      }

      // Calcular nuevo nivel
      const newLevel = calculateLevel(newTotalPoints)

      // Si el usuario ha subido de nivel, podríamos mostrar una notificación
      if (newLevel > prev.level && prev.level > 1) {
        // Mostrar notificación de subida de nivel
        alert(`¡Felicidades! Has subido al nivel ${newLevel}`)
      }

      return {
        completedScenarios: newCompletedScenarios,
        scenarioScores: {
          ...prev.scenarioScores,
          [scenarioId]: newScenarioScore,
        },
        totalPoints: newTotalPoints,
        level: newLevel,
      }
    })

    // Si el usuario está logueado, guardar progreso específico
    if (isLoggedIn && username) {
      localStorage.setItem(`englishsim_progress_${username}`, JSON.stringify(progress))
    }
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        username,
        progress,
        login,
        logout,
        register,
        updateProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
