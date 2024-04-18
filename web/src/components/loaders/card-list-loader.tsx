import {Flex, Heading, Skeleton, Text} from "@radix-ui/themes";

const CardListLoader = () => {
  return Array.from(Array(9).keys()).map((i) => (
    <div key={i} className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
      <Skeleton className="aspect-video" width="100%" height="195px" />

      <Flex p="3" direction="column">
        <Text color="gray" size="1">
          <Skeleton>Lorem ipsum dolor sit amet Lorem ipsum</Skeleton>
        </Text>

        <Heading size="3" weight="medium" mt="1" className="line-clamp-2">
          <Skeleton>Lorem ipsum dolor sit amet Lorem ipsum</Skeleton>
        </Heading>

        <Skeleton mt="3" width="70px" />
      </Flex>
    </div>
  ))
}

export default CardListLoader