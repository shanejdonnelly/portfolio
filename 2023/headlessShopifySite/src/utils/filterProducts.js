function getConditions(options) {
    const active = []
    //loop over options
    Object.keys(options).forEach(optionKey => {
        if (optionKey === 'minPrice' && options.minPrice !== 0) {
            active.push(function (item) {
                return parseFloat(item.priceRangeV2.minVariantPrice.amount) >= parseFloat(options.minPrice) && parseFloat(item.priceRangeV2.minVariantPrice.amount) <= parseFloat(options.maxPrice)
            })
        }
        else if (optionKey === 'maxPrice' && options.maxPrice !== 9999) {
            active.push(function (item) {
                return parseFloat(item.priceRangeV2.minVariantPrice.amount) >= parseFloat(options.minPrice) && parseFloat(item.priceRangeV2.minVariantPrice.amount) <= parseFloat(options.maxPrice)
            })
        }

        else if (optionKey === 'color' && !!options.color.length) {
            active.push(function (item) {
                let result = false;
                options['color'].forEach(colorFamily => {
                    item.variants.forEach(variant => {
                        variant.metafields.forEach(metafield => {
                            if (metafield.key === 'color_family') {
                                if (metafield.value === colorFamily) {
                                    result = true
                                }
                            }
                        })
                    })
                })
                return result
            })
        }
        else if (optionKey === 'size' && !!options.size.length) {
            active.push(function (item) {
                let result = false;
                options['size'].forEach(sizeName => {
                    item.variants.forEach(variant => {
                        variant.metafields.forEach(metafield => {
                            if (metafield.key === 'size') {
                                if (metafield.value === sizeName) {
                                    result = true
                                }
                            }
                        })
                    })
                })
                return result
            })
        }
        else if (optionKey === 'length' && !!options['length'].length) {
            active.push(function (item) {
                let result = false;
                options['length'].forEach(sizeName => {
                    item.variants.forEach(variant => {
                        variant.metafields.forEach(metafield => {
                            if (metafield.key === 'length') {
                                if (metafield.value === sizeName) {
                                    result = true
                                }
                            }
                        })
                    })
                })
                return result
            })
        }
        else if (optionKey === 'width' && !!options.width.length) {
            active.push(function (item) {
                let result = false;
                options['width'].forEach(sizeName => {
                    item.variants.forEach(variant => {
                        variant.metafields.forEach(metafield => {
                            if (metafield.key === 'width') {
                                if (metafield.value === sizeName) {
                                    result = true
                                }
                            }
                        })
                    })
                })
                return result
            })
        }

        else if (optionKey === 'blackout' && options.blackout) {
            active.push(function (item) {
                const blackoutMeta = item.variants[0].metafields.find(m => m.key === 'blackout')
                return blackoutMeta && blackoutMeta.value ? blackoutMeta.value.toLowerCase() === 'true' : false
            })
        }
        else if (optionKey === 'lined' && options.lined) {
            active.push(function (item) {
                const linedMeta = item.variants[0].metafields.find(m => m.key === 'lined')
                return linedMeta && linedMeta.value ? linedMeta?.value.toLowerCase() === 'true' : false
            })
        }
        else if (optionKey === 'usaMade' && options.usaMade) {
            active.push(function (item) {
                const usaMeta = item.variants[0].metafields.find(m => m.key === 'made_in_usa')
                return usaMeta && usaMeta.value ? usaMeta.value.toLowerCase() === 'true' : false
            })
        }

    })
    return active;
}

