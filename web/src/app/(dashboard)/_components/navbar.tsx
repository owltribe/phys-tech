import MobileSidebar from "./mobile-sidebar";
import {Logo} from "@/app/(dashboard)/_components/logo";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <div className="flex gap-x-2 justify-between w-full">
        <Logo />

        <MobileSidebar />
      </div>
    </div>
  )
}