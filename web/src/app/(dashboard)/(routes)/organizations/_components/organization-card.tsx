import Link from "next/link";
import {OrganizationRead} from "@/types/generated";
import OrganizationCategoryBadge from "@/app/(dashboard)/(routes)/organizations/_components/organization-category-badge";
import {Flex, Heading, Text} from "@radix-ui/themes";
import {Building2} from "lucide-react";
import {getNonCachingImgUrl} from "@/lib/utils";

interface OrganizationCardProps {
  organization: OrganizationRead
}

const OrganizationCard = ({organization}: OrganizationCardProps) => {
  return (
    <Link href={`/organizations/${organization.id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
        {!!organization.photo ? (
          <img
            className="w-full aspect-video object-cover"
            alt={organization.name}
            src={getNonCachingImgUrl(organization.photo)}
          />
        ) : (
          <div
            className="relative w-full aspect-video bg-gray-100 flex justify-center items-center"
          >
            <Building2 className="h-7 w-7" />
          </div>
        )}

        <Flex p="3" direction="column">
          <Heading size="3" weight="medium" className="line-clamp-2">
            {organization.name}
          </Heading>

          {organization.description && (
            <Text color="gray" size="2" mt="1" className="line-clamp-4">
              {organization.description}
            </Text>
          )}

          <Flex mt="3">
            <OrganizationCategoryBadge category={organization.category} />
          </Flex>
        </Flex>
      </div>
    </Link>
  )
}

export default OrganizationCard;