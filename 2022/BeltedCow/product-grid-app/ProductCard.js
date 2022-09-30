import { Flex } from '@chakra-ui/react'
import * as React from 'react'
import { flattenVariantData, sortByColor } from '../wholesale-order-app/helpers'
import ColorSwatch from './ColorSwatch'
import Price from './Price'
import Rating from './Rating'

const ProductCard = ({ data }) => {
    let variants = null
    if (!!data.node.variants.edges.length) {
        variants = flattenVariantData(data.node.variants)
    }

    const [activeVariant, setActiveVariant] = React.useState({
        sku: variants && !!variants.length && variants[0].sku ? variants[0].sku : '',
        imageSrc: variants && !!variants.length && variants[0].image_url ? variants[0].image_url : data.node?.defaultImage?.url ? data.node.defaultImage.url : ''
    })

    const colorSortedVariants = variants && !!variants.length ? sortByColor(variants) : []

    const handleSetVariant = function (clickedVariant) {
        setActiveVariant({
            sku: clickedVariant.colorVariants[0].sku,
            imageSrc: clickedVariant.colorVariants[0].image_url
        })
    }

    const linkPath = variants ? `${data.node.path}?sku=${activeVariant.sku}` : data.node.path

    const imageSrc = variants && activeVariant && activeVariant.imageSrc ? activeVariant.imageSrc : data.node?.defaultImage?.url ? data.node.defaultImage.url : ''

    return (
        <li className="product">
            <article className="card">
                <figure className="card-figure">
                    <a href={linkPath} data-event-type="product-click">
                        <div className="card-img-container">
                            <img src={imageSrc} alt={data.node.name} data-sizes="auto" className="card-image lazyautosizes lazyloaded" loading="lazy" sizes="208px" style={{ margin: 0 }}></img>
                        </div>
                    </a>
                    <figcaption className="card-figcaption">
                        <div className="card-figcaption-body">
                            <a href={linkPath} data-event-type="product-click" className="button button--small card-figcaption-button" data-product-id="2331">Choose Options</a>
                        </div>
                    </figcaption>
                </figure>
                <div className="card-body">
                    {data.node?.reviewSummary?.summationOfRatings && data.node.reviewSummary.summationOfRatings > 0 ? (
                        <Rating numStars={data.node.reviewSummary.summationOfRatings} />
                    ) : null}

                    <a href={linkPath} data-event-type="product-click">
                        <h4 className="card-title" style={{ fontWeight: 700, color: 'rgb(51,51,51)' }}>
                            {data.node.name}
                        </h4>
                        <Price productPriceInfo={data.node.prices} variants={variants} />
                    </a>
                    {variants && !!colorSortedVariants.length && colorSortedVariants.length > 1 && (
                        <Flex justifyItems='space-between' mt={2} flexWrap='wrap'>
                            {colorSortedVariants.map((v, index) => (
                                <ColorSwatch key={`swatch_${index}`} isActive={v?.colorVariants[0]?.sku === activeVariant.sku} variant={v} handleSetVariant={handleSetVariant} />
                            ))}
                        </Flex>
                    )}
                </div>
            </article>
        </li>
    )
}
export default ProductCard;