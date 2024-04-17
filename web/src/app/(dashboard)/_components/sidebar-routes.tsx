"use client";

import {Building2, Compass, CalendarSearch} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import {useAuth} from "@/providers/AuthProvider";
import {useMemo} from "react";

const clientAndGuestRoutes = [
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
];

const organizationRoutes = [
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

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const {user} = useAuth()

  const isOrganization = pathname?.includes("/teacher");

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