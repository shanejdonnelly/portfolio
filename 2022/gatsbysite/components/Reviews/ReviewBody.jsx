import * as React from "react"
import dayjs from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"
import { Flex, Heading, Text } from "@chakra-ui/react"
import Stars from "./Stars"

dayjs.extend(RelativeTime)

export default function Reviewbody({ review }) {
  const { reviewTitle, body, productTitle, numStars, reviewDate, recommend } =
    review

  return (
    <>
      <Flex justifyContent="space-between" mb={2}>
        <Stars numStars={numStars} />
        <Text fontSize="13px">{dayjs(reviewDate).fromNow()}</Text>
      </Flex>
      <Heading as="h4" size="md" mb={2}>
        {reviewTitle}
      </Heading>
      <Text fontSize="sm">{body}</Text>
      <Text fontSize="13px" mt={3} color="gray.500">
        Review left for: {productTitle}
      </Text>
    </>
  )
}
