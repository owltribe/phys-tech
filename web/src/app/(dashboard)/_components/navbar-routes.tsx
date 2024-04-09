"use client";

import { usePathname } from "next/navigation";
import {LogIn, LogOut} from "lucide-react";
import {Button} from "@radix-ui/themes";
import {SearchInput} from "@/components/search-input";
import {useAuth} from "@/providers/AuthProvider";

export default function NavbarRoutes() {
  const {
      user,
      onLogout,
      openLoginModal,
      closeLoginModal,
  } = useAuth();
  const pathname = usePathname();

  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:contents">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center gap-x-2">
        {!!user ? (
          <Button size="2" color="red" variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Выйти
          </Button>
          ) : (
          <Button size="2" onClick={openLoginModal}>
            <LogIn className="h-4 w-4 mr-2" />
            Войти
          </Button>
        )}
      </div>
    </>
  )
}