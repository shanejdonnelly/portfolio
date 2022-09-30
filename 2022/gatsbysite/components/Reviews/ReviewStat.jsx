import * as React from "react"
import { Text, VStack } from "@chakra-ui/react"
import Stars from "./Stars"

export default function ReviewStat({ numRatings, average }) {
  const formattedAverage = (Math.round(average * 100) / 100).toFixed(2)
  return (
    <VStack spacing={3}>
      <Text fontSize="48px" lineHeight="48px">
        {formattedAverage}
      </Text>
      <Stars numStars={Math.round(average)} />
      <Text>{numRatings} Reviews</Text>
    </VStack>
  )
}
