// import { NavbarRoutes } from "@/components/navbar-routes"

// import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <div className="flex gap-x-2 ml-auto">
        <div className="hidden md:block">
            <input
                // onChange={(e) => setValue(e.target.value)}
                // value={value}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Поиск услуг"
            />
        </div>
      </div>
    </div>
  )
}