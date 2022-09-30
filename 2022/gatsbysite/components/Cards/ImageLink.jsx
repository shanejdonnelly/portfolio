import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Image, Link, VStack } from "@chakra-ui/react"

export default function ImageLink({
  imageUrl = "",
  linkText = "",
  linkUrl = ""
}) {
  return (
    <VStack spacing={3} m={4}>
      <Image
        borderRadius="full"
        boxSize={{ base: "275px", sm: "200px" }}
        src={imageUrl}
        alt={linkText}
      />
      <Link
        as={GatsbyLink}
        color="#555"
        fontSize="16px"
        to={linkUrl}
        textDecoration="underline"
        fontWeight="700"
      >
        {linkText}
      </Link>
    </VStack>
  )
}
