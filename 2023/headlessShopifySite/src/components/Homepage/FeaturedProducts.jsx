import * as React from "react"
import { Box, Container, Grid, useBreakpointValue } from "@chakra-ui/react"
import ProductCard from "../Cards/ProductCard"

const FeaturedProducts = ({ data }) => {
  return !!data.featuredProducts.length ? (
    <Box backgroundColor={data.sectionBackgroundColor}>
      <Container maxW={"container.lg"}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2,1fr)",
          }}
          columnGap={8}
          rowGap={8}
        >
          {data.featuredProducts.map((product, index) => (
            <ProductCard
              key={`productCard_${index}`}
              image={product.imageSrc}
              title={product.title}
              description={product.description}
              link={product.link}
              buttonColor={product.buttonColor}
              buttonTextColor={product.buttonTextColor}
              buttonVariant={product.buttonVariant}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  ) : null
}

export default FeaturedProducts
