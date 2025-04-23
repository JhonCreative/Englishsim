"use client"

import { useState } from "react"
import { AuthForm } from "@/components/auth-form"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-md mx-auto">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          {isLogin ? "Iniciar sesión" : "Crear cuenta"}
        </h1>

        <AuthForm isLogin={isLogin} />

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline">
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  )
}
