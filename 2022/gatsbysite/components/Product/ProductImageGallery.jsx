import * as React from "react"
import ImageGallery from "react-image-gallery"

const ProductImageGallery = ({ images, selectedColor }) => {
  let variantImages = images.filter((i) => {
    if (i.altText) {
      if (i.altText.toLowerCase().includes(selectedColor.toLowerCase())) {
        return true
      }
    } else {
      return true
    }
    return false
  })

  const productImages = variantImages.map((image) => {
    return {
      original: image.src,
      thumbnail: image.src,
      originalAlt: image.altText,
      thumbnailAlt: image.altText,
    }
  })

  return <ImageGallery showPlayButton={false} items={productImages} />
}

export default ProductImageGallery
