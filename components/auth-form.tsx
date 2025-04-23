"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/context/user-context"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuthFormProps {
  isLogin: boolean
}

export function AuthForm({ isLogin }: AuthFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useUser()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      let success = false

      if (isLogin) {
        success = await login(username, password)
        if (!success) {
          setError("Usuario o contraseña incorrectos")
        }
      } else {
        if (username.length < 3) {
          setError("El nombre de usuario debe tener al menos 3 caracteres")
          setIsLoading(false)
          return
        }
        if (password.length < 6) {
          setError("La contraseña debe tener al menos 6 caracteres")
          setIsLoading(false)
          return
        }

        success = await register(username, password)
        if (!success) {
          setError("El nombre de usuario ya existe")
        }
      }

      if (success) {
        router.push("/profile")
      }
    } catch (err) {
      setError("Ocurrió un error. Inténtalo de nuevo.")
      console.error(err)
    }

    setIsLoading(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader>
          <CardTitle>{isLogin ? "Iniciar sesión" : "Crear cuenta"}</CardTitle>
          <CardDescription>
            {isLogin ? "Ingresa tus datos para acceder a tu perfil" : "Crea una cuenta para guardar tu progreso"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Cargando..." : isLogin ? "Iniciar sesión" : "Crear cuenta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
