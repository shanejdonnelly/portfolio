import * as React from "react"
import { StoreContext } from "../../context/store-context"
import { Box, Icon, Text } from "@chakra-ui/react"
import { BsBag as BagIcon } from "react-icons/bs"

export default function CartLink() {
  const { checkout } = React.useContext(StoreContext)

  const emptyCart = checkout.lineItems.length === 0
  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <Box pos="relative" w={6} h={6}>
      <Icon as={BagIcon} w={6} h={6} pos="absolute" top="-5px" />
      {!emptyCart && (
        <Text
          fontSize="xs"
          pos="absolute"
          left={quantity < 10 ? "9px" : "5px"}
          top="1px"
        >
          {quantity}
        </Text>
      )}
    </Box>
  )
}
