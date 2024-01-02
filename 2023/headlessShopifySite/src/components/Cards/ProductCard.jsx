import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"
import { formatPrice } from "../../utils/format-price"
import { BsArrowRight } from "react-icons/bs"

export default function ProductCard({
  image,
  title = "",
  description = "",
  link = "",
  showButton = true,
  maxPrice = null,
  minPrice = null,
  roundImage = false,
  width = "320px",
}) {
  return (
    <LinkBox as={Box} flex={`0 0 100%`} mb={16}>
      <Image
        borderRadius={roundImage ? "full" : "none"}
        w="100%"
        objectFit="cover"
        src={image.asset.url}
        srcSet={image.asset.gatsbyImageData.images.sources.srcSet}
        alt={title}
      />
      <Text
        as="h3"
        fontSize={{ base: "16px", md: "18px" }}
        fontWeight="700"
        mt={3}
      >
        <LinkOverlay href={link}>{title}</LinkOverlay>
      </Text>
      {!!description.length && <Text mt={2}>{description}</Text>}
      {showButton && (
        <Link
          as={GatsbyLink}
          to={link}
          color="black"
          fontWeight={700}
          mt={2}
          display="block"
        >
          <Flex alignItems="center">
            Shop Now
            <Icon
              as={BsArrowRight}
              fontSize="18px"
              fontWeight={700}
              ml={1}
            ></Icon>
          </Flex>
        </Link>
      )}
      {minPrice && (
        <Text>
          {formatPrice("USD", minPrice)}
          {maxPrice && <span> - {formatPrice("USD", maxPrice)}</span>}
        </Text>
      )}
    </LinkBox>
  )
}
