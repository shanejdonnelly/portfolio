import * as React from "react"
import {
  Box,
  Container,
  Flex,
  Link,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react"
import ProductCard from "../Cards/ProductCard"

const FeaturedProducts = ({ data }) => {
  const width = useBreakpointValue({ base: "320px", sm: "465px" })
  return !!data.featuredProducts.length ? (
    <Box backgroundColor={data.sectionBackgroundColor}>
      <Container maxW={"container.xl"}>
        <Flex py={3} justifyContent="center" flexWrap="wrap">
          {data.featuredProducts.map((product, index) => (
            <ProductCard
              key={`productCard_${index}`}
              imageSrc={
                product.imageSrc?.asset?.url ? product.imageSrc.asset.url : ""
              }
              width={width}
              title={product.title}
              description={product.description}
              link={product.link}
              buttonColor={product.buttonColor}
              buttonTextColor={product.buttonTextColor}
              buttonVariant={product.buttonVariant}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  ) : null
}

export default FeaturedProducts
