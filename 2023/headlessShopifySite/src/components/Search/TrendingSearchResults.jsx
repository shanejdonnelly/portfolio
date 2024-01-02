import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Flex, Link, Text } from "@chakra-ui/react"

export default function TrendingSearchResults() {
  return (
    <Box>
      <Text variant={"mainNavLink"} mb={5} color="gray.500">
        Trending
      </Text>
      <Flex flexDir={"column"}>
        <Link
          as={GatsbyLink}
          to={"/collections/curtains-drapes/cafe-tier-curtains"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Cafe & Tier Curtains
        </Link>
        <Link
          as={GatsbyLink}
          to={"/collections/blinds-shades/roman-shades"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Roman Shades
        </Link>
        <Link
          as={GatsbyLink}
          to={"/collections/rods-hardware/decorative-rods"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Decorative Rods
        </Link>
        <Link
          as={GatsbyLink}
          to={"/collections/bedding/comforters"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Comforters
        </Link>
        <Link
          as={GatsbyLink}
          to={"/collections/bath/shower-curtains"}
          mb={3}
          fontSize="13px"
          color="gray.700"
        >
          Shower Curtains
        </Link>
        <Link
          as={GatsbyLink}
          to={"/collections/home-decor/lamps"}
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
