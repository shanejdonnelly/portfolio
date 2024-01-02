import * as React from "react"
import getSwatchImage from "../../utils/getSwatchImage"
import getPriceRanges from "../../utils/getPriceRanges"
import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Image,
} from "@chakra-ui/react"
import ColorSwatchWrap from "./ColorSwatchWrap"
import Price from "../Price"

const CollectionGridProductItem = ({
  metafields,
  handle,
  images,
  priceRangeV2,
  title,
  colorOption,
  isSearchItem = false,
  variants,
  desktopFiltersOpen = true,
}) => {
  const priceRanges = getPriceRanges(variants)

  //get array of vendor colors
  let colors = []
  if (colorOption && colorOption.values) {
    colors = colorOption.values
  }

  //get color families and associated swatch image from variants
  let rawVendorColorNames = []
  let rawColorFamilyNames = []
  let rawColorSwatchImages = []
  if (variants && !!variants.length) {
    variants.forEach((variant, variantIndex) => {
      if (variant.image?.gatsbyImageData?.images?.fallback?.src) {
        //this is not used as of 10-18-22, but leaving for next change of logic from above
        rawColorSwatchImages.push(
          variant.image.gatsbyImageData.images.fallback.src
        )
      }

      if (variant.metafields && !!variant.metafields.length) {
        variant.metafields.forEach((metafield) => {
          //only need one metafield color_family, because they are all the same
          if (metafield.key === "vendor_color_name") {
            rawVendorColorNames.push(metafield.value)
          }
          if (metafield.key === "color_family") {
            rawColorFamilyNames.push(metafield.value)
          }
        })
      }
    })
  }
  const vendorColorNames = [...new Set(rawVendorColorNames)]
  const colorFamilyNames = [...new Set(rawColorFamilyNames)]
  //const colorSwatchImages = [...new Set(rawColorSwatchImages)]

  //sort vendorColorNames so that featuredvendorcolor metafield is first
  let featuredVendorColorMetafield = null
  if (metafields) {
    featuredVendorColorMetafield = metafields.find(
      (meta) => meta.key === "featuredvendorcolor"
    )
  }

  if (featuredVendorColorMetafield) {
    const featuredVendorColor = featuredVendorColorMetafield.value
    const fromIndex = vendorColorNames.indexOf(featuredVendorColor)
    const toIndex = 0
    if (fromIndex === toIndex) {
      //already in first slot
    } else {
      const element = vendorColorNames.splice(fromIndex, 1)[0]
      vendorColorNames.splice(toIndex, 0, element)
    }
  }
  //END sort vendorColorNames

  /*
    Event Handlers
  */
  const handleColorChange = (color) => {
    setActiveColor(color)
  }
  //END Event Handlers

  const colorSwatchImages = []
  vendorColorNames.forEach((vcn) =>
    colorSwatchImages.push(getSwatchImage(images, vcn, true, isSearchItem))
  )

  /*
    State
  */
  const [activeColor, setActiveColor] = React.useState(
    !!vendorColorNames.length ? vendorColorNames[0] : null
  )
  const [activeImage, setActiveImage] = React.useState(
    getSwatchImage(images, activeColor)
  )

  React.useEffect(() => {
    setActiveImage(getSwatchImage(images, activeColor))
  }, [activeColor])

  let width = {
    base: "155px",
    sm: "230px",
    md: "240px",
    lg: "240px",
    xl: "295px",
  }
  if (desktopFiltersOpen) {
    width = {
      base: "155px",
      sm: "230px",
      md: "240px",
      lg: "240px",
      xl: "236px",
    }
  }

  return (
    <Box position="relative">
      <LinkBox as="article" w={width}>
        {priceRanges.onSale && (
          <Text
            background="gray.200"
            fontSize="11px"
            height="22px"
            lineHeight="22px"
            position="absolute"
            right="12px"
            textAlign="center"
            top="12px"
            width="48px"
          >
            SALE
          </Text>
        )}
        <Image
          alt={title}
          srcSet={activeImage}
          objectFit={"contain"}
          align={"center"}
          boxSize={width}
        />

        <LinkOverlay
          href={`/products/${handle}?color=${activeColor ? activeColor : ""}`}
        >
          <Heading variant="productTitle" minH="52px" noOfLines={2} w={width}>
            {title}
          </Heading>
          <Box>
            <Price pr={priceRanges} />
          </Box>
        </LinkOverlay>
      </LinkBox>

      {!!vendorColorNames.length && (
        <Box mt={2} w={width}>
          <ColorSwatchWrap
            activeColor={activeColor}
            colorSwatchImages={colorSwatchImages}
            handleColorChange={handleColorChange}
            vendorColorNames={vendorColorNames}
          />
        </Box>
      )}
    </Box>
  )
}

export default CollectionGridProductItem
