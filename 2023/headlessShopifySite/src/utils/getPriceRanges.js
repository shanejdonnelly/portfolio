//"sale" price will always be price because they set compareAtPrice when putting on sale
export default function getPriceRanges(variants) {
    let onSale = false;
    let lowRegular = 10000
    let highRegular = 0
    let lowSale = 10000
    let highSale = 0

    variants.forEach(v => {
        let regularPrice, salePrice

        if (v.compareAtPrice) {
            onSale = true

            //regular price is compareAtPrice since it isn't null
            regularPrice = v.compareAtPrice ? parseFloat(v.compareAtPrice) : null

            if (regularPrice && regularPrice < lowRegular) {
                lowRegular = regularPrice
            }
            if (regularPrice && regularPrice > highRegular) {
                highRegular = regularPrice
            }

            //which means salePrice is price
            salePrice = v.price ? parseFloat(v.price) : null

            if (salePrice && salePrice < lowSale) {
                lowSale = salePrice
            }
            if (salePrice && salePrice > highSale) {
                highSale = salePrice
            }

        }
        else {
            //regular price is price since compareAtPrice is null
            regularPrice = v.price ? parseFloat(v.price) : null

            if (regularPrice && regularPrice < lowRegular) {
                lowRegular = regularPrice
            }
            if (regularPrice && regularPrice > highRegular) {
                highRegular = regularPrice
            }

        }
    })

    return {
        onSale,
        salePriceRange: [lowSale, highSale],
        regularPriceRange: [lowRegular, highRegular]
    }
}