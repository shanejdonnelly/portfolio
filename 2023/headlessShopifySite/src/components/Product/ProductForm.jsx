import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Text,
} from "@chakra-ui/react"
import { BiRuler } from "react-icons/bi"
import { FaTruckMoving } from "react-icons/fa"
import ImageSwatch from "./ImageSwatch"
import AddToCartButton from "../AddToCartButton"
import ReviewEmptyState from "./ReviewEmptyState"
import CompleteTheLook from "../Cards/CompleteTheLook"
import NotifyStockButton from "./NotifyStockButton"

export default function ProductForm({
  product,
  variant,
  reviewsRef,
  selectedColor,
  selectedSize,
  optionAvailable,
  optionExists,
  discontinued,
  colorSwatchImages,
  colorOptions,
  optionIsActive,
  handleOptionChange,
  available,
  sizeOptions,
  setCartDrawerOpen,
  completeTheLookData,
  setQueryStringParameter,
  location,
}) {
  const [quantity, setQuantity] = React.useState(1)

  const initialSearchParams = new URLSearchParams(location.search)

  const arrayProductId = product.shopifyId.split("/")
  const productId = arrayProductId?.pop()
  const arrayVariantId = variant?.shopifyId?.split("/")
  const variantId = arrayVariantId?.pop()

  /*
    getSizeButtonVariant()
    Size Option Button Variant logic
  */
  const getSizeButtonVariant = (sizeOption) => {
    //DEFAULT
    let sizeButtonVariant = "productOption"

    //DISCONTINUED
    if (discontinued && !optionAvailable(selectedColor, sizeOption)) {
      sizeButtonVariant = "productOptionDiscontinued"
    }
    //ACTIVE
    if (selectedSize === sizeOption) {
      sizeButtonVariant = "productOptionActive"
      //check if is discontinued and active
      if (discontinued && !optionAvailable(selectedColor, sizeOption)) {
        sizeButtonVariant = "productOptionDiscontinuedActive"
      }
    }
    return sizeButtonVariant
  }

  return (
    <Stack spacing={{ base: 6, md: 10 }}>
      <Box>
        <Heading lineHeight={1.1} fontWeight={100} fontSize={{ base: "28px" }}>
          {product.title}
        </Heading>

        <Flex mt={3} alignItems="baseline">
          <Heading
            color={"gray.900"}
            fontWeight={300}
            fontSize={"20px"}
            lineHeight="20px"
          >
            ${variant?.price}
          </Heading>
          {variant?.compareAtPrice ? (
            <Heading
              lineHeight="20px"
              ml={3}
              color={"gray.500"}
              fontSize={"16px"}
              textDecoration="line-through"
            >
              ${variant.compareAtPrice}
            </Heading>
          ) : null}
        </Flex>

        {/* REVIEWS */}
        <Box
          minH="24px"
          mt={6}
          cursor="pointer"
          onClick={() => {
            reviewsRef.current.scrollIntoView({ behavior: "smooth" })
          }}
          position="relative"
        >
          <Box position="absolute" top={0} left={0}>
            <ReviewEmptyState />
          </Box>
          <span
            style={{
              background: "white",
              left: 0,
              position: "absolute",
              top: 0,
              width: "100%",
            }}
            className="junip-product-summary"
            data-product-id={productId}
          ></span>
        </Box>

        {/* DISCONTINUED */}
        {discontinued && (
          <Text mt={8} fontSize="14px" color="black" fontWeight={700}>
            Discontinued Item - Inventory is Limited
          </Text>
        )}
        {/* SWATCH COLOR SELECT */}
        {!!product.variants.length && (
          <Box mt={6}>
            <Flex mt={6} alignItems="baseline">
              <Text variant="upperCaseLabel">Color</Text>
              <Text ml={2} fontSize="14px" color="black">
                {selectedColor}
              </Text>
            </Flex>

            <Flex mt={2} flexWrap="wrap">
              {colorOptions.map((option, index) => (
                <ImageSwatch
                  key={`colorSwatch_${index}`}
                  option={option}
                  srcSet={colorSwatchImages[index]}
                  opacity={optionExists(option, selectedSize) ? "1" : "0.35"}
                  optionIsAvailable={optionExists(option, selectedSize)}
                  optionIsActive={(name, value) => {
                    return selectedColor === value
                  }}
                  handleOptionChange={(name, value) => {
                    setQueryStringParameter("color", value)
                    handleOptionChange("Vendor Color Name", option)
                  }}
                />
              ))}
            </Flex>
          </Box>
        )}

        {/* SIZE SELECT */}
        {!!product.variants.length && (
          <Box mt={6}>
            <Flex mt={6} alignItems="baseline">
              <Text variant="upperCaseLabel">Size</Text>
              <Text ml={2} fontSize="14px" color="black" lineHeight="20px">
                {selectedSize}
              </Text>
            </Flex>

            {sizeOptions.map((option, index) => (
              <Button
                key={`sizeBtn_${index}`}
                mr={4}
                mt={4}
                variant={getSizeButtonVariant(option)}
                opacity={
                  !optionAvailable(selectedColor, option)
                    ? "0.35"
                    : optionExists(selectedColor, option)
                    ? "1"
                    : "0.35"
                }
                onClick={() => {
                  setQueryStringParameter("size", option)
                  handleOptionChange("Size", option)
                }}
              >
                {option}
              </Button>
            ))}
          </Box>
        )}

        {/* MEASURING GUIDE */}
        <Link as={GatsbyLink} to="/resources">
          <Flex mt={5} ml={1}>
            <Icon as={BiRuler} w={5} h={5} color="gray.700" />
            <Text fontSize="13px" ml={2}>
              View Our Measuring Guide
            </Text>
          </Flex>
        </Link>

        {/* AVAILABILITY */}
        <Text mt={8} ml={2} fontSize="14px" color="black">
          {available ? "In Stock" : discontinued ? "Sold Out" : "Out of Stock"}
        </Text>

        {/* QUANTITY & ADD TO CART BUTTON */}
        <Flex alignItems="center" mt={3}>
          <NumberInput
            mt={0}
            aria-label="Quantity"
            onChange={(val) => setQuantity(val)}
            value={quantity}
            min={1}
            maxW={20}
            mr={4}
            size="lg"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <AddToCartButton
            variant={variant}
            product={product}
            available={available}
            variantId={variant?.storefrontId}
            quantity={quantity}
            openCartDrawer={() => setCartDrawerOpen(true)}
          />
        </Flex>

        {variant && !available && !discontinued && (
          <Box ml={24} mt={4}>
            <NotifyStockButton
              variantId={variantId}
              productId={productId}
              productTitle={product.title}
            />
          </Box>
        )}

        {/* FREE SHIPPING LINE */}
        <Flex alignItems="center" ml={{ base: 1, lg: "70px" }} mt={5}>
          <Icon as={FaTruckMoving} w={4} h={4} color="black" />
          <Text pl={2} fontSize="14px">
            <span style={{ fontWeight: "700" }}>Free Shipping</span> on orders
            over $150*
            <Link
              as={GatsbyLink}
              to="/pages/shipping"
              textDecor="underline"
              pl={2}
              _hover={{ textDecor: "none" }}
            >
              Learn More
            </Link>
          </Text>
        </Flex>

        {/* Complete The Look */}
        {!!completeTheLookData.length && (
          <Flex flexDir="column" mt={12}>
            <Text fontSize="16px" fontWeight="700" lineHeight="24px" mb={4}>
              Complete the look
            </Text>
            {completeTheLookData.map((c) => (
              <CompleteTheLook product={c.node} />
            ))}
          </Flex>
        )}
      </Box>
    </Stack>
  )
}
