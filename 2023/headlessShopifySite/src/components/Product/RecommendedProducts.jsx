import * as React from "react"
import { Grid, GridItem } from "@chakra-ui/react"
import RecommendedProductCard from "../Cards/RecommendedProductCard"

export default function RecommendedProducts({ products }) {
  return products && !!products.length ? (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      mb={5}
      gap={3}
    >
      {products.map((product) => (
        <GridItem key={product.id}>
          <RecommendedProductCard product={product} />
        </GridItem>
      ))}
    </Grid>
  ) : null
}
