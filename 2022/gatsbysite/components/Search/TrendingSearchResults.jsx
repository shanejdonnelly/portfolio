import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react"

export default function TrendingSearchResults() {
  return (
    <Box>
      <Text variant={"mainNavLink"} mb={5} color="gray.500">
        Trending
      </Text>
      <Flex flexDir={"column"}>
        <Link
          as={GatsbyLink}
          to={"/shop/curtains-drapes/cafe-tier-curtains"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Cafe & Tier Curtains
        </Link>
        <Link
          as={GatsbyLink}
          to={"/shop/blinds-shades/roman-shades"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Roman Shades
        </Link>
        <Link
          as={GatsbyLink}
          to={"/shop/rods-hardware/decorative-rods"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Decorative Rods
        </Link>
        <Link
          as={GatsbyLink}
          to={"/shop/bedding/comforters"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Comforters
        </Link>
        <Link
          as={GatsbyLink}
          to={"/shop/bath/shower-curtains"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Shower Curtains
        </Link>
        <Link
          as={GatsbyLink}
          to={"/shop/home-decor/lamps"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Lamps
        </Link>
      </Flex>
    </Box>
  )
}
