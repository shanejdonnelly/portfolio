import * as React from "react"
import { Link as GatsbyLink, navigate } from "gatsby"
import { Box, Center, Flex, Icon, Image, Link, Text } from "@chakra-ui/react"
import { BsArrowRight as ArrowRight } from "react-icons/bs"
import EmptyState from "../EmptyState"

export default function ProductSearchResults({
  results,
  searchTerm,
  clearTerm,
}) {
  const visibleItems = 6
  const res = results.slice(0, visibleItems)

  return !!results.length ? (
    <Box>
      <Flex flexWrap={"wrap"}>
        {res.map((result) => (
          <Link
            key={result.id}
            as={GatsbyLink}
            to={`/products/${result.handle}`}
            flex={{ base: "100%", lg: "50%" }}
            mb={{ base: 4, sm: 6 }}
          >
            <Flex alignItems={"center"}>
              <Image
                boxSize={{ base: "64px", sm: "75px" }}
                objectFit="cover"
                alt={result.title}
                src={result.images || "/placeholder-image.png"}
              />
              <Text ml={4} fontSize="13px" color="gray.700">
                {result.title}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
      {results.length > visibleItems && (
        <Link
          onClick={() => {
            navigate(`/search?q=${searchTerm}`)
            clearTerm()
          }}
          color="gray.700"
        >
          <Flex alignItems={"center"}>
            View All Results
            <Icon as={ArrowRight} boxSize={6} pl={2} />
          </Flex>
        </Link>
      )}
    </Box>
  ) : (
    <Center h="100%">
      <EmptyState
        text={`No results for "${searchTerm}"`}
        subText="Try another search term or shop curtains and drapes."
        link="/collections/curtains-drapes"
        linkText="Shop Now"
      />
    </Center>
  )
}