function sortProducts(sort, filteredProducts) {
    if (sort === 'featured') {
        return filteredProducts
    }
    else if (sort === 'title') {
        return filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (sort === 'priceLowHigh') {
        return filteredProducts.sort((a, b) => parseFloat(a.priceRangeV2.minVariantPrice.amount) - parseFloat(b.priceRangeV2.minVariantPrice.amount))
    }
    else if (sort === 'priceHighLow') {
        return filteredProducts.sort((a, b) => parseFloat(b.priceRangeV2.minVariantPrice.amount) - parseFloat(a.priceRangeV2.minVariantPrice.amount))
    }
}


export default function filterProducts(allProducts, filters, sort) {
    const conditions = getConditions(filters) //returns an array of functions to filter by
    const filteredProducts = allProducts.filter(product => conditions.every(c => c(product)))
    const sortedProducts = sortProducts(sort, filteredProducts)
    return sortedProducts
}

function sortArrayByOccurences(things) {
    const counter = Object.create(null);
    things.forEach(function (l) {
        counter[l] = (counter[l] || 0) + 1;
    });
    things.sort(function (x, y) {
        return counter[y] - counter[x];
    });
    return [...new Set(things)]
}

export function getNumActiveFilters(filters) {
    let num = 0
    if (filters.blackout) {
        num = num + 1
    }
    if (filters.lined) {
        num = num + 1
    }
    if (filters.usaMade) {
        num = num + 1
    }
    if (filters.color && !!filters.color.length) {
        num = num + filters.color.length
    }
    if (filters['length'] && !!filters['length'].length) {
        num = num + filters['length'].length
    }
    if (filters.size && !!filters.size.length) {
        num = num + filters.size.length
    }
    if (filters.width && !!filters.width.length) {
        num = num + filters.width.length
    }
    if (!!filters.minPrice !== 0 || !!filters.maxPrice !== 1000) {
        num = num + filters.width.length
    }
    return num
}

export function getFilterTagName(key) {
    if (key === "blackout") {
        return "Blackout"
    } else if (key === "lined") {
        return "Lined"
    } else if (key === "usaMade") {
        return "Made in USA"
    }
}

export function getFilterInfo(products) {
    const filters = {}
    const rawLengths = []
    const rawWidths = []
    const rawSizes = []
    const rawColors = []
    let hasBlackout = false
    let hasLined = false
    let hasUsaMade = false

    const numProductsByFilter = {}
    const incrementNumProducts = function (key) {
        if (numProductsByFilter[key]) {
            numProductsByFilter[key] = numProductsByFilter[key] + 1
        }
        else {
            numProductsByFilter[key] = 1
        }
    }

    products.forEach(product => {
        product.variants.forEach((variant, variantIndex) => {
            variant.metafields.forEach(metafield => {
                if (metafield.key === 'color_family') {
                    rawColors.push(metafield.value)
                    incrementNumProducts(metafield.value)
                }
                if (metafield.key === 'blackout' && metafield.value === 'true') {
                    hasBlackout = true
                    incrementNumProducts('blackout')
                }
                if (variantIndex === 0 && metafield.key === 'lined' && metafield.value === 'true') {
                    hasLined = true
                    incrementNumProducts('lined')
                }
                if (metafield.key === 'made_in_usa' && metafield.value === 'true') {
                    hasUsaMade = true
                    incrementNumProducts('usaMade')
                }
                if (metafield.key === 'length') {
                    rawLengths.push(metafield.value)
                    incrementNumProducts(metafield.value)
                }
                if (metafield.key === 'width') {
                    rawWidths.push(metafield.value)
                    incrementNumProducts(metafield.value)
                }
                if (metafield.key === 'size') {
                    rawSizes.push(metafield.value)
                    incrementNumProducts(metafield.value)
                }
            })
        })
    })

    if (!!rawLengths.length) {
        filters.lengths = sortArrayByOccurences(rawLengths)
    }
    if (!!rawWidths.length) {
        filters.widths = sortArrayByOccurences(rawWidths)
    }
    if (!!rawSizes.length) {
        filters.sizes = sortArrayByOccurences(rawSizes)
    }
    if (!!rawColors.length) {
        filters.colors = sortArrayByOccurences(rawColors)
    }

    filters.hasUsaMade = hasUsaMade;
    filters.hasLined = hasLined
    filters.hasBlackout = hasBlackout
    filters.quantities = numProductsByFilter

    return filters
}
