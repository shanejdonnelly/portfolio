import * as React from "react"
import { Box, Flex } from "@chakra-ui/react"
import ReviewNameArea from "./ReviewNameArea"
import ReviewBody from "./ReviewBody"

export default function Review({ review, isLast }) {
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      borderBottom={isLast ? "0" : "1px solid"}
      borderColor="gray.200"
      my={3}
      py={6}
    >
      <Box minW="200px" mb={{ base: 4, md: 0 }}>
        <ReviewNameArea review={review} />
      </Box>
      <Box w="100%">
        <ReviewBody review={review} />
      </Box>
    </Flex>
  )
}
