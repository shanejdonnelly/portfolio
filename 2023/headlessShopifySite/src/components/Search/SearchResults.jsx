import * as React from "react"
import { useFlexSearch } from "react-use-flexsearch"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Flex } from "@chakra-ui/react"
import CollectionSearchResults from "./CollectionSearchResults"
import ProductSearchResults from "./ProductSearchResults"
import TrendingSearchResults from "./TrendingSearchResults"

export default function SearchResults({ searchTerm, clearTerm }) {
  const queryData = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `)

  const results = useFlexSearch(
    searchTerm,
    queryData.localSearchPages?.index,
    queryData.localSearchPages?.store
  )

  if (results) {
    localStorage.setItem(
      "searchResults",
      JSON.stringify({ results, term: searchTerm })
    )
  }

  //hide certain collections from results
  const hiddenCollections = ["Full Price"]
  const unfilteredCollectionResults = results.filter(
    (r) => r.type === "collection"
  )
  const collectionResults = unfilteredCollectionResults.filter(
    (r) => !hiddenCollections.includes(r.title)
  )

  const productResults = results.filter((r) => r.type === "product")
  const collectionSuggestions = productResults.map((r) => r.collections)

  return (
    <Flex
      flexWrap={{ base: "wrap", lg: "nowrap" }}
      mb={{ base: "150px", sm: 0 }}
    >
      <Box
        flex={{ base: "0 0 100%", lg: "0 0 20%" }}
        p={8}
        borderBottomWidth={{ base: "1px", lg: "0" }}
        borderRightWidth={{ base: "0", lg: "1px" }}
        borderColor={"gray.200"}
        borderRightStyle="solid"
        borderBottomStyle="solid"
      >
        <CollectionSearchResults
          collections={collectionResults}
          collectionSuggestions={collectionSuggestions}
        />
      </Box>

      <Box flex={{ base: "0 0 100%", lg: "0 0 60%" }} p={8}>
        <ProductSearchResults
          clearTerm={clearTerm}
          results={productResults}
          searchTerm={searchTerm}
        />
      </Box>
      <Box
        flex={{ base: "0 0 100%", lg: "0 0 20%" }}
        p={8}
        backgroundColor="#f7f5f3"
        borderBottomRightRadius={{ base: "0", lg: "40px" }}
        borderTopRightRadius={{ base: "0", lg: "40px" }}
      >
        <TrendingSearchResults />
      </Box>
    </Flex>
  )
}
