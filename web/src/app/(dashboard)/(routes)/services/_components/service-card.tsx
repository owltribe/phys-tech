import Link from "next/link";
import {Edit, Instagram} from "lucide-react";
import {formatPrice} from "@/lib/formatters";
import {Badge, Flex, Heading, IconButton, Text, Tooltip} from "@radix-ui/themes";
import {ServiceRead} from "@/types/generated";
import {getNonCachingImgUrl} from "@/lib/utils";
import {MouseEventHandler, useState} from "react";
import ServiceEditDialog from "@/app/(dashboard)/(routes)/own-services/_components/service-edit-dialog";

interface CourseCardProps {
  service: ServiceRead;
  isEditable?: boolean;
}

const ServiceCard = ({
  service,
  isEditable,
}: CourseCardProps) => {
  const [isEdit, setIsEdit] = useState(false)

  const handleEditClick: MouseEventHandler = (e) => {
    e.preventDefault()
    setIsEdit(true)
  }

  return (
    <>
      <Link href={`/services/${service.id}`} className="relative">
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
          {(isEditable && service.is_editable) && (
            <Tooltip content="Редактировать услугу">
              <IconButton className="absolute top-2 right-2 z-10 cursor-pointer" onClick={handleEditClick}>
                <Edit className="h-5 w-5" />
              </IconButton>
            </Tooltip>
          )}

          {!!service.service_images?.length ? (
            <img
              className="w-full aspect-video object-cover"
              alt={service.name}
              src={getNonCachingImgUrl(service.service_images[0].url)}
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

      <ServiceEditDialog service={service} open={isEdit} onOpenChange={setIsEdit} />
    </>
  )
}

export default ServiceCard;