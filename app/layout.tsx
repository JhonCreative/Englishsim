import type React from "react"
import type { Metadata } from "next"
import { UserProvider } from "@/context/user-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Englishsim",
  description: "Created Group 5",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
