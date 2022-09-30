import * as React from "react"
import { formatPrice } from "../../utils/format-price"
import { navigate } from "gatsby"
import { Grid, GridItem } from "@chakra-ui/react"
import ProductCard2 from "../Cards/ProductCard2"

export default function RecommendedProducts({ products }) {
  return products && !!products.length ? (
    <Grid templateColumns="repeat(4, 1fr)" mb={5} gap={3}>
      {products.map((product, index) => (
        <GridItem key={product.id}>
          <ProductCard2
            maxPrice={product.price_max / 100}
            minPrice={product.price_min / 100}
            imageSrc={
              product.featured_image
                ? product.featured_image
                : "/placeholder-image.png"
            }
            title={product.title}
            product={product}
            link={`/shop/${product.handle}`}
          />
        </GridItem>
      ))}
    </Grid>
  ) : null
}
