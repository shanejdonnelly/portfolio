import * as React from "react"
import { Box, Flex } from "@chakra-ui/react"
import ReviewGraph from "./ReviewGraph"
import ReviewStat from "./ReviewStat"

export default function ReviewSummary({ data }) {
  return (
    <Flex justifyContent="space-between">
      <Flex>
        {data.ratingAverage && (
          <Box mr={10}>
            <ReviewStat
              average={data.ratingAverage}
              numRatings={data.numRatings ? data.numRatings : 0}
            />
          </Box>
        )}
        {data.ratingDistribution && data.numRatings && (
          <ReviewGraph
            distribution={data.ratingDistribution}
            numRatings={data.numRatings}
          />
        )}
      </Flex>
    </Flex>
  )
}
