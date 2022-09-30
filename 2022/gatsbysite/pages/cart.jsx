import * as React from "react"
import Layout from "../components/Layout/Layout"
import { StoreContext } from "../context/store-context"
import CartLineItem from "../components/Cart/CartLineItem"
import EmptyState from "../components/EmptyState"
import { formatPrice } from "../utils/format-price"
import Seo from "../components/Layout/Seo"
import {
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react"

export default function CartPage() {
  const { checkout, loading } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const items = checkout ? checkout.lineItems : []
  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const handleCheckout = () => {
    const checkoutUrl = checkout.webUrl.replace(
      "portbaydev.myshopify.com",
      "shop.morgandonnelly.com"
    )
    window.location = checkoutUrl
  }

  return (
    <Layout>
      <Container maxW={"container.xl"} mb={8}>
        {emptyCart ? (
          <EmptyState
            mt={8}
            icon={null}
            text="Your cart is empty"
            subText="Let's find some home essentials you'll love."
            link="/shop/curtains-drapes"
            linkText="Shop Now"
          />
        ) : (
          <Grid templateColumns="repeat(12, 1fr)" gap={12}>
            <GridItem colSpan={{ base: "12", lg: "7" }}>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="xl" my={4}>
                  Cart
                </Heading>
                <Text fontSize={"md"} ml={2} color="gray.500">
                  ({quantity} Items)
                </Text>
              </Flex>
              <Divider mb={4} />
              {checkout.lineItems.map((item, index) => (
                <CartLineItem
                  item={item}
                  key={item.id}
                  isLast={index === checkout.lineItems.length - 1}
                />
              ))}
            </GridItem>

            <GridItem colSpan={{ base: "12", lg: "5" }}>
              <Heading size="xl" my={4}>
                Summary
              </Heading>
              <Flex py={2} justifyContent="space-between">
                <Text>Subtotal</Text>
                <Text textAlign="right">
                  {formatPrice(
                    checkout.subtotalPriceV2.currencyCode,
                    checkout.subtotalPriceV2.amount
                  )}
                </Text>
              </Flex>
              <Divider borderColor="gray.300" />

              <Flex py={2} justifyContent="space-between">
                <Text>Shipping</Text>
                <Text textAlign="right">Calculated at next step</Text>
              </Flex>
              <Divider borderColor="gray.300" />

              <Flex py={2} justifyContent="space-between">
                <Text>Tax</Text>
                <Text textAlign="right">
                  {formatPrice(
                    checkout.totalTaxV2.currencyCode,
                    checkout.totalTaxV2.amount
                  )}
                </Text>
              </Flex>
              <Divider borderColor="gray.600" />

              <Flex py={2} justifyContent="space-between">
                <Text fontWeight="700" fontSize="lg">
                  Total
                </Text>
                <Text fontWeight="700" fontSize="lg" textAlign="right">
                  {formatPrice(
                    checkout.totalPriceV2.currencyCode,
                    checkout.totalPriceV2.amount
                  )}
                </Text>
              </Flex>

              <Button
                onClick={handleCheckout}
                disabled={loading}
                mt={3}
                variant="blue"
                size="lg"
                width="100%"
              >
                Checkout
              </Button>
            </GridItem>
          </Grid>
        )}
      </Container>
    </Layout>
  )
}
export const Head = ({ location, params, data, pageContext }) => (
  <Seo
    title="Cart"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
