import * as React from "react"
import { navigate } from "gatsby"
import { StoreContext } from "../../context/store-context"
import { formatPrice } from "../../utils/format-price"
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Link,
  Drawer,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react"
import CartLineItem from "./CartLineItem"
import EmptyState from "../EmptyState"
import FreeShippingProgressBar from "./FreeShippingProgressBar"
import SurchargeItem from "./SurchargeItem"

export default function CartDrawer({ isOpen, onClose, handle }) {
  const { checkout, loading } = React.useContext(StoreContext)

  const convertCheckoutUrl = function (checkoutUrl) {
    return checkoutUrl.replace(
      "portbaydev.myshopify.com",
      "shop.portandbay.com"
    )
  }

  const emptyCart = checkout.lineItems.length === 0
  const items = checkout ? checkout.lineItems : []

  //START check for oversize items and surcharge item
  let surchargeQty = 0
  let surchargePrice = 0
  let surchargeTotal = 0
  const surchargeLineItem = items.find(
    (item) =>
      item.variant.id ===
      "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjMxOTUzOTUzNjA2Nw=="
  )
  if (surchargeLineItem) {
    surchargeQty = surchargeLineItem.quantity
    surchargePrice = surchargeLineItem.variant.price
    surchargeTotal = parseFloat(surchargePrice, 10) * surchargeQty
  }
  //END check for oversize items and surcharge item

  const checkoutLineItems = items.filter(
    (item) =>
      item.variant.id !==
      "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjMxOTUzOTUzNjA2Nw=="
  )

  const filteredQuantity = checkoutLineItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const firstRender = React.useRef(true)

  React.useEffect(() => {
    if (firstRender && loading) {
      firstRender.current = false
    }
  }, [loading])

  const closeDrawer = () => {
    firstRender.current = true
    onClose()
  }

  return (
    <Drawer size="sm" isOpen={isOpen} onClose={closeDrawer} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton boxSize={12} size={10} />
        <DrawerHeader>
          <Flex alignItems={"center"}>
            <Heading size="lg">My Cart</Heading>
            <Text fontSize={"sm"} ml={2} color="gray.500">
              ({filteredQuantity})
            </Text>
          </Flex>
          {!emptyCart && (
            <FreeShippingProgressBar subtotal={checkout.totalPriceV2.amount} />
          )}
        </DrawerHeader>
        <Divider />
        <DrawerBody>
          {loading && firstRender.current ? (
            <Center>
              <Spinner mt={4} />
            </Center>
          ) : (
            <Box mt={4}>
              {emptyCart ? (
                <EmptyState
                  icon={null}
                  text="Your cart is empty"
                  subText="Let's find some home essentials you'll love."
                  link="/collections/curtains-drapes"
                  linkText="Shop Now"
                />
              ) : (
                items.map((item, index) => (
                  <CartLineItem
                    item={item}
                    key={item.id}
                    isLast={index === checkout.lineItems.length - 1}
                  />
                ))
              )}
              {!!surchargeQty && (
                <SurchargeItem
                  totalPrice={surchargeTotal}
                  surchargeQty={surchargeQty}
                />
              )}
            </Box>
          )}
        </DrawerBody>
        {!emptyCart && (
          <DrawerFooter p={0} m={0}>
            <Box bg="gray.100" width="100%">
              <Flex justifyContent="space-between" p={3}>
                <Heading fontWeight="700" size="md" color="gray.900">
                  Subtotal
                </Heading>
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  <Text fontSize="lg" color="gray.900">
                    {formatPrice(
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount
                    )}
                  </Text>
                )}
              </Flex>
              <Divider borderColor="gray.400" />
              <Center mt={6}>
                <Button
                  disabled={loading}
                  onClick={() => {
                    navigate(convertCheckoutUrl(checkout.webUrl))
                  }}
                  variant="blue"
                  width="90%"
                >
                  Checkout
                </Button>
              </Center>
              <Center>
                <Link
                  mb={4}
                  mt={2}
                  onClick={closeDrawer}
                  fontSize="13px"
                  textDecor="underline"
                  _hover={{ textDecor: "none" }}
                >
                  Continue Shopping
                </Link>
              </Center>
            </Box>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
