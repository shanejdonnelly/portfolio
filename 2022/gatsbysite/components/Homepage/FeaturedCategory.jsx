import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"
import ImageLink from "../Cards/ImageLink"

const FeaturedCategory = ({ data }) => {
  return (
    <Box backgroundColor={data.backgroundColor}>
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
          {data.categoryLinks.map((catLink, index) => (
            <ImageLink
              key={`imageLink_${index}`}
              imageUrl={catLink.imageUrl.asset.url}
              linkText={catLink.linkText}
              linkUrl={catLink.linkUrl}
              round={catLink.roundImage}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  )
}

export default FeaturedCategory
