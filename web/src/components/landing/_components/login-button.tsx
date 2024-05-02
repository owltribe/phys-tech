'use client'

import Button from "@/components/landing/Button";
import {useAuth} from "@/providers/AuthProvider";
import {useRouter} from "next/navigation";

const LoginButton = () => {
  const router = useRouter()
  const {user, openLoginModal} = useAuth()

  const handleLogin = () => {
    if (!!user) {
      router.replace('/services')
    } else {
      openLoginModal()
    }
  }

  return (
    <Button onClick={handleLogin}>
      Войти
    </Button>
  )
}

export default LoginButton