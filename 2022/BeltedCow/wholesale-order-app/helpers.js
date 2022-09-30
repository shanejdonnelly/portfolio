import { variantColorList } from "../variantColors";

export const getColorTotal = function (lineItems, colorSortedVariants, colorName) {
    let colorTotal = 0;
    //only care about variants in this color
    const colorGroup = colorSortedVariants.filter(csv => csv.colorName === colorName);

    //outer loop
    lineItems.forEach(line => {
        //inner loop
        colorGroup[0].colorVariants.forEach((cv => {
            if (cv.id === line.variantId) {
                //this line item is in the color group, so add it's qty to the total
                colorTotal += line.quantity
            }
        }))
    })

    return colorTotal
}

export const allValuesEqual = function (array1, array2) {
    if (array1.length === array2.length) {
        return array1.every((element, index) => {
            if (element === array2[index]) {
                return true;
            }

            return false;
        });
    }

    return false;
}

export const flattenVariantData = function (variantData) {
    return variantData.edges.map(d => {
        return {
            id: d.node.entityId,
            productId: d.node.entityId,
            sku: d.node.sku,
            image_url: d.node.defaultImage?.url ? d.node.defaultImage.url : '',
            price: d.node.prices.price.value,
            basePrice: d.node.prices?.basePrice?.value || 0,
            salePrice: d.node.prices?.salePrice?.value || 0,
            calculated_price: d.node.prices.price.value,
            inventory_level: d.node.inventory?.aggregated?.availableToSell,
            option_values: d.node.options.edges.map(v => {
                return {
                    option_display_name: v.node.displayName,
                    label: v.node.values.edges[0].node.label
                }
            })

        }
    })
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const formatDollars = function (num) {
    return formatter.format(num);
}

export const getVariantLineItemQuantity = function (variantId, lineItems) {
    const item = lineItems.find(line => line.variantId === variantId)
    return item.quantity;
}

export const getNumItemsTotal = function (items) {
    return items.reduce(function (acc, obj) { return acc + obj.quantity }, 0);
}

export const getSubtotal = function (items, _variants) {
    return items.reduce(function (acc, obj) { return acc + getVariantPrice(obj.variantId, obj.quantity, _variants) }, 0);
}

const getVariantPrice = function (_id, _quantity, _variants) {
    const _variant = _variants.find(v => v.id === _id)
    return _quantity * _variant.price
}

const findColorVariants = function (color, _variants) {
    const colorVariants = []
    //not all variants have a size in the sku
    let sizeAbbr = null;
    let letterSizing = false
    const sizeSortingArray = ['s', 'm', 'l', 'xl', 'xxl']

    _variants.forEach(v => {
        const splitSku = v.sku.split('-')

        /*
            some variants have a size letter, some a number
            need to order both ways
        */
        if (splitSku.length > 3) {
            if(sizeSortingArray.includes(splitSku[3].toLowerCase())){
                //letter size
                sizeAbbr = splitSku[3].toLowerCase()
                letterSizing = true
            }
            else{
                //number size
                sizeAbbr = splitSku[3]
            }

        }

        const colorAbbr = v.sku.split('-')[2]
        const colorNames = Object.keys(variantColorList)
        const colorName = colorNames[parseInt(colorAbbr, 10)]
        const colorDisplayName = variantColorList[colorName] ? variantColorList[colorName].displayName : 'natural'
        if (colorDisplayName && colorDisplayName === color) {
            v.sizeAbbr = sizeAbbr
            colorVariants.push(v);
        }
    })

    if (sizeAbbr) {
        if(letterSizing){
            colorVariants.sort((a, b) => sizeSortingArray.indexOf(a.sizeAbbr) - sizeSortingArray.indexOf(b.sizeAbbr))
        }
        else{
            colorVariants.sort((a, b) => parseInt(a.sizeAbbr) - parseInt(b.sizeAbbr))
        }
    }

    return colorVariants
}

export const sortByColor = function (_variants) {
    const allColors = []

    //push all color option values
    _variants.forEach(v => {
        const colorAbbr = v.sku.split('-')[2]
        const colorNames = Object.keys(variantColorList)
        const colorName = colorNames[parseInt(colorAbbr, 10)]
        allColors.push(variantColorList[colorName] ? variantColorList[colorName].displayName : 'natural');
    })
    //get unique set of colors (not sure why [...new Set(allColors)]) doesn't work here)
    const uniqueColors = allColors.filter((v, i, a) => a.indexOf(v) === i);
    //const uniqueColors = [...new Set(allColors)]

    //get all variants with that color
    const sorted = uniqueColors.map(color => {
        return {
            colorName: color,
            quantity: 0,
            colorVariants: findColorVariants(color, _variants)
        }
    })
    return sorted
}
