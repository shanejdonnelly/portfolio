import * as React from "react"
import { clearQueryParam, useQueryParamString } from 'react-use-query-param-string';
import { useInView } from "react-cool-inview";
import { Link } from "gatsby"
import { Box, Button, Center, Container, Drawer, DrawerOverlay, DrawerBody, DrawerCloseButton, DrawerContent, Flex, FormControl, FormLabel, Grid, GridItem, Heading, HStack, Select, Spinner, Text, VStack } from '@chakra-ui/react'
import CollectionGridProductItem from "../components/Collection/CollectionGridProductItem"
import { getNumActiveFilters, getFilterTagName } from "../utils/filterProducts"
import { BsSliders } from "react-icons/bs"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import Breadcrumbs from "../components/Breadcrumbs"
import CollectionSidebar from "../components/Collection/CollectionSidebar"
import filterProducts from "../utils/filterProducts"
import EmptyState from "../components/EmptyState"
import ActiveFilters from "../components/Collection/ActiveFilters";

const CollectionTemplate = ({ pageContext, location }) => {
  const { collection, children, products, numPages } = pageContext

  /*
  CONSTANTS
  */
  const PRODUCTS_PER_PAGE = 24
  const INITIAL_SORT = 'featured'
  const INITIAL_FILTERS = { length: [], width: [], color: [], size: [], maxPrice: 1000, minPrice: 0, blackout: false, lined: false, usaMade: false }

  const [sortParam, setSortParam, sortParamInit] = useQueryParamString('sort', INITIAL_SORT);
  const [colorParam, setColorParam, colorParamInit] = useQueryParamString('color', '');
  const [blackoutParam, setBlackoutParam, blackoutParamInit] = useQueryParamString('blackout', '');
  const [linedParam, setLinedParam, linedParamInit] = useQueryParamString('lined', '');
  const [usaMadeParam, setUsaMadeParam, usaMadeParamInit] = useQueryParamString('usaMade', '');
  const [sizeParam, setSizeParam, sizeParamInit] = useQueryParamString('size', '');
  const [lengthParam, setLengthParam, lengthParamInit] = useQueryParamString('length', '');
  const [widthParam, setWidthParam, widthParamInit] = useQueryParamString('width', '');
  const [minPriceParam, setMinPriceParam, minPriceParamInit] = useQueryParamString('minPrice', '');
  const [maxPriceParam, setMaxPriceParam, maxPriceParamInit] = useQueryParamString('maxPrice', '');


  const [showDefaultPagination, setShowDefaultPagination] = React.useState(true)
  const [filters, setFilters] = React.useState(INITIAL_FILTERS)
  const [filteredProducts, setFilteredProducts] = React.useState(products)
  const [showMobileFilters, setShowMobileFilters] = React.useState(false)
  const [showDesktopFilters, setShowDesktopFilters] = React.useState(true)
  const [numVisibleProducts, setNumVisibleProducts] = React.useState(10)

  const transformParamsToFilters = function (params) {
    return {
      length: !!params.lengthParam.length ? params.lengthParam.split(',') : [],
      width: !!params.widthParam.length ? params.widthParam.split(',') : [],
      color: !!params.colorParam.length ? params.colorParam.split(',') : [],
      size: !!params.sizeParam.length ? params.sizeParam.split(',') : [],
      maxPrice: !!params.maxPriceParam.length ? parseInt(params.maxPriceParam, 10) : 1000,
      minPrice: !!params.minPriceParam.length ? parseInt(params.minPriceParam, 10) : 0,
      blackout: !!params.blackoutParam && params.blackoutParam === 'true',
      lined: !!params.linedParam && params.linedParam === 'true',
      usaMade: !!params.usaMadeParam && params.usaMadeParam === 'true'
    }
  }

  //
  // useEffect()
  //
  React.useEffect(() => {
    const paramObject = { lengthParam, widthParam, sizeParam, colorParam, minPriceParam, maxPriceParam, linedParam, blackoutParam, usaMadeParam }
    const _filters = transformParamsToFilters(paramObject)
    const hasActiveFilters = JSON.stringify(INITIAL_FILTERS) !== JSON.stringify(_filters);

    if (hasActiveFilters || sortParam !== INITIAL_SORT) {
      setFilteredProducts(filterProducts(pageContext.allProducts, _filters, sortParam))
    }
    else {
      //this allows initial page load to be faster by skipping the filtering routine
      setFilteredProducts(pageContext.allProducts)
    }
    setShowDefaultPagination(false)
  }, [colorParam, blackoutParam, linedParam, usaMadeParam, sizeParam, widthParam, lengthParam, minPriceParam, maxPriceParam, sortParam])

  //

  //
  // handleFilterChange()
  //
  const handleFilterChange = function (name, value) {
    if (name === 'color') {
      //value comes in as an array
      setColorParam(!!value.length ? value.join(',') : [])
    }
    else if (name === 'size') {
      setSizeParam(!!value.length ? value.join(',') : [])
    }
    else if (name === 'length') {
      setLengthParam(!!value.length ? value.join(',') : [])
    }
    else if (name === 'width') {
      setWidthParam(!!value.length ? value.join(',') : [])
    }
    else if (name === 'usaMade') {
      if (value) {
        setUsaMadeParam(value.toString())
      }
      else {
        clearQueryParam('usaMade')
      }
    }
    else if (name === 'blackout') {
      if (value) {
        setBlackoutParam(value.toString())
      }
      else {
        clearQueryParam('blackout')
      }
    }
    else if (name === 'lined') {
      if (value) {
        setLinedParam(value.toString())
      }
      else {
        clearQueryParam('lined')
      }
    }
    else if (name === 'maxPrice') {
      if (value) {
        setMaxPriceParam(value.toString())
      }
      else {
        clearQueryParam('maxPrice')
      }
    }
    else if (name === 'minPrice') {
      if (value) {
        setMinPriceParam(value.toString())
      }
      else {
        clearQueryParam('minPrice')
      }
    }

  }

  //
  // handleClearAllFilters()
  //
  const handleClearAllFilters = function () {
    setShowMobileFilters(false)
    setShowDesktopFilters(false)
    setColorParam('')
    setSizeParam('')
    setLengthParam('')
    setWidthParam('')

    clearQueryParam('minPrice')
    clearQueryParam('maxPrice')
    clearQueryParam('lined')
    clearQueryParam('blackout')
    clearQueryParam('usaMade')
  }

  const paramObject = { lengthParam, widthParam, sizeParam, colorParam, minPriceParam, maxPriceParam, linedParam, blackoutParam, usaMadeParam }
  const numActiveFilters = getNumActiveFilters(transformParamsToFilters(paramObject))
  const collectionSidebar = (
    <CollectionSidebar
      children={children}
      parentHandle={pageContext.collection.handle}
      handleFilterChange={handleFilterChange}
      handleClearAllFilters={handleClearAllFilters}
      filters={transformParamsToFilters(paramObject)}
      products={filteredProducts}
      numActiveFilters={numActiveFilters}
    />
  )

  const { observe } = useInView({
    // For better UX, we can grow the root margin so the data will be loaded earlier
    rootMargin: "1200px 0px",
    onEnter: () => {
      setNumVisibleProducts(numVisibleProducts + PRODUCTS_PER_PAGE)
    },
  });

  //break location into array and get rid of first and last section, which are '' and 'collections'
  const breadcrumbPathBits = location.pathname.split("/")
  breadcrumbPathBits.shift()
  breadcrumbPathBits.shift()

  return (
    <Layout gatsbyLocation={location}>
      <Container maxW={'container.xl'}>
        <Breadcrumbs menuData={pageContext.sanityMenuData} pathBits={breadcrumbPathBits} />
        <Flex w='100%'>
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
          <VStack w='100%' spacing={4} mb={8} mt={8}>
            <Heading variant="collectionHeader" textAlign='center'>{collection.title}</Heading>
            <Flex justifyContent='flex-start' textAlign='center'>
              <Box
                className="shopify-collectionDescriptionHTML"
                dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
                maxW='767px'
                pb={3}
              />
            </Flex>


            <Flex alignItems={'flex-end'} justifyContent='space-between' w='100%'>
              <Button
                textColor={'gray.600'}
                leftIcon={<BsSliders />}
                display={{ base: 'block', lg: 'none' }}
                variant={'productOption'}
                borderColor='gray.400'
                flex='0 0 105px'
                onClick={() => setShowMobileFilters(!showMobileFilters)}>
                Filter {numActiveFilters !== 0 ? `(${numActiveFilters})` : ''}
              </Button>
              <Button
                textColor={'gray.600'}
                leftIcon={<BsSliders />}
                display={{ base: 'none', lg: 'block' }}
                variant={'productOption'}
                borderColor='gray.400'
                flex={showDesktopFilters ? '0 0 135px' : '0 0 105px'}
                onClick={() => setShowDesktopFilters(!showDesktopFilters)}>
                {showDesktopFilters ? 'Hide Filter' : 'Filter'} {numActiveFilters !== 0 ? `(${numActiveFilters})` : ''}
              </Button>

              <Box display={{ base: 'none', lg: 'block' }} flex='1 0 600px' marginLeft={showDesktopFilters ? '100px' : '24px'}>
                <ActiveFilters
                  numActiveFilters={numActiveFilters}
                  filters={transformParamsToFilters(paramObject)}
                  handleFilterChange={handleFilterChange}
                  getFilterTagName={getFilterTagName}
                  handleClearAllFilters={handleClearAllFilters}
                />
              </Box>

              <FormControl flex='0 0 200px'>
                <FormLabel fontFamily='heading' fontSize='md' mb={1}>Sort by:</FormLabel>
                <Select fontSize={'sm'} borderColor='gray.400' onChange={(e) => setSortParam(e.target.value)} value={sortParam}>
                  <option value='featured'>Featured</option>
                  <option value='title'>Name</option>
                  <option value='priceLowHigh'>Price: Low > High</option>
                  <option value='priceHighLow'>Price: High > Low</option>
                </Select>
              </FormControl>
            </Flex>

            <Grid
              templateColumns={
                showDesktopFilters ?
                  { base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0,1fr))', lg: 'repeat(5, minmax(0,1fr))' } :
                  { base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0,1fr))' }}
              columnGap={8}
              rowGap={8}
            >
              {showDesktopFilters && (
                <Box display={{ base: 'none', lg: 'block' }}>
                  {collectionSidebar}
                </Box>
              )}
              <GridItem colSpan={4}>
                <Grid
                  columnGap={8}
                  rowGap={8}
                  templateColumns={
                    showDesktopFilters ?
                      { base: 'repeat(2, minmax(0,1fr))', md: 'repeat(3,minmax(0,1fr))', lg: 'repeat(3,minmax(0,1fr))', xl: 'repeat(4,minmax(0,1fr))' } :
                      { base: 'repeat(2, minmax(0,1fr))', md: 'repeat(3,minmax(0,1fr))', lg: 'repeat(4,minmax(0,1fr))' }}
                >
                  {filteredProducts && !!filteredProducts.length && filteredProducts.slice(0, numVisibleProducts).map((product, index) => (
                    <CollectionGridProductItem
                      metafields={product.metafields}
                      key={product.id}
                      handle={product.handle}
                      title={product.title}
                      priceRangeV2={product.priceRangeV2}
                      images={product.images}
                      colorOption={product.options && !!product.options.length ? product.options.find(o => o.name === 'Vendor Color Name') : null}
                      variants={product.variants}
                      desktopFiltersOpen={showDesktopFilters}
                    />
                  ))}
                </Grid>
              </GridItem>
              {filteredProducts && (numVisibleProducts < filteredProducts.length) && (
                <GridItem
                  colSpan={
                    showDesktopFilters ?
                      { base: '2', md: '2', lg: '4' } :
                      { base: '2', md: '4' }}
                  colStart={
                    showDesktopFilters ?
                      { base: '1', md: '2', lg: '2' } :
                      { base: '1', md: '1' }
                  }
                >
                  <Center ref={observe} mt={16} mb={16}>
                    <Spinner size='lg' />
                  </Center>
                </GridItem>
              )}

            </Grid>

            {filteredProducts && !filteredProducts.length && (
              <Center mt={8}>
                <EmptyState text='No results. Try removing some filters!' />
              </Center>
            )}



            {showDefaultPagination && (
              <HStack>
                {Array.from({ length: numPages }, (_, index) => (
                  <Link key={`pagination-number${index + 1}`} to={`/collections/${collection.handle}/${index === 0 ? "" : index + 1}`}>
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
      metaDescription={pageContext?.collection?.description || null}
    />
  )

}
