import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Image, Link, LinkBox, LinkOverlay, VStack } from "@chakra-ui/react"

export default function ImageLink({
  image,
  linkText = "",
  linkUrl = "",
  round = true,
}) {
  return (
    <LinkBox as={VStack} spacing={3} m={4}>
      <Image
        borderRadius={round === "true" ? "full" : "0"}
        boxSize={{ base: "130px", sm: "170px" }}
        srcSet={image.asset.gatsbyImageData.images.fallback.srcSet}
        sizes="275px"
        src={image.asset.url}
        alt={linkText}
      />
      <LinkOverlay
        as={GatsbyLink}
        color="black"
        fontSize="14px"
        to={linkUrl}
        textAlign="center"
        maxW={{ base: "130px", sm: "170px" }}
      >
        {linkText}
      </LinkOverlay>
    </LinkBox>
  )
}
