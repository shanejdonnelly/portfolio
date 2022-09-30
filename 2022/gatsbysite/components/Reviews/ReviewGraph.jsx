import * as React from "react"
import { Box, Flex, Text, VStack } from "@chakra-ui/react"

export default function ReviewGraph({ distribution, numRatings }) {
  return (
    <Flex flexDir="column">
      <Bar
        displayNum="5"
        distNum={distribution[5]}
        totalNumRatings={numRatings}
      />
      <Bar
        displayNum="4"
        distNum={distribution[4]}
        totalNumRatings={numRatings}
      />
      <Bar
        displayNum="3"
        distNum={distribution[3]}
        totalNumRatings={numRatings}
      />
      <Bar
        displayNum="2"
        distNum={distribution[2]}
        totalNumRatings={numRatings}
      />
      <Bar
        displayNum="1"
        distNum={distribution[1]}
        totalNumRatings={numRatings}
      />
    </Flex>
  )
}

function Bar({ displayNum, distNum, totalNumRatings }) {
  return (
    <Flex w="250px" alignItems="center" mb={2}>
      <Text display="inline-block" minW="12px" lineHeight="15px">
        {displayNum}
      </Text>
      <Box border="1px solid" borderColor="gray.700" w="100%">
        <Box
          bgColor="darkblue"
          h="10px"
          w={`${(distNum / totalNumRatings) * 100}%`}
        />
      </Box>
    </Flex>
  )
}
