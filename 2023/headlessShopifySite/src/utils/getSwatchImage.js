//by default, gets the FIRST instance of image with matching color name alt text
//swatch images are supposed to be at end of product images in Shopify
export default function getSwatchImage(images, color, reverse = false, isSearchItem = false) {
    let _images = typeof images === "string" ? images : [...images]
    let imageSrc = "/placeholder-image.png"
    let image

    //a series of checks before looking at altText to see if it matches the color
    if (color && _images && !!_images.length) {
        if (reverse) {
            _images.reverse()
        }
        //try to find a matching image
        image = _images.find((i) => {
            if (i.altText && !!i.altText.length) {
                if (i.altText.toLowerCase().includes(color.toLowerCase())) {
                    return true
                }
            }
            return false
        })

        //we found a match
        if (image && image?.gatsbyImageData) {
            //set imageSrc to srcSet
            imageSrc = image.gatsbyImageData.images.sources[0].srcSet
        }

        //no matching color image, use first image
        else {
            //grab the first image
            image = _images[0]
            if (image?.gatsbyImageData) {
                //set imageSrc
                imageSrc = image.gatsbyImageData.images.sources[0].srcSet
            }
        }
    }
    else if (_images && !!images.length && !isSearchItem) {
        image = images[0]
        if (image.gatsbyImageData) {

            imageSrc = image.gatsbyImageData.images.sources[0].srcSet
        }
    }
    //search page hands in a raw image src to this component
    else if (_images && isSearchItem) {
        imageSrc = _images
    }

    return imageSrc
}
