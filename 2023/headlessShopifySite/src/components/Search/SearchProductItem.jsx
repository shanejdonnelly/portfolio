import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Image,
} from "@chakra-ui/react"

const SearchProductItem = ({
  handle,
  images,
  priceRangeV2,
  title,
  variants,
  product,
}) => {
  let imageSrc = "/placeholder-image.png"
  if (images) {
    imageSrc = images
  }

  let width = {
    base: "270px",
    sm: "230px",
    md: "240px",
    lg: "240px",
    xl: "236px",
  }

  const colorOptions = product.options.find(
    (opt) => opt.name === "Vendor Color Name"
  )
  const numColors = colorOptions ? colorOptions.values.length : null

  let onSale = false
  if (variants && !!variants.length) {
    variants.forEach((v) => {
      if (v.compareAtPrice) {
        onSale = true
      }
    })
  }

  return (
    <Box position="relative">
      <LinkBox as="article" w={width}>
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
          alt={title}
          src={imageSrc}
          objectFit={"contain"}
          align={"center"}
          boxSize={width}
        />

        <LinkOverlay as={GatsbyLink} to={`/products/${handle}`}>
          <Heading variant="productTitle" minH="52px" noOfLines={2} w={width}>
            {title}
          </Heading>
          <Text>
            ${priceRangeV2.minVariantPrice.amount} - $
            {priceRangeV2.maxVariantPrice.amount}
          </Text>
        </LinkOverlay>

        {numColors && numColors > 1 && (
          <Text color="gray.500">Available in {numColors} colors</Text>
        )}
      </LinkBox>
    </Box>
  )
}

export default SearchProductItem
