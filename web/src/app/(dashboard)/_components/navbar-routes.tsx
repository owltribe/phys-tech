"use client";

import { usePathname } from "next/navigation";
import {LogIn, LogOut} from "lucide-react";
import {Avatar, Button} from "@radix-ui/themes";
import {SearchInput} from "@/components/search-input";
import {useAuth} from "@/providers/AuthProvider";
import UserButton from "@/app/(dashboard)/_components/user-button";

export default function NavbarRoutes() {
  const pathname = usePathname();
  const {
    user,
    openLoginModal,
  } = useAuth();

  const isServicesPage = pathname === "/services";

  return (
    <>
      {isServicesPage && (
        <div className="hidden md:contents">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center gap-x-2">
        {!!user ? (
          <UserButton user={user} />
        ) : (
          <Button size="2" variant="surface" color="gray" highContrast onClick={openLoginModal}>
            <LogIn className="h-4 w-4" />
            Войти
          </Button>
        )}
      </div>
    </>
  )
}