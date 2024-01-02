import * as React from "react"
import { Flex, HStack, Icon, Text } from "@chakra-ui/react"
import { BsStarFill } from "react-icons/bs"

export default function ReviewEmptyState() {
  return (
    <Flex alignItems="center">
      <HStack spacing={1}>
        {[0, 1, 2, 3, 4].map((s, index) => (
          <Icon
            key={`star_${index}`}
            as={BsStarFill}
            color="#979797"
            fontSize="14px"
          />
        ))}
      </HStack>
      <Text
        color="#979797"
        pl={3}
        textDecor="underline"
        _hover={{ textDecor: "none" }}
      >
        Write a review
      </Text>
    </Flex>
  )
}
