"use client";

import {Building2, Compass, CalendarSearch, Table2} from "lucide-react";

import { SidebarItem } from "./sidebar-item";
import {useAuth} from "@/providers/AuthProvider";
import {useMemo} from "react";

const publicRoutes = [
  {
    icon: Compass,
    label: "Поиск услуг",
    href: "/services",
  },
  {
    icon: Building2,
    label: "Организации",
    href: "/organizations",
  },
  {
    icon: CalendarSearch,
    label: "Мероприятия",
    href: "/events",
  },
]

const clientAndGuestRoutes = [
  ...publicRoutes
];

const organizationRoutes = [
  ...publicRoutes,
  {
    icon: Table2,
    label: "Мои услуги",
    href: "/own-services",
  }
]

export const SidebarRoutes = () => {
  const {user} = useAuth()

  const routes = useMemo(() => {
    if (user && user.role === "Organization") {
      return organizationRoutes
    }

    return clientAndGuestRoutes
  }, [user]);

  return (
    <div className="space-y-1.5 p-3 flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}