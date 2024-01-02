import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"

export default function CompleteTheLook({ product }) {
  const minPrice = product.priceRangeV2.minVariantPrice.amount || 0
  const maxPrice = product.priceRangeV2.maxVariantPrice.amount || 0

  const price =
    minPrice !== maxPrice
      ? `$${product.priceRangeV2.minVariantPrice.amount} - $${product.priceRangeV2.maxVariantPrice.amount}`
      : `$${minPrice}`

  return (
    <LinkBox as={Flex} mb={3}>
      <Image
        boxSize={{ base: "75px" }}
        srcSet={product.images[0].gatsbyImageData.images.sources[0].srcSet}
        sizes="150px"
        src={product.images[0].gatsbyImageData.images.fallback.src}
        alt={product.title}
      />
      <Flex flexDir="column" ml={4} justifyContent="center">
        <LinkOverlay as={GatsbyLink} to={`/products/${product.handle}`}>
          <Heading fontSize="12px" pt={0} py={1} variant="productTitle">
            {product.title}
          </Heading>
          <Text fontSize="13px" py={1}>
            {price}
          </Text>
        </LinkOverlay>
      </Flex>
    </LinkBox>
  )
}
