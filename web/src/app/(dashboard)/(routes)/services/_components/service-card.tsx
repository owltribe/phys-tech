import Link from "next/link";
import {Instagram} from "lucide-react";
import {formatPrice} from "@/lib/formatters";
import {Badge, Flex, Heading, Text} from "@radix-ui/themes";
import {ServiceRead} from "@/types/generated";

interface CourseCardProps {
  service: ServiceRead;
}

const ServiceCard = ({
  service,
}: CourseCardProps) => {
  return (
    <Link href={`/services/${service.id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
        {!!service.service_images?.length ? (
          <img
            className="w-full aspect-video object-cover"
            alt={service.name}
            src={service.service_images[0].url}
          />
        ) : (
          <div
            className="relative w-full aspect-video bg-gray-100 flex justify-center items-center"
          >
            <Instagram className="h-7 w-7" />
          </div>
        )}
        <Flex p="3" direction="column">
          <Text color="gray" size="1" className="uppercase">
            {service.organization.name}
          </Text>

          <Heading size="4" mt="3" weight="medium" className="line-clamp-2">
            {service.name}
          </Heading>

          <Text color="gray" mt="1" size="2" className="line-clamp-3">
            {service.description}
          </Text>

          <Flex mt="3" gap="2">
            <Badge size="2" color="green">
              {formatPrice(service.cost)}
            </Badge>
          </Flex>
        </Flex>
      </div>
    </Link>
  )
}

export default ServiceCard;