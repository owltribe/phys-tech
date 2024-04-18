import { SidebarRoutes } from "./sidebar-routes"
import Image from "next/image";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="h-full md:h-auto md:min-h-[calc(100vh-80px)] overflow-y-auto border-r flex flex-col bg-white shadow-sm">
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>

      <Link
        href='https://play.google.com/store/apps/details?id=com.asgard.sciencephysservices'
        className="hover:shadow-sm transition overflow-hidden border rounded-lg p-4 m-3 mt-auto"
      >
        <Image
          height={40}
          width={140}
          alt="logo"
          src="/google-play.svg"
          className="fill-gray-800"
        />
      </Link>
    </div>
  )
}