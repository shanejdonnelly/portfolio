import * as React from "react"
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Image,
} from "@chakra-ui/react"
import ProductColorSwatch from "./ProductColorSwatch"

const CollectionGridProductItem = ({
  handle,
  images,
  priceRangeV2,
  title,
  colorOption,
  variants,
}) => {
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
  const colorSwatchImages = [...new Set(rawColorSwatchImages)]

  /*
    Event Handlers
  */
  const handleColorChange = (color) => {
    setActiveColor(color)
  }

  const getImageSrc = (color) => {
    let imageSrc = "/placeholder-image.png"
    let image

    if (color && images && !!images.length) {
      //try to find by altText
      if (
        images.find(
          (i) =>
            i.altText && i.altText.toLowerCase().includes(color.toLowerCase())
        )
      ) {
        image = images.find((i) =>
          i.altText.toLowerCase().includes(color.toLowerCase())
        )
        if (image?.gatsbyImageData?.images?.fallback?.src) {
          imageSrc = image.gatsbyImageData.images.fallback.src
        }
      } else {
        //grab the first image
        image = images[0]
        if (image?.gatsbyImageData?.images?.fallback?.src) {
          imageSrc = image.gatsbyImageData.images.fallback.src
        }
      }
    }

    return imageSrc
  }

  /*
    State
  */
  const [activeColor, setActiveColor] = React.useState(
    !!vendorColorNames.length ? vendorColorNames[0] : null
  )
  const [activeImage, setActiveImage] = React.useState(getImageSrc(activeColor))

  React.useEffect(() => {
    setActiveImage(getImageSrc(activeColor))
  }, [activeColor])

  return (
    <Box>
      <LinkBox as="article">
        <Image
          alt={title}
          src={activeImage}
          fit={"contain"}
          align={"center"}
          w={"100%"}
        />

        <LinkOverlay
          href={`/shop/${handle}?color=${activeColor ? activeColor : ""}`}
        >
          <Heading variant="productTitle">{title}</Heading>
          <Text>Starting at: {priceRangeV2.minVariantPrice.amount}</Text>
        </LinkOverlay>
      </LinkBox>
      <Flex alignItems="center" mt={2} flexWrap="wrap">
        {!!vendorColorNames.length &&
          vendorColorNames.map((color, index) => (
            <ProductColorSwatch
              isActiveColor={color === activeColor}
              color={color}
              handleColorChange={handleColorChange}
              key={`colorSwatch_${index}`}
              colorSwatchImage={colorSwatchImages[index]}
            />
          ))}
      </Flex>
    </Box>
  )
}

export default CollectionGridProductItem
