import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

export default function SurchargeItem({ totalPrice, surchargeQty }) {
  return (
    <Box
      backgroundColor="#F7F4F0"
      border="1px solid #dccfbe"
      borderRadius="4px"
      px={4}
      py={2}
    >
      <Text>
        This cart includes {surchargeQty} product{surchargeQty > 1 ? "s" : ""}{" "}
        that require an oversized item shipping surcharge.
      </Text>
    </Box>
  )
}
