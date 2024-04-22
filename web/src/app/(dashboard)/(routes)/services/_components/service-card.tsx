import Link from "next/link";
import {Banknote, Instagram} from "lucide-react";
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
          <Text color="gray" size="1">
            {service.organization.name}
          </Text>

          <Heading size="3" weight="medium" mt="1" className="line-clamp-2">
            {service.name}
          </Heading>

          <Flex mt="3">
            <Badge color="green" radius="full" size="2">
              <Banknote className="flex w-4 h-4" />
              {formatPrice(service.cost)}
            </Badge>
          </Flex>
        </Flex>
      </div>
    </Link>
  )
}

export default ServiceCard;