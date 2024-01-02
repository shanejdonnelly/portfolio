import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { LinkBox, LinkOverlay, Image, Text, VStack } from "@chakra-ui/react"

export default function LearnMoreCard({
  image,
  title = "",
  description = "",
  link = "",
  roundImage = false,
}) {
  return (
    <LinkBox as="div">
      <VStack spacing={4} mb={16} mx={4}>
        <Image
          borderRadius={roundImage ? "full" : "none"}
          objectFit="cover"
          sizes="600px"
          src={image.asset.url}
          srcSet={image.asset.gatsbyImageData.images.fallback.srcSet}
          w="100%"
          h="230px"
          alt={title}
        />
        <LinkOverlay as={GatsbyLink} to={link}>
          <Text
            px={6}
            color="black"
            textAlign="center"
            fontSize={"16px"}
            fontWeight="bold"
          >
            {title}
          </Text>
        </LinkOverlay>
        <Text px={6} color="black" textAlign="center">
          {description}
        </Text>
      </VStack>
    </LinkBox>
  )
}
