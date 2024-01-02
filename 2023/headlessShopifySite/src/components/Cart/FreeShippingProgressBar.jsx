import * as React from "react"
import { navigate } from "gatsby"
import { Box, Progress, Text } from "@chakra-ui/react"

export default function FreeShippingProgressBar({ subtotal }) {
  let qualifies = false
  let priceDiff = 150 - subtotal
  let progress = 100

  if (priceDiff < 0) {
    qualifies = true
  } else {
    progress = 100 - (priceDiff / 150) * 100
  }

  return qualifies ? (
    <Box mt={2}>
      <Text fontSize="13px" mb={1} textAlign="center">
        Your order qualifies for Free Shipping!
      </Text>
      <Progress
        h="8px"
        borderRadius="4px"
        bgColor="gray.300"
        value={progress}
      />
    </Box>
  ) : (
    <Box mt={2}>
      <Text fontSize="13px" mb={1} textAlign="center">
        You're{" "}
        <span style={{ fontWeight: "700" }}>${priceDiff.toFixed(2)}</span> away
        from free shipping!
      </Text>
      <Progress
        h="8px"
        borderRadius="4px"
        bgColor="gray.300"
        value={progress}
      />
    </Box>
  )
}
