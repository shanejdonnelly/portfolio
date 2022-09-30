import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Container, Flex, Heading } from "@chakra-ui/react"
import CategoryCard from "../Cards/CategoryCard"

const PopularCategories = ({ data }) => {
  return (
    <Box backgroundColor={data.backgroundColor} mb={12}>
      <Container maxW={"container.xl"}>
        {data?.headline && (
          <Heading
            as="h3"
            color="#333"
            size="lg"
            fontWeight="400"
            textAlign={"center"}
            my={8}
          >
            {data.headline}
          </Heading>
        )}

        <Flex py={3} justifyContent="center" flexWrap="wrap">
          {data.categoryCards.map((card, index) => (
            <CategoryCard
              key={`catCard_${index}`}
              categoryLink={card.categoryLink}
              links={card.links}
              title={card.categoryTitle}
              imageSrc={
                card.imageSrc?.asset?.url ? card.imageSrc.asset.url : ""
              }
            />
          ))}
        </Flex>
      </Container>
    </Box>
  )
}

export default PopularCategories
