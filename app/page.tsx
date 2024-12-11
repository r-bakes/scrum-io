'use client'
import { useAuthContext } from '@/context/auth/authContext'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Home() {
  const router = useRouter()
  const { user } = useAuthContext()

  React.useEffect(() => {
    if (user == null) {
      router.push("/auth/signin")
    } else {
      router.push("/core/projects")
    }
  }, [user])

  return <div></div>
  

  
}
