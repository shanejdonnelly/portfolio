import * as React from "react"
import ImageGallery from "react-image-gallery"

const ProductImageGallery = ({
  images,
  selectedColor,
  variant,
  productTitle,
}) => {
  let filteredProductImages = images.filter((i) => {
    if (i.altText) {
      if (i?.altText?.toLowerCase().includes(selectedColor?.toLowerCase())) {
        return true
      }
    } else {
      return true
    }
    return false
  })

  const altText = `${productTitle} - ${selectedColor}`

  const productImages = filteredProductImages.map((image) => {
    return {
      srcSet: image.gatsbyImageData.images.sources[0].srcSet,
      thumbnail: image.gatsbyImageData.images.sources[0].srcSet,
      originalAlt: altText,
      thumbnailAlt: altText,
      originalHeight: 640,
      originalWidth: 640,
      thumbnailHeight: 250,
      thumbnailWidth: 250,
    }
  })

  if (variant && variant.image && variant.image.gatsbyImageData) {
    const variantImage = {
      srcSet: variant.image.gatsbyImageData.images.sources[0].srcSet,
      thumbnail: variant.image.gatsbyImageData.images.sources[0].srcSet,
      originalAlt: altText,
      thumbnailAlt: altText,
      originalHeight: 640,
      originalWidth: 640,
      thumbnailHeight: 250,
      thumbnailWidth: 250,
    }
    productImages.unshift(variantImage)
  }

  return (
    <ImageGallery
      originalHeight="640px"
      originalWidth="640px"
      thumbnailHeight="250px"
      thumbnailWidth="250px"
      showPlayButton={false}
      items={productImages}
    />
  )
}

export default ProductImageGallery
