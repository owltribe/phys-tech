import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"
import Image from "next/image";
import {Card} from "@radix-ui/themes";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      {/*<div className="p-6">*/}
      {/*  <Logo />*/}
      {/*</div>*/}
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      {/*<div className="mt-auto p-6 flex flex-col w-full">*/}
      {/*  <div className="flex justify-center items-center px-2 py-4 bg-gray-900 rounded-md">*/}
      {/*      <Image*/}
      {/*        height={40}*/}
      {/*        width={140}*/}
      {/*        alt="google-play"*/}
      {/*        src="/google-play.svg"*/}
      {/*        className="fill-black"*/}
      {/*      />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}