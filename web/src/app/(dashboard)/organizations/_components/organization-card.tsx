import Image from "next/image";
import Link from "next/link";
import {Instagram} from "lucide-react";
import {formatPrice} from "@/lib/formatters";
import {OrganizationRead} from "@/types/generated";
import OrganizationCategoryBadge from "@/app/(dashboard)/organizations/_components/organization-category-badge";

interface OrganizationCardProps {
  organization: OrganizationRead
}

const OrganizationCard = ({organization}: OrganizationCardProps) => {
  return (
    <Link href={`/organizations/${organization.id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
        {/*<div className="relative w-full aspect-video overflow-hidden">*/}
        {/*  {imageUrl ? (*/}
        {/*    <Image*/}
        {/*      fill*/}
        {/*      className="object-cover"*/}
        {/*      alt={title}*/}
        {/*      src={imageUrl}*/}
        {/*    />*/}
        {/*  ) : (*/}
        {/*    <div className="bg-gray-100 flex w-full h-full justify-center items-center">*/}
        {/*      <Instagram className="h-7 w-7" />*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}
        <div className="flex flex-col pt-2 p-3">
          <div className="text-sm md:text-base font-medium group-hover:text-sky-700 transition line-clamp-1">
            {organization.name}
          </div>
          <p className="text-xs text-muted-foreground">
            {organization.description}
          </p>
          <div className="mt-4">
            <OrganizationCategoryBadge category={organization.category} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default OrganizationCard;