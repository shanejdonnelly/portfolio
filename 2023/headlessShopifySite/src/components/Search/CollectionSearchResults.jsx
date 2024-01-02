import * as React from "react"
import { Link as GatsbyLink, useStaticQuery, graphql } from "gatsby"
import { Box, Flex, Link, Text } from "@chakra-ui/react"

export default function CollectionSearchResults({
  collections,
  collectionSuggestions,
}) {
  const queryData = useStaticQuery(graphql`
    query {
      allSanityMenu {
        nodes {
          handle
          items {
            handle
          }
        }
      }
    }
  `)

  const flattened = collectionSuggestions.flat()
  //hide certain collections from appearing
  const hiddenCats = ["frontpage", "promotional"]
  const removeHomePage = flattened.filter((f) => !hiddenCats.includes(f.handle))
  const key = "title"
  const productCollections = [
    ...new Map(removeHomePage.map((item) => [item[key], item])).values(),
  ]

  const data = !!collections.length ? collections : productCollections

  const getParentCollectionHandle = function (childHandle) {
    const parentCollections = [
      "curtains-drapes",
      "blinds-shades",
      "rods-hardware",
      "bedding",
      "bath",
      "home-decor",
      "fabrics",
      "sale",
    ]
    const isParentCollection = parentCollections.includes(childHandle)

    function _getParentHandle() {
      let parentPath = "curtains-drapes"
      queryData.allSanityMenu.nodes.forEach((node) => {
        if (node.items.find((item) => item.handle === childHandle)) {
          parentPath = node.handle
        }
      })
      return `${parentPath}/`
    }

    return isParentCollection ? "" : _getParentHandle()
  }

  return (
    <Box>
      <Text variant={"mainNavLink"} mb={5} color="gray.500">
        Categories
      </Text>

      <Flex flexDir={"column"}>
        {!!data.length ? (
          data.slice(0, 6).map((c, index) => (
            <Link
              as={GatsbyLink}
              to={`/collections/${getParentCollectionHandle(c.handle)}${
                c.handle
              }`}
              key={`c.title_${index}`}
              mb={3}
              fontSize="13px"
              color="gray.700"
            >
              {c.title}
            </Link>
          ))
        ) : (
          <>
            <Link
              as={GatsbyLink}
              to={"/collections/curtains-drapes"}
              mb={3}
              fontSize="13px"
              color="gray.700"
            >
              Curtains & Drapes{" "}
            </Link>
            <Link
              as={GatsbyLink}
              to={"/collections/blinds-shades"}
              mb={3}
              fontSize="13px"
              color="gray.700"
            >
              Blinds & Shades
            </Link>
            <Link
              as={GatsbyLink}
              to={"/collections/rods-hardware"}
              mb={3}
              fontSize="13px"
              color="gray.700"
            >
              Rods & Hardware
            </Link>
            <Link
              as={GatsbyLink}
              to={"/collections/bedding"}
              mb={3}
              fontSize="13px"
              color="gray.700"
            >
              Bedding
            </Link>
            <Link
              as={GatsbyLink}
              to={"/collections/bath"}
              mb={3}
              fontSize="13px"
              color="gray.700"
            >
              Bath
            </Link>
            <Link
              as={GatsbyLink}
              to={"/collections/home-decor"}
              mb={3}
              fontSize="13px"
              color="gray.700"
            >
              Home Decor
            </Link>
          </>
        )}
      </Flex>
    </Box>
  )
}
