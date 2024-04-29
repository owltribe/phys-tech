'use client'

import {Button, Card, Flex, Heading, Text} from "@radix-ui/themes";
import CreateServiceRequestAlertDialog from "./CreateServiceRequestAlertDialog";
import {ServiceRead} from "@/types/generated";

interface ActionsCardProps {
  service: ServiceRead
}

const ActionsCard = ({
  service
}: ActionsCardProps) => {

  console.log(service, "service")
  if (service.is_editable) {
    <Card
      size="3"
      className="bg-gradient-to-r from-yellow-500 to-indigo-500"
    >
      <Flex direction="column" gap="4">
        <Heading size="3">
          Заинтересовались услугой?
        </Heading>
        <Text as="div" color="gray" size="2">
          Оставьте заявку и организация свяжется с вами.
        </Text>
        <CreateServiceRequestAlertDialog service={service}>
          <Button
            size="2"
            className="w-full"
            color="yellow"
          >
            Редактировать услугу
          </Button>
        </CreateServiceRequestAlertDialog>
      </Flex>
    </Card>
  }

  return (
    <Card
      size="3"
      className="bg-gradient-to-r from-sky-500 to-indigo-500"
    >
      <Flex direction="column" gap="4">
        <Heading size="3">
          Заинтересовались услугой?
        </Heading>
        <Text as="div" color="gray" size="2">
          Оставьте заявку и организация свяжется с вами.
        </Text>
        <CreateServiceRequestAlertDialog service={service}>
          <Button
            size="2"
            className="w-full"
          >
            Запросить услугу
          </Button>
        </CreateServiceRequestAlertDialog>
      </Flex>
    </Card>
  )
}

export default ActionsCard