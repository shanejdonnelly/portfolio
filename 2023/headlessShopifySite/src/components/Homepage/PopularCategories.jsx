import * as React from "react"
import { Box, Container, Grid, Heading } from "@chakra-ui/react"
import CategoryCard from "../Cards/CategoryCard"

const PopularCategories = ({ data }) => {
  return (
    <Box backgroundColor={data.backgroundColor} mb={12}>
      <Container maxW={"container.xl"}>
        {data?.headline && (
          <Heading
            as="h3"
            color="black"
            size="lg"
            fontWeight="400"
            textAlign={"center"}
            mb={8}
            mt={20}
          >
            {data.headline}
          </Heading>
        )}
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            xl: "repeat(4,1fr)",
          }}
          columnGap={3}
          rowGap={3}
        >
          {data.categoryCards.map((card, index) => (
            <CategoryCard
              key={`catCard_${index}`}
              categoryLink={card.categoryLink}
              links={card.links}
              title={card.categoryTitle}
              image={card.imageSrc}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default PopularCategories
