import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Heading, Icon, Image, Link, VStack } from "@chakra-ui/react"
import { BsArrowRight } from "react-icons/bs"

export default function CategoryCard({
  imageSrc = "",
  title = "",
  links = [],
  categoryLink = "",
}) {
  return (
    <VStack spacing={3} mx={6} my={8}>
      <Image
        borderRadius="full"
        boxSize={{ base: "320px", sm: "250px" }}
        src={imageSrc}
        alt={title}
      />
      <Heading as="h3" size="lg" py={2}>
        {title}
      </Heading>
      {!!links.length &&
        links.map((link, index) => (
          <Link as={GatsbyLink} to={link.linkUrl} key={`link_${index}`}>
            {link.linkText}
          </Link>
        ))}
      <Link
        as={GatsbyLink}
        to={categoryLink}
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
