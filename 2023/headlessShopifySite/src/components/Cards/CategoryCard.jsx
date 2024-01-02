import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Icon, Image, Link, Text, VStack } from "@chakra-ui/react"
import { BsArrowRight } from "react-icons/bs"

export default function CategoryCard({
  image,
  title = "",
  links = [],
  categoryLink = "",
}) {
  return (
    <VStack spacing={3} mx={6} my={8}>
      <Image
        borderRadius="full"
        boxSize={{ base: "100%", sm: "250px" }}
        srcSet={image.asset.gatsbyImageData.images.fallback.srcSet}
        sizes="320px"
        src={image.asset.url}
        alt={title}
        maxW="250px"
      />
      <Text as="h3" color="black" fontSize="16px" fontWeight="700" py={2}>
        {title}
      </Text>
      {!!links.length &&
        links.map((link, index) => (
          <Link
            as={GatsbyLink}
            color="black"
            to={link.linkUrl}
            key={`link_${index}`}
          >
            {link.linkText}
          </Link>
        ))}
      <Link
        as={GatsbyLink}
        to={categoryLink}
        color="black"
        position="relative"
        top="12px"
        fontWeight={700}
      >
        All {title}
        <Icon
          as={BsArrowRight}
          fontSize="18px"
          fontWeight={700}
          position="relative"
          top="4px"
          left="4px"
        ></Icon>
      </Link>
    </VStack>
  )
}
