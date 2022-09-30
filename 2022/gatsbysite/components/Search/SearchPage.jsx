import * as React from "react"
import CollectionGridProductItem from "../Collection/CollectionGridProductItem"
import CollectionSidebar from "../Collection/CollectionSidebar"
import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Grid,
  Heading,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react"
import filterProducts from "../../utils/filterProducts"

export default function SearchPage({ products, searchTerm }) {
  const [filteredProducts, setFilteredProducts] = React.useState([])
  const [showMobileFilters, setShowMobileFilters] = React.useState(false)
  const [sort, setSort] = React.useState("title")
  const [filters, setFilters] = React.useState({
    length: [],
    width: [],
    color: [],
    size: [],
    maxPrice: 1000,
    minPrice: 0,
    blackout: false,
    lined: false,
    usaMade: false,
  })

  React.useEffect(() => {
    if (products && !!products.length) {
      setFilteredProducts(filterProducts(products, filters, sort))
    }
  }, [filters, products, sort])

  const handleFilterChange = function (name, value) {
    setFilters((filters) => ({
      ...filters,
      [name]: value,
    }))
  }

  return (
    <Flex w="100%">
      <Box display={{ base: "none", lg: "block" }}>
        {!!products.length && (
          <CollectionSidebar
            handleFilterChange={handleFilterChange}
            filters={filters}
            products={products}
            searchTerm={searchTerm}
          />
        )}
      </Box>
      <Drawer
        isOpen={showMobileFilters}
        placement="left"
        onClose={() => setShowMobileFilters(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <CollectionSidebar
              handleFilterChange={handleFilterChange}
              filters={filters}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <VStack w="100%" spacing={4} mt={6}>
        <Flex alignItems={"center"} justifyContent="flex-start" w="100%">
          <Select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            flex="0 0 200px"
          >
            <option value="title">Relevance</option>
            <option value="priceLowHigh">Price: Low &#8594; High</option>
            <option value="priceHighLow">Price: High &#8594; Low</option>
          </Select>

          <Button
            display={{ base: "block", lg: "none" }}
            variant={"ghost"}
            ml={3}
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            Filter
          </Button>
        </Flex>

        <Grid
          templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }}
          gap={6}
        >
          {filteredProducts && !!filteredProducts.length ? (
            filteredProducts.map((product) => (
              <CollectionGridProductItem
                key={product.id}
                handle={product.handle}
                title={product.title}
                priceRangeV2={product.priceRangeV2}
                images={
                  product?.images &&
                  !!product.images.length &&
                  product.images[0]?.gatsbyImageData?.images?.fallback?.src
                    ? product.images[0].gatsbyImageData.images.fallback.src
                    : null
                }
              />
            ))
          ) : (
            <Text>Try removing some filters</Text>
          )}
        </Grid>
      </VStack>
    </Flex>
  )
}
