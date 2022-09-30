import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react"
import { formatPrice } from "../../utils/format-price"

export default function ProductCard2({
  imageSrc = "",
  title = "",
  titleAlign = "left",
  titleSize = "sm",
  description = "",
  link = "",
  maxPrice = null,
  minPrice = null,
  roundImage = false,
  width = "300px",
}) {
  return (
    <LinkBox as={VStack} flex={`0 0 ${width}`} mb={16} mx={4}>
      <Image
        borderRadius={roundImage ? "full" : "none"}
        boxSize={width}
        objectFit="cover"
        src={imageSrc}
        alt={title}
      />
      <LinkOverlay as={GatsbyLink} to={link}>
        <Heading as="h3" mt={2} size={titleSize} px={6} textAlign={titleAlign}>
          {title}
        </Heading>
      </LinkOverlay>
      {!!description.length && (
        <Text px={6} textAlign="center">
          {description}
        </Text>
      )}
      {minPrice && (
        <Text mt={0}>
          {formatPrice("USD", minPrice)}
          {maxPrice && <span> - {formatPrice("USD", maxPrice)}</span>}
        </Text>
      )}
    </LinkBox>
  )
}
