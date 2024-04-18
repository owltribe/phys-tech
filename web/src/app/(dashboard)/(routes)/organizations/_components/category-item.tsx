import Link from "next/link";
import {cn} from "@/lib/utils";

interface CategoryItemProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

const CategoryItem = ({href, children, isActive}: CategoryItemProps) => (
  <Link href={href}>
    <div
      className={cn(
        "py-2 px-3 text-sm bg-white rounded-md flex items-center gap-x-1 hover:shadow-sm transition cursor-pointer border",
        isActive && "border-sky-800/10 bg-sky-500/10 text-sky-800",
      )}>
      <div className="truncate text-xs font-semibold">
        {children}
      </div>
    </div>
  </Link>
)

export default CategoryItem