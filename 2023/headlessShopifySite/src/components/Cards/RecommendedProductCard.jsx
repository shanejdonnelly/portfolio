import * as React from "react"
import {
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"

//very similar in appearance to CollectionGridProductItem
//but very different data in
export default function RecommendedProductCard({ product }) {
  const width = "275px"
  const mobileWidth = "170px"
  const onSale = product.compare_at_price

  /*
  PRICE LOGIC
  */
  let salePrice = ""
  let regularPrice = ""
  if (onSale) {
    //
    //ON SALE
    //
    const lowSalePrice = product.price_min ? product.price_min : product.price
    const highSalePrice = product.price_max
      ? product.price_max
      : product.compare_at_price_max
      ? product.compare_at_price_max
      : product.price
    const lowRegularPrice = product.compare_at_price_min
      ? product.compare_at_price_min
      : product.price
    const highRegularPrice = product.compare_at_price_max
      ? product.compare_at_price_max
      : product.price

    if (lowSalePrice !== highSalePrice) {
      //showRange
      salePrice = `${(lowSalePrice / 100).toFixed(2)} - ${(
        highSalePrice / 100
      ).toFixed(2)}`
    } else {
      //no range
      salePrice = lowSalePrice
        ? `${(lowSalePrice / 100).toFixed(2)}`
        : `${(product.price / 100).toFixed(2)}`
    }

    if (lowRegularPrice !== highRegularPrice) {
      //showRange
      regularPrice = `${(lowRegularPrice / 100).toFixed(2)} - ${(
        highRegularPrice / 100
      ).toFixed(2)}`
    } else {
      //no range
      regularPrice = lowRegularPrice
        ? `${(lowRegularPrice / 100).toFixed(2)}`
        : `${(product.price / 100).toFixed(2)}`
    }
  } else {
    //
    //NOT ON SALE
    //
    const lowRegularPrice = product.price_min
      ? product.price_min
      : product.price
    const highRegularPrice = product.price_max
      ? product.price_max
      : product.price
    if (lowRegularPrice !== highRegularPrice) {
      //showRange
      regularPrice = `${(lowRegularPrice / 100).toFixed(2)} - ${(
        highRegularPrice / 100
      ).toFixed(2)}`
    } else {
      //no range
      regularPrice = `${(lowRegularPrice / 100).toFixed(2)}`
    }
  }
  //END PRICE LOGIC

  const colorOptions = product.options.find(
    (opt) => opt.name === "Vendor Color Name"
  )
  const numColors = colorOptions ? colorOptions.values.length : null

  return (
    <LinkBox
      as="article"
      w={{ sm: mobileWidth, md: width }}
      position="relative"
      left="50%"
      transform="translateX(-50%)"
    >
      {onSale && (
        <Text
          background="gray.200"
          fontSize="11px"
          height="22px"
          lineHeight="22px"
          position="absolute"
          right="12px"
          textAlign="center"
          top="12px"
          width="48px"
        >
          SALE
        </Text>
      )}
      <Image
        alt={product.title}
        src={product.featured_image}
        objectFit={"cover"}
        align={"center"}
        boxSize={{ base: mobileWidth, sm: width }}
      />

      <LinkOverlay href={`/products/${product.handle}`}>
        <Heading
          variant="productTitle"
          minH="52px"
          noOfLines={2}
          w={{ base: mobileWidth, sm: width }}
        >
          {product.title}
        </Heading>
        <Box>
          {onSale ? (
            <Flex flexWrap={{ base: "wrap", sm: "nowrap" }}>
              <Text>${salePrice}</Text>
              <Text
                color="gray.400"
                textDecor="line-through"
                pl={{ base: 0, sm: 2 }}
              >
                ${regularPrice}
              </Text>
            </Flex>
          ) : (
            <Text>${regularPrice}</Text>
          )}
        </Box>
      </LinkOverlay>

      {numColors && numColors > 1 && (
        <Text color="gray.500">Available in {numColors} colors</Text>
      )}
    </LinkBox>
  )
}
