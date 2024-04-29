"use client";


import {useAuth} from "@/providers/AuthProvider";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";

const RoutesProtectionProvider = () => {
  const {user} = useAuth()
  const router = useRouter()
  const currentPathname = usePathname()

  const publicOnlyRoutes = [
    '/register',
    '/reset-password',
    '/forget-password',
  ]

  useEffect(() => {
    if (publicOnlyRoutes.includes(currentPathname) && !!user) {
      router.replace('/services')
    }
  }, [currentPathname, user])

  return <></>
};

export default RoutesProtectionProvider