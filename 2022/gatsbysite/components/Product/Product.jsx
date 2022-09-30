import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import isEqual from "lodash.isequal"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import ProductImageGallery from "./ProductImageGallery"
import { StoreContext } from "../../context/store-context"
import AddToCartButton from "../AddToCartButton"
import ProductInfo from "./ProductInfo"
import RecommendedProducts from "./RecommendedProducts"
import CartDrawer from "../Cart/CartDrawer"
import { BiRuler } from "react-icons/bi"

const Product = ({ product, location }) => {
  const { client } = React.useContext(StoreContext)
  const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false)
  const [variant, setVariant] = React.useState({ ...product.variants[0] })
  const [quantity, setQuantity] = React.useState(1)
  const [available, setAvailable] = React.useState(variant.availableForSale)
  const [activeAccordionPanel, setActiveAccordionPanel] = React.useState(0)
  const [recommendedProducts, setRecommendedProducts] = React.useState(null)

  const reviewsRef = React.useRef()

  const handleAccordionChange = (panelNumber) => {
    setActiveAccordionPanel(panelNumber)
  }

  /*
    checkAvailability
  */
  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (v) => v.id === variant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [variant.storefrontId, client.product]
  )

  /*
    handleOptionChange()
  */
  const handleOptionChange = (optionName, value) => {
    if (value === "") {
      return
    }
    if (window) {
      if (optionName === "Vendor Color Name") {
        setQueryStringParameter("color", value)
      }
      if (optionName === "Size") {
        setQueryStringParameter("size", value)
      }

      const currentOptions = [...variant.selectedOptions]
      const updatedOptions = currentOptions.filter(
        (curOpt) => curOpt.name !== optionName
      )
      updatedOptions.push({ name: optionName, value })

      const selectedVariant = product.variants.find((v) => {
        return isEqual(
          updatedOptions.sort((a, b) => a.name.localeCompare(b.name)),
          v.selectedOptions.sort((a, b) => a.name.localeCompare(b.name))
        )
      })

      if (selectedVariant) {
        setVariant({ ...selectedVariant })
      }
    }
  }

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
    useEffect()
  */
  React.useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [variant.storefrontId, checkAvailablity, product.storefrontId])

  //run only on load to set stuff from query params
  React.useEffect(() => {
    const initialSearchParams = new URLSearchParams(location.search)
    const colorQuery = initialSearchParams.get("color")
    const sizeQuery = initialSearchParams.get("size")

    const updatedOptions = []
    if (colorQuery) {
      updatedOptions.push({ name: "Vendor Color Name", value: colorQuery })
    } else {
      //no color query, so add current variant color so options will match below
      const selectedColorOption = variant.selectedOptions.find(
        (opt) => opt.name === "Vendor Color Name"
      )
      updatedOptions.push({
        name: "Vendor Color Name",
        value: selectedColorOption.value,
      })
    }

    if (sizeQuery) {
      updatedOptions.push({ name: "Size", value: sizeQuery })
    } else {
      //no size query, so add current variant size so options will match below
      const selectedSizeOption = variant.selectedOptions.find(
        (opt) => opt.name === "Size"
      )
      updatedOptions.push({ name: "Size", value: selectedSizeOption.value })
    }

    const selectedVariant = product.variants.find((v) => {
      return isEqual(
        updatedOptions.sort((a, b) => a.name.localeCompare(b.name)),
        v.selectedOptions.sort((a, b) => a.name.localeCompare(b.name))
      )
    })

    if (selectedVariant) {
      setVariant({ ...selectedVariant })
    }
  }, [])

  //GET recommended products
  React.useEffect(() => {
    if (window && product) {
      const isLocalhost = window.location.hostname === "localhost"
      if (isLocalhost) {
        const data = {
          products: [
            {
              id: 7215355822275,
              title: "Abigail 56X24 Tiers.Mult",
              handle: "abigail-tier-and-cafe-curtain",
              description:
                "\u003cp\u003eAbigail 56X24 Tiers.Mult\u003c/p\u003e\u003cp\u003e       \u003c/p\u003e",
              published_at: "2022-04-04T21:32:53-04:00",
              created_at: "2022-04-04T17:00:46-04:00",
              vendor: "Ellis, A.L. Inc",
              type: "Tiers/Match.Mats,Nap",
              tags: [
                "Nap",
                "New Web Item",
                "Tiers/Match.Mats",
                "Tiers/Novelties",
              ],
              price: 1499,
              price_min: 1499,
              price_max: 3299,
              available: true,
              price_varies: true,
              compare_at_price: null,
              compare_at_price_min: 0,
              compare_at_price_max: 0,
              compare_at_price_varies: false,
              variants: [
                {
                  id: 41670492848323,
                  title: '56" W x 24" L / Multi',
                  option1: '56" W x 24" L',
                  option2: "Multi",
                  option3: null,
                  sku: "010875",
                  requires_shipping: true,
                  taxable: true,
                  featured_image: {
                    id: 37601273086147,
                    product_id: 7215355822275,
                    position: 2,
                    created_at: "2022-06-29T15:46:03-04:00",
                    updated_at: "2022-06-29T15:46:04-04:00",
                    alt: "Lilac",
                    width: 1200,
                    height: 1200,
                    src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-abigail-58x24-tiersmult_2.jpg?v=1656531964",
                    variant_ids: [
                      41670492848323, 41670492881091, 41670492913859,
                      41670492946627, 41670492979395, 41670493012163,
                    ],
                  },
                },
              ],
              images: [
                "//cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-60-w-x-22-l-multi-10980_1.jpg?v=1649258376",
                "//cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-abigail-58x24-tiersmult_2.jpg?v=1656531964",
                "//cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-abigail-58x24-tiersmult_3.jpg?v=1656532012",
                "//cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-abigail-58x24-tiersmult_4.jpg?v=1656532032",
                "//cdn.shopify.com/s/files/1/0539/2377/4659/products/porcelain.jpg?v=1657296055",
                "//cdn.shopify.com/s/files/1/0539/2377/4659/products/lilac.jpg?v=1657296054",
              ],
              featured_image:
                "//cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-60-w-x-22-l-multi-10980_1.jpg?v=1649258376",
              options: [
                {
                  name: "Size",
                  position: 1,
                  values: [
                    '56" W x 24" L',
                    '56" W x 36" L',
                    '82" W x 63" L',
                    '80" W x 15" L',
                    '70" W x 17" L',
                    '60" W x 22" L',
                  ],
                },
                {
                  name: "Vendor Color Name",
                  position: 2,
                  values: ["Multi", "Porcelain", "Lilac"],
                },
              ],
              url: "/products/abigail-tier-and-cafe-curtain?pr_prod_strat=description\u0026pr_rec_id=f9952bea9\u0026pr_rec_pid=7215355822275\u0026pr_ref_pid=7215193718979\u0026pr_seq=uniform",
              media: [
                {
                  alt: "Multi",
                  id: 26997689843907,
                  position: 1,
                  preview_image: {
                    aspect_ratio: 1.0,
                    height: 1200,
                    width: 1200,
                    src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-60-w-x-22-l-multi-10980_1.jpg?v=1649258376",
                  },
                  aspect_ratio: 1.0,
                  height: 1200,
                  media_type: "image",
                  src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-60-w-x-22-l-multi-10980_1.jpg?v=1649258376",
                  width: 1200,
                },
                {
                  alt: "Lilac",
                  id: 29915162640579,
                  position: 2,
                  preview_image: {
                    aspect_ratio: 1.0,
                    height: 1200,
                    width: 1200,
                    src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-abigail-58x24-tiersmult_2.jpg?v=1656531964",
                  },
                  aspect_ratio: 1.0,
                  height: 1200,
                  media_type: "image",
                  src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-abigail-58x24-tiersmult_2.jpg?v=1656531964",
                  width: 1200,
                },
                {
                  alt: "Porcelain",
                  id: 29915173519555,
                  position: 3,
                  preview_image: {
                    aspect_ratio: 1.0,
                    height: 1200,
                    width: 1200,
                    src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-abigail-58x24-tiersmult_3.jpg?v=1656532012",
                  },
                  aspect_ratio: 1.0,
                  height: 1200,
                  media_type: "image",
                  src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-abigail-58x24-tiersmult_3.jpg?v=1656532012",
                  width: 1200,
                },
                {
                  alt: "Multi",
                  id: 29915181482179,
                  position: 4,
                  preview_image: {
                    aspect_ratio: 1.0,
                    height: 1200,
                    width: 1200,
                    src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-abigail-58x24-tiersmult_4.jpg?v=1656532032",
                  },
                  aspect_ratio: 1.0,
                  height: 1200,
                  media_type: "image",
                  src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/al-ellis-abigail-tier-and-cafe-curtain-abigail-58x24-tiersmult_4.jpg?v=1656532032",
                  width: 1200,
                },
                {
                  alt: "porcelain",
                  id: 30222331576515,
                  position: 5,
                  preview_image: {
                    aspect_ratio: 0.75,
                    height: 1333,
                    width: 1000,
                    src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/porcelain.jpg?v=1657296055",
                  },
                  aspect_ratio: 0.75,
                  height: 1333,
                  media_type: "image",
                  src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/porcelain.jpg?v=1657296055",
                  width: 1000,
                },
                {
                  alt: "Lilac",
                  id: 30222331609283,
                  position: 6,
                  preview_image: {
                    aspect_ratio: 0.952,
                    height: 1470,
                    width: 1400,
                    src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/lilac.jpg?v=1657296054",
                  },
                  aspect_ratio: 0.952,
                  height: 1470,
                  media_type: "image",
                  src: "https://cdn.shopify.com/s/files/1/0539/2377/4659/products/lilac.jpg?v=1657296054",
                  width: 1400,
                },
              ],
              requires_selling_plan: false,
              selling_plan_groups: [],
            },
          ],
        }
        setRecommendedProducts(data.products)
      } else {
        //need proxy to fix cors error from shopify
        const proxy = "https://portbay.netlify.app/.netlify/functions/cors"
        const arrayProductId = product.shopifyId.split("/")
        const productId = arrayProductId.pop()
        //TODO change to production site
        const root = "https://shop.morgandonnelly.com"
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

  /*
    optionAvailable()
  */
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

  //actual method hit in render
  const optionAvailable = (name, value) => {
    const currentSize = variant.selectedOptions.find(
      (vso) => vso.name === "Size"
    )
    const currentColor = variant.selectedOptions.find(
      (vso) => vso.name === "Vendor Color Name"
    )
    if (name === "Size") {
      return sizesByColor && currentColor && currentColor.value
        ? sizesByColor[currentColor.value].includes(value)
        : false
    }
    if (name === "Vendor Color Name") {
      return colorsBySize && currentSize && currentSize.value
        ? colorsBySize[currentSize.value].includes(value)
        : false
    }

    return false
  }
  /*
    END optionAvailable()
  */

  const selectedColorObject = variant.selectedOptions.find(
    (so) => so.name === "Vendor Color Name"
  )
  const selectedColor =
    selectedColorObject && selectedColorObject.value
      ? selectedColorObject.value
      : "white"

  const arrayProductId = product.shopifyId.split("/")
  const productId = arrayProductId.pop()

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5, md: 8 }}
      >
        <Flex>
          <ProductImageGallery
            images={product.images}
            selectedColor={selectedColor}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box>
            <Heading
              lineHeight={1.1}
              fontWeight={100}
              fontSize={{ base: "3xl", lg: "4xl" }}
            >
              {product.title}
            </Heading>

            <Text variant="upperCaseLabel" mt={6}>
              Price:
            </Text>
            <Heading color={"gray.800"} fontWeight={300} fontSize={"2xl"}>
              ${variant.price}
            </Heading>

            <Box
              mt={6}
              cursor="pointer"
              onClick={() => {
                reviewsRef.current.scrollIntoView({ behavior: "smooth" })
                setActiveAccordionPanel(2)
              }}
            >
              <span
                className="junip-product-summary"
                data-product-id={productId}
              ></span>
            </Box>

            <Text variant="upperCaseLabel" mt={6}>
              Availability:
            </Text>
            <Heading fontWeight={300} fontSize={"2xl"}>
              {available ? "In Stock" : "Out Of Stock"}
            </Heading>

            {!!product.variants.length && (
              <Box mt={6}>
                <Text variant="upperCaseLabel" mt={6}>
                  Select Color:
                </Text>
                {colorOptions.map((option, index) => (
                  <Button
                    key={`colorBtn_${index}`}
                    mr={1}
                    my={1}
                    disabled={!optionAvailable("Vendor Color Name", option)}
                    variant={
                      optionIsActive("Vendor Color Name", option)
                        ? "productOptionActive"
                        : "productOption"
                    }
                    onClick={() => {
                      handleOptionChange("Vendor Color Name", option)
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            )}

            {!!product.variants.length && (
              <Box mt={6}>
                <Text variant="upperCaseLabel" mt={6}>
                  Select Size:
                </Text>
                {sizeOptions.map((option, index) => (
                  <Button
                    key={`sizeBtn_${index}`}
                    mr={1}
                    my={1}
                    disabled={!optionAvailable("Size", option)}
                    variant={
                      optionIsActive("Size", option)
                        ? "productOptionActive"
                        : "productOption"
                    }
                    onClick={() => {
                      handleOptionChange("Size", option)
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            )}
            <Link as={GatsbyLink} to="/resources">
              <Flex mt={3} ml={1}>
                <Icon as={BiRuler} w={5} h={5} color="gray.700" />
                <Text fontSize="13px" ml={2}>
                  View Our Measuring Guide
                </Text>
              </Flex>
            </Link>

            <Text variant="upperCaseLabel" mt={6}>
              Quantity:
            </Text>

            <NumberInput
              mt={0}
              defaultValue={15}
              aria-label="Quantity"
              onChange={(val) => setQuantity(val)}
              value={quantity}
              min={1}
              maxW={20}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <AddToCartButton
            variantId={variant.storefrontId}
            quantity={quantity}
            available={available}
            openCartDrawer={() => setCartDrawerOpen(true)}
          />
        </Stack>
      </SimpleGrid>
      <ProductInfo
        descriptionHtml={product.descriptionHtml}
        activePanel={activeAccordionPanel}
        handleAccordionChange={handleAccordionChange}
        reviewsRef={reviewsRef}
        brand={product.vendor}
        sku={variant.sku}
        upc={variant.barcode}
      />
      {recommendedProducts && (
        <>
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
        </>
      )}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </Container>
  )
}

export default Product
