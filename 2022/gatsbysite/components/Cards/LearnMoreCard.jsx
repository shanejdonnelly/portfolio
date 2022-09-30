import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { LinkBox, LinkOverlay, Image, Text, VStack } from "@chakra-ui/react"

export default function LearnMoreCard({
  imageSrc = "",
  title = "",
  description = "",
  link = "",
  roundImage = false,
}) {
  return (
    <LinkBox as="div">
      <VStack spacing={3} mb={16} mx={4}>
        <Image
          borderRadius={roundImage ? "full" : "none"}
          w="100%"
          h="230px"
          objectFit="cover"
          src={imageSrc}
          alt={title}
        />
        <LinkOverlay as={GatsbyLink} to={link}>
          <Text
            px={6}
            textAlign="center"
            fontSize={"16px"}
            fontWeight="bold"
            textDecor={"underline"}
          >
            {title}
          </Text>
        </LinkOverlay>
        <Text px={6} textAlign="center">
          {description}
        </Text>
      </VStack>
    </LinkBox>
  )
}
