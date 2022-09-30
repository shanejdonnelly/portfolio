import * as React from 'react'
import { formatDollars, allValuesEqual } from '../wholesale-order-app/helpers'
import { Flex } from '@chakra-ui/react'

const Price = ({ productPriceInfo, variants = null }) => {
    let onSale = false
    //for products with variants on sale, below will show sale price, so it is set again below
    let retailPrice = productPriceInfo?.basePrice?.value ? productPriceInfo.basePrice.value : 0;
    let salePrice = 0

    let variantSalePrices = []
    let variantRetailPrices = []
    if (variants && !!variants.length) {
        variants.forEach(v => {
            //prevent items with $0 salePrice from appearing on sale
            //there is a bug here but I'm not sure if it's that basePrice == salePrice or what
            //fixed below by using Math.abs() to avoid negative you save amount
            v.salePrice !== 0 ? variantSalePrices.push(v.salePrice): variantSalePrices.push(v.basePrice)
            variantRetailPrices.push(v.basePrice)
        })
    }
    if (!allValuesEqual(variantSalePrices, variantRetailPrices)) {
        //at least one variant is on sale
        onSale = true
        //find the low price in case not all variants on sale
        salePrice = Math.min(...variantSalePrices)
        retailPrice = Math.min(...variantRetailPrices)
    }

    return onSale ? (
        <div className="price-section price-section--withoutTax">
            <span data-product-price-without-tax="" className="price price--withoutTax"><span style={{ textDecoration: 'line-through' }}>{formatDollars(retailPrice)}</span></span>
            <span data-product-price-without-tax="" className="price price--withoutTax"><span style={{ fontWeight: '700', paddingLeft: '8px' }}>{formatDollars(salePrice)}</span></span>
            <br />
            <span data-product-price-without-tax="" className="price price--withoutTax" style={{ fontSize: '13px' }}>(You Save {formatDollars(Math.abs(retailPrice - salePrice))})</span>
        </div>
    ) : (
        <div className="price-section price-section--withoutTax">
            <span data-product-price-without-tax="" className="price price--withoutTax">{formatDollars(retailPrice)}</span>
        </div>
    )
}
export default Price;