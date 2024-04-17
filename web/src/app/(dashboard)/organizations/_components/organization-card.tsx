import Link from "next/link";
import {OrganizationRead} from "@/types/generated";
import OrganizationCategoryBadge from "@/app/(dashboard)/organizations/_components/organization-category-badge";
import {Badge, Flex, Heading, Text} from "@radix-ui/themes";
import {Building2, Clock, MapPin} from "lucide-react";
import {formatMinutesToHoursMinutes} from "@/lib/formatters";
import Image from "next/image";

interface OrganizationCardProps {
  organization: OrganizationRead
}

const OrganizationCard = ({organization}: OrganizationCardProps) => {
  return (
    <Link href={`/organizations/${organization.id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
        <div className="relative w-full aspect-video overflow-hidden">
          {organization.photo ? (
            <Image
              fill
              className="object-cover"
              alt={organization.name}
              src={organization.photo}
            />
          ) : (
            <div className="bg-gray-100 flex w-full h-full justify-center items-center">
              <Building2 className="h-7 w-7" />
            </div>
          )}
        </div>

        <Flex pt="2" p="3" direction="column">
          <Heading size="4" className="line-clamp-2">
            {organization.name}
          </Heading>

          {organization.description && (
            <Text color="gray" size="2" mt="2" className="line-clamp-4">
              {organization.description}
            </Text>
          )}

          <Flex my="3" gap="2">
            <OrganizationCategoryBadge category={organization.category} />
          </Flex>
        </Flex>
      </div>
    </Link>
  )
}

export default OrganizationCard;