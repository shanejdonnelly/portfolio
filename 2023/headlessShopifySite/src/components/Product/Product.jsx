import * as React from "react"
import isEqual from "lodash.isequal"
import getSwatchImage from "../../utils/getSwatchImage"
import getProductBreadcrumbs from "../../utils/getProductBreadcrumbs"
import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import ProductImageGallery from "./ProductImageGallery"
import { StoreContext } from "../../context/store-context"
import ProductInfo from "./ProductInfo"
import ProductForm from "./ProductForm"
import RecommendedProducts from "./RecommendedProducts"
import CartDrawer from "../Cart/CartDrawer"
import Breadcrumbs from "../Breadcrumbs"

const Product = ({ product, location, pageContext, completeTheLookData }) => {
  const { client } = React.useContext(StoreContext)
  const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false)
  const [variant, setVariant] = React.useState({ ...product.variants[0] })
  const [available, setAvailable] = React.useState(
    variant ? variant.availableForSale : false
  )
  const [recommendedProducts, setRecommendedProducts] = React.useState(null)

  const initialColorOption = product.variants[0].selectedOptions.find(
    (opt) => opt.name === "Vendor Color Name"
  )
  const initialColor = initialColorOption
    ? initialColorOption.value
    : "no color"

  const initialSizeOption = product.variants[0].selectedOptions.find(
    (opt) => opt.name === "Size"
  )
  const initialSize = initialSizeOption ? initialSizeOption.value : "no size"

  const [colorOption, setColorOption] = React.useState(initialColor)
  const [sizeOption, setSizeOption] = React.useState(initialSize)

  const reviewsRef = React.useRef()

  /*
    checkAvailability
  */
  const checkAvailablity = React.useCallback(
    //
    // Should we change this so that available works for more thah one variant at a time
    // Side question: how has this not caused issues?
    // Looks like maybe it is only used for AddToCart button?
    //
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        console.log(fetchedProduct)
        const result =
          fetchedProduct?.variants.filter(
            (v) => v.id === variant.storefrontId
          ) ?? []
        console.log("===================")
        console.log(result)

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [variant, client.product]
  )

  /*
    handleOptionChange()
  */
  const handleOptionChange = (optionName, value) => {
    if (value === "") {
      return
    }

    let match = null

    // see if variant option exists
    if (optionName === "Vendor Color Name") {
      setColorOption(value)
      match = hasMatchingVariant(value, sizeOption)
    }
    if (optionName === "Size") {
      setSizeOption(value)
      match = hasMatchingVariant(colorOption, value)
    }

    if (match) {
      //get the variant
      let matchingVariant
      if (optionName === "Vendor Color Name") {
        matchingVariant = getMatchingVariant(value, sizeOption)
      }
      if (optionName === "Size") {
        matchingVariant = getMatchingVariant(colorOption, value)
      }

      setVariant({ ...matchingVariant })
    } else {
      setVariant(null)
    }
  }

  /*
  setQueryStringParameter()
  */
  const setQueryStringParameter = (name, value) => {
    const params = new URLSearchParams(window.location.search)
    params.set(name, value)
    window.history.replaceState(
      {},
      "",
      decodeURIComponent(`${window.location.pathname}?${params}`)
    )
  }

  /*
  getMatchingVariant()
  */
  const getMatchingVariant = function (color, size) {
    const opt = [
      { name: "Vendor Color Name", value: color },
      { name: "Size", value: size },
    ]
    const match = product.variants.find((v) => {
      return isEqual(
        opt.sort((a, b) => a.name.localeCompare(b.name)),
        v.selectedOptions.sort((a, b) => a.name.localeCompare(b.name))
      )
    })
    return match
  }

  /*
  hasMatchingVariant()
  */
  const hasMatchingVariant = function (color, size) {
    const opt = [
      { name: "Vendor Color Name", value: color },
      { name: "Size", value: size },
    ]

    const possibleVariantOptions = product.variants.map(
      (v) => v.selectedOptions
    )
    const match = product.variants.find((v) => {
      return isEqual(
        opt.sort((a, b) => a.name.localeCompare(b.name)),
        v.selectedOptions.sort((a, b) => a.name.localeCompare(b.name))
      )
    })

    return match
  }

  /*
     optionExists()
     -- determines if a option set exists, not if there is inventory for sale (availableForSale)
  */
  const optionExists = (color, size) => {
    return !!hasMatchingVariant(color, size)
  }

  /*
     optionAvailable()
     -- determines if a option set has inventory (avaiableForSale is true)
  */
  const optionAvailable = (color, size) => {
    let optionAvail = false

    if (!!hasMatchingVariant(color, size)) {
      const opt = [
        { name: "Vendor Color Name", value: color },
        { name: "Size", value: size },
      ]

      const matchingVariant = product.variants.find((v) => {
        if (
          isEqual(
            opt.sort((a, b) => a.name.localeCompare(b.name)),
            v.selectedOptions.sort((a, b) => a.name.localeCompare(b.name))
          )
        ) {
          return v
        }
      })
      if (matchingVariant) {
        optionAvail = matchingVariant.availableForSale
      }
    }
    return optionAvail
  }

  /*
     optionDiscontinued()
  */
  let discontinued = false
  const discontinuedMeta = product.metafields.find(
    (meta) => meta.key === "discontinued"
  )
  if (discontinuedMeta) {
    discontinued = true
  }

  /*
    useEffect()
  */
  React.useEffect(() => {
    if (variant) {
      checkAvailablity(product.storefrontId)
    }
  }, [variant, checkAvailablity, product.storefrontId])

  //run only on load to set stuff from query params
  React.useEffect(() => {
    const initialSearchParams = new URLSearchParams(location.search)
    const colorQuery = initialSearchParams.get("color")
    const sizeQuery = initialSearchParams.get("size")

    if (colorQuery && sizeQuery) {
      setColorOption(colorQuery)
      setSizeOption(sizeQuery)
      //check to see if matching variant
      const matchingVariantExists = hasMatchingVariant(colorQuery, sizeQuery)

      if (matchingVariantExists) {
        const matchingVariant = getMatchingVariant(colorQuery, sizeQuery)
        setVariant({ ...matchingVariant })
      }
    } else if (colorQuery) {
      setColorOption(colorQuery)
      //check to see if matching variant
      const matchingVariantExists = hasMatchingVariant(colorQuery, sizeOption)

      if (matchingVariantExists) {
        const matchingVariant = getMatchingVariant(colorQuery, sizeOption)
        setVariant({ ...matchingVariant })
      }
    } else if (sizeQuery) {
      setSizeOption(sizeQuery)
      //check to see if matching variant
      const matchingVariantExists = hasMatchingVariant(colorOption, sizeQuery)

      if (matchingVariantExists) {
        const matchingVariant = getMatchingVariant(colorOption, sizeQuery)
        setVariant({ ...matchingVariant })
      }
    }
  }, [])

  //track product view in Klaviyo
  React.useEffect(() => {
    if (window && window._learnq && variant) {
      try {
        var item = {
          ProductName: variant.title,
          ProductID: variant.storefrontId,
          SKU: variant.sku,
          Categories: product.collections.map((c) => c.handle),
          ImageURL: variant.image.originalSrc,
          URL: `https://www.portandbay.com/products/${product.handle}`,
          Brand: "Port & Bay",
          Price: variant.price,
          CompareAtPrice: variant.compareAtPrice,
        }
        window._learnq.push(["track", "Viewed Product", item])
      } catch (e) {
        console.log(e)
      }
    }
  }, [variant])

  //GET recommended products
  React.useEffect(() => {
    if (window && product) {
      const isLocalhost = window.location.hostname === "localhost"
      if (isLocalhost) {
        setRecommendedProducts([])
      } else {
        //need proxy to fix cors error from shopify
        const proxy = "https://www.portandbay.com/.netlify/functions/cors"
        const arrayProductId = product.shopifyId.split("/")
        const productId = arrayProductId.pop()
        //TODO change to production site
        const root = "https://shop.portandbay.com"
        const url = `${proxy}/${root}/recommendations/products.json?product_id=${productId}&limit=4`

        fetch(url)
          .then((response) => response.json())
          .then(({ products }) => {
            if (products && !!products.length) {
              setRecommendedProducts(products)
            }
          })
      }
    }
  }, [product])

  /*
    optionIsActive()
  */
  const optionIsActive = (name, value) => {
    const selectedOption = variant.selectedOptions
      ? variant.selectedOptions.find((o) => o.name === name)
      : null
    return selectedOption ? selectedOption.value === value : false
  }

  //get all options
  const allColorOptions = product.variants.map((v) => {
    const o = v.selectedOptions.find((so) => so.name === "Vendor Color Name")
    return o && o.value ? o.value : ""
  })
  const allSizeOptions = product.variants.map((v) => {
    const o = v.selectedOptions.find((so) => so.name === "Size")
    return o && o.value ? o.value : ""
  })
  //make unique list of options
  const colorOptions = [...new Set(allColorOptions)]
  const sizeOptions = [...new Set(allSizeOptions)]

  //sort colorOptions by featuredvendorcolor so they match swatches on collection page --
  //featuredvendorcolor metafield is first
  const metafields = product.metafields

  let featuredVendorColorMetafield = null
  if (metafields) {
    featuredVendorColorMetafield = metafields.find(
      (meta) => meta.key === "featuredvendorcolor"
    )
  }

  if (featuredVendorColorMetafield) {
    const featuredVendorColor = featuredVendorColorMetafield.value
    const fromIndex = colorOptions.indexOf(featuredVendorColor)
    const toIndex = 0
    if (fromIndex === toIndex) {
      //already in first slot
    } else {
      const element = colorOptions.splice(fromIndex, 1)[0]
      colorOptions.splice(toIndex, 0, element)
    }
  }
  //END sort sizeOptions

  //magic
  const getAllOptionsForType = (color, name) => {
    const allSelectedOptions = product.variants.map((pv) => pv.selectedOptions)
    const colorSelectedOptions = allSelectedOptions.filter((opts) => {
      //opts shape == [{name: 'Vendor Color Name', value: 'Lilac'}, {name: 'Size', value: '64 x 24'}]
      const colorOpt = opts.find((co) => co.name === name)
      return colorOpt && colorOpt.value ? colorOpt.value === color : false
    })
    const allOptionsForType = []
    colorSelectedOptions.forEach((cso) => {
      cso.forEach((csoo) => {
        if (csoo.name !== name) {
          allOptionsForType.push(csoo.value)
        }
      })
    })
    return allOptionsForType
  }

  //set up our dictionary for checking if option available
  const sizesByColor = {}
  colorOptions.forEach((color) => {
    sizesByColor[color] = getAllOptionsForType(color, "Vendor Color Name")
  })
  const colorsBySize = {}
  sizeOptions.forEach((size) => {
    colorsBySize[size] = getAllOptionsForType(size, "Size")
  })

  let saleSavingsPercentage = null
  if (variant?.compareAtPrice) {
    const onSale = variant.price < variant.compareAtPrice
    if (onSale) {
      //figure out percentage
      saleSavingsPercentage = Math.round(
        ((variant.compareAtPrice - variant.price) / variant.compareAtPrice) *
          100
      )
    }
  }

  //by default, gets the FIRST instance of image with matching color name alt text
  //swatch images are supposed to be at end of product images in Shopify
  const colorSwatchImages = []
  colorOptions.forEach((vcn) =>
    colorSwatchImages.push(getSwatchImage(product.images, vcn, true))
  )

  return (
    <>
      <Container maxW={"7xl"}>
        <Breadcrumbs
          menuData={pageContext.sanityMenuData}
          pathBits={getProductBreadcrumbs(product.collections)}
        />
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 5, md: 8 }}
        >
          <Flex style={{ aspectRatio: "604/694" }}>
            <ProductImageGallery
              images={product.images}
              selectedColor={colorOption}
              variant={variant}
              productTitle={product.title}
            />
          </Flex>
          <ProductForm
            location={location}
            setQueryStringParameter={setQueryStringParameter}
            product={product}
            variant={variant}
            reviewsRef={reviewsRef}
            selectedColor={colorOption}
            selectedSize={sizeOption}
            optionExists={optionExists}
            optionAvailable={optionAvailable}
            discontinued={discontinued}
            colorSwatchImages={colorSwatchImages}
            colorOptions={colorOptions}
            optionIsActive={optionIsActive}
            handleOptionChange={handleOptionChange}
            sizeOptions={sizeOptions}
            available={available}
            setCartDrawerOpen={setCartDrawerOpen}
            completeTheLookData={completeTheLookData}
          />
        </SimpleGrid>
      </Container>

      {/* PRODUCT DETAILS */}
      <ProductInfo
        descriptionHtml={product.descriptionHtml}
        reviewsRef={reviewsRef}
        brand={product.vendor}
        shopifyId={product.shopifyId}
        sku={variant?.sku}
        upc={variant?.barcode}
      />

      {/* RECOMMENDED PRODUCTS */}
      {recommendedProducts && (
        <Container maxW={"7xl"} mb={8}>
          <Heading
            as="h3"
            color="#333"
            size="lg"
            fontWeight="400"
            textAlign={"center"}
            mt={20}
            mb={12}
          >
            Recommended Products
          </Heading>

          <RecommendedProducts products={recommendedProducts} />
        </Container>
      )}

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </>
  )
}

export default Product
