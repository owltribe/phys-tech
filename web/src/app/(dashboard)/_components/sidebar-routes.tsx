"use client";

import {BarChart, Building2, Compass, Calendar, List} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import {useAuth} from "@/providers/AuthProvider";
import {useMemo} from "react";

const guestRoutes = [
  {
    icon: Compass,
    label: "Поиск услуг",
    href: "/search",
  },
  {
    icon: Building2,
    label: "Организации",
    href: "/organizations",
  },
  {
    icon: Calendar,
    label: "Мероприятия",
    href: "/events",
  },
];

const organizationRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
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

    return guestRoutes
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