import * as React from "react"
import { Link } from "gatsby"
import { Box, Button, Center, Container, Drawer, DrawerOverlay, DrawerBody, DrawerCloseButton, DrawerContent, Flex, FormControl, FormLabel, Grid, Heading, HStack, Select, Text, VStack } from '@chakra-ui/react'
import CollectionGridProductItem from "../components/Collection/CollectionGridProductItem"
import { getNumActiveFilters, getFilterTagName } from "../utils/filterProducts"
import { BsSliders } from "react-icons/bs"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import Breadcrumbs from "../components/Breadcrumbs"
import CollectionSidebar from "../components/Collection/CollectionSidebar"
import filterProducts from "../utils/filterProducts"
import EmptyState from "../components/EmptyState"

const CollectionTemplate = ({ pageContext, location }) => {
  const initialFilters = { length: [], width: [], color: [], size: [], maxPrice: 1000, minPrice: 0, blackout: false, lined: false, usaMade: false }
  const { collection, children, products, numPages } = pageContext
  const [showDefaultPagination, setShowDefaultPagination] = React.useState(true)
  const [filters, setFilters] = React.useState(initialFilters)
  const [filteredProducts, setFilteredProducts] = React.useState(products)
  const [sort, setSort] = React.useState('title')
  const [showMobileFilters, setShowMobileFilters] = React.useState(false)

  const handleFilterChange = function (name, value) {
    setFilters(filters => ({
      ...filters,
      [name]: value
    }))
  }

  const handleClearAllFilters = function () {
    setFilters(initialFilters)
    setShowMobileFilters(false)
  }

  React.useEffect(() => {
    setFilteredProducts(filterProducts(pageContext.allProducts, filters, sort))
    setShowDefaultPagination(false)
  }, [filters, sort])


  const collectionSidebar = (
    <CollectionSidebar
      children={children}
      parentHandle={pageContext.collection.handle}
      handleFilterChange={handleFilterChange}
      handleClearAllFilters={handleClearAllFilters}
      filters={filters}
      products={products}
    />
  )

  const numActiveFilters = getNumActiveFilters(filters)

  return (
    <Layout gatsbyLocation={location}>
      <Container maxW={'container.xl'}>
        <Breadcrumbs menuData={pageContext.sanityMenuData} gatsbyLocation={location} />
        <Flex w='100%'>
          <Box display={{ base: 'none', lg: 'block' }}>
            {collectionSidebar}
          </Box>
          <Drawer
            isOpen={showMobileFilters}
            placement='left'
            onClose={() => setShowMobileFilters(false)}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody mt={4}>
                {collectionSidebar}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <VStack w='100%' spacing={4} mb={8}>
            <Heading variant="collectionHeader">{collection.title}</Heading>
            <Text>{collection.description}</Text>

            <Flex alignItems={'flex-end'} justifyContent='flex-start' w='100%'>
              <FormControl flex='0 0 200px'>
                <FormLabel fontFamily='heading' fontSize='md' mb={1}>Sort by:</FormLabel>
                <Select fontSize={'sm'} borderWidth='2px' borderColor='gray.400' onChange={(e) => setSort(e.target.value)} value={sort}>
                  <option value='title'>Name</option>
                  <option value='priceLowHigh'>Price: Low > High</option>
                  <option value='priceHighLow'>Price: High > Low</option>
                </Select>
              </FormControl>

              <Button textColor={'gray.600'} leftIcon={<BsSliders />} display={{ base: 'block', lg: 'none' }} variant={'ghost'} ml={3} onClick={() => setShowMobileFilters(!showMobileFilters)}>Filter {numActiveFilters !== 0 ? `(${numActiveFilters})` : ''}</Button>
            </Flex>

            <Grid templateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0,1fr))' }} columnGap={6} rowGap={8}>
              {filteredProducts && !!filteredProducts.length && filteredProducts.map((product) => (
                <CollectionGridProductItem
                  key={product.id}
                  handle={product.handle}
                  title={product.title}
                  priceRangeV2={product.priceRangeV2}
                  images={product.images}
                  colorOption={product.options && !!product.options.length ? product.options.find(o => o.name === 'Vendor Color Name') : null}
                  variants={product.variants}
                />
              ))}
            </Grid>
            {filteredProducts && !filteredProducts.length && (
              <Center mt={8}>
                <EmptyState text='No results. Try removing some filters!' />
              </Center>
            )}

            {showDefaultPagination && (
              <HStack>
                {Array.from({ length: numPages }, (_, index) => (
                  <Link key={`pagination-number${index + 1}`} to={`/shop/${collection.handle}/${index === 0 ? "" : index + 1}`}>
                    {index + 1}
                  </Link>
                ))}
              </HStack>

            )}
          </VStack>

        </Flex>
      </Container>
    </Layout>
  )
}
export default CollectionTemplate

export const Head = ({ location, params, data, pageContext }) => {
  return (
    <Seo
      title={pageContext?.collection?.title || null}
      location={location}
      params={params}
      pageContext={pageContext}
      data={data}
    />
  )

}
