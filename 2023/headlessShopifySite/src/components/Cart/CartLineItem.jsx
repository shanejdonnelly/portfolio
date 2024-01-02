import * as React from "react"
import debounce from "lodash.debounce"
import { StoreContext } from "../../context/store-context"
import { formatPrice } from "../../utils/format-price"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import { BsX } from "react-icons/bs"
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  VStack,
} from "@chakra-ui/react"

export default function CartLineItem({ item, isLast }) {
  const { removeLineItem, checkout, updateLineItem, loading } =
    React.useContext(StoreContext)
  const [quantity, setQuantity] = React.useState(item.quantity)

  const variantImage = {
    ...item.variant.image,
    originalSrc: item?.variant?.image?.src ? item.variant.image.src : "",
  }
  const price = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount)
  )

  const subtotal = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount) * quantity
  )

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id)
  }

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300
  )
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value) => uli(value), [])

  const handleQuantityChange = (value) => {
    if (value !== "" && Number(value) < 1) {
      return
    }
    setQuantity(value)
    if (Number(value) >= 1) {
      debouncedUli(value)
    }
  }

  const image = React.useMemo(
    () =>
      getShopifyImage({
        image: variantImage,
        layout: "constrained",
        crop: "contain",
        width: 160,
        height: 160,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variantImage.src]
  )

  let isOversizedSurcharge = false
  //filter oversized items
  if (
    item.variant.id ===
    "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjMxOTUzOTUzNjA2Nw=="
  ) {
    isOversizedSurcharge = true
  }

  return isOversizedSurcharge ? null : (
    <Box opacity={loading ? "0.6" : "1"}>
      <Grid
        templateColumns={{ base: "100px 1fr 80px", sm: "130px 1fr 80px" }}
        mb={5}
        gap={3}
      >
        <GridItem>
          <LinkBox as={VStack} spacing={1} alignItems="flex-start">
            <LinkOverlay
              href={`https://www.portandbay.com/products/${item.variant.product.handle}`}
            >
              {image ? (
                <GatsbyImage
                  key={variantImage.src}
                  image={image}
                  alt={variantImage.altText ?? item.variant.title}
                />
              ) : (
                <Image
                  alt={variantImage.altText ?? item.variant.title}
                  src={"/placeholder-image.png"}
                  fit={"contain"}
                  align={"center"}
                  w={"100%"}
                />
              )}
            </LinkOverlay>
          </LinkBox>
        </GridItem>

        <GridItem>
          <Flex
            flexDir={"column"}
            justifyContent="space-between"
            height={"100%"}
          >
            <LinkBox as={VStack} spacing={1} alignItems="flex-start">
              <Text>
                <LinkOverlay
                  href={`https://www.portandbay.com/products/${item.variant.product.handle}`}
                >
                  {item.title}
                </LinkOverlay>
              </Text>
              <Text color="gray.600">
                {item.variant.title === "Default Title"
                  ? ""
                  : item.variant.title}
              </Text>
            </LinkBox>
            <Flex alignItems={"flex-end"}>
              <NumberInput
                size={"sm"}
                disabled={loading}
                mt={1}
                aria-label="Quantity"
                onChange={(val) => handleQuantityChange(val)}
                value={quantity}
                min={1}
                maxW={20}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text ml={2} color="gray.600">
                at {price}
              </Text>
            </Flex>
          </Flex>
        </GridItem>

        <GridItem>
          <Flex
            flexDir={"column"}
            alignItems={"flex-end"}
            justifyContent="space-between"
            height={"100%"}
          >
            <button onClick={handleRemove}>
              <Icon
                as={BsX}
                w={8}
                h={8}
                color="gray.400"
                _hover={{ color: "gray.700" }}
              />
            </button>
            <Heading fontSize={{ base: "18px", sm: "20px" }} color="gray.900">
              {subtotal}
            </Heading>
          </Flex>
        </GridItem>
      </Grid>
      {!isLast && <Divider mb={5} />}
    </Box>
  )
}
