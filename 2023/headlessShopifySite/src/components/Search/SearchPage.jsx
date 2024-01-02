import * as React from "react"
import SearchProductItem from "./SearchProductItem"
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
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react"
import { BsSliders } from "react-icons/bs"
import filterProducts from "../../utils/filterProducts"

export default function SearchPage({ products, searchTerm }) {
  const [filteredProducts, setFilteredProducts] = React.useState([])
  const [showMobileFilters, setShowMobileFilters] = React.useState(false)
  const [showDesktopFilters, setShowDesktopFilters] = React.useState(true)
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
              products={products}
              searchTerm={searchTerm}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <VStack w="100%" spacing={4} mb={8}>
        <Flex
          alignItems={"flex-end"}
          justifyContent="space-between"
          w="100%"
          flexWrap={{ base: "wrap", sm: "nowrap" }}
        >
          <Box>
            {searchTerm && (
              <VStack alignItems={"flex-start"} mt={8} mb={2}>
                <Flex
                  alignItems="center"
                  flexDir={{ base: "row", lg: "column" }}
                >
                  <Text>Showing results for:</Text>
                  <Text
                    fontSize="2xl"
                    fontWeight={"bold"}
                    pl={{ base: "8px", lg: "0" }}
                  >
                    {searchTerm}
                  </Text>
                </Flex>
              </VStack>
            )}
            <Button
              textColor={"gray.600"}
              leftIcon={<BsSliders />}
              display={{ base: "block", lg: "none" }}
              variant={"productOption"}
              borderColor="gray.400"
              flex="0 0 105px"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              mt={3}
            >
              Filter
            </Button>
          </Box>
          <FormControl flex="0 0 200px" mt={3}>
            <FormLabel fontFamily="heading" fontSize="md" mb={1}>
              Sort by:
            </FormLabel>
            <Select
              fontSize={"sm"}
              borderColor="gray.400"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="title">Relevance</option>
              <option value="priceLowHigh">Price: Low > High</option>
              <option value="priceHighLow">Price: High > Low</option>
            </Select>
          </FormControl>
        </Flex>

        <Grid
          templateColumns={{
            base: "repeat(2, minmax(0, 1fr))",
            md: "repeat(4, minmax(0,1fr))",
            lg: "repeat(5, minmax(0,1fr))",
          }}
          columnGap={8}
          rowGap={8}
        >
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
          <GridItem colSpan={4}>
            <Grid
              columnGap={8}
              rowGap={8}
              templateColumns={{
                base: "repeat(1, minmax(0,1fr))",
                sm: "repeat(2, minmax(0,1fr))",
                md: "repeat(3,minmax(0,1fr))",
                lg: "repeat(3,minmax(0,1fr))",
                xl: "repeat(4,minmax(0,1fr))",
              }}
            >
              {filteredProducts && !!filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <SearchProductItem
                    key={product.id}
                    handle={product.handle}
                    title={product.title}
                    priceRangeV2={product.priceRangeV2}
                    images={product?.images ? product.images : null}
                    product={product}
                    variants={product.variants}
                  />
                ))
              ) : (
                <Text>Try removing some filters</Text>
              )}
            </Grid>
          </GridItem>
        </Grid>
      </VStack>
    </Flex>
  )
}
