"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserProfile } from "@/components/user-profile"
import { useUser } from "@/context/user-context"

export default function ProfilePage() {
  const { isLoggedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  return <UserProfile />
}
