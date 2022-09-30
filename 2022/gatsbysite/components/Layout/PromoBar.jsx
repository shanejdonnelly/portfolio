import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Container } from "@chakra-ui/react"
import serializers from "../../utils/sanitySerializers"
import BasePortableText from "@sanity/block-content-to-react"

export default function PromoBar() {
  const data = useStaticQuery(graphql`
    query {
      allSanityPromoBar {
        nodes {
          id
          _rawPromoBar
          bgColor
          color
        }
      }
    }
  `)
  const node = data.allSanityPromoBar.nodes[0]
  return (
    <Box
      w="100%"
      color={node.color}
      py={3}
      bgColor={node.bgColor}
      fontSize="md"
    >
      <Container className="promoBar" centerContent maxW="container.xl">
        {node._rawPromoBar && (
          <Box
            className="template-post-bodyWrap"
            fontSize={{ base: "12px", md: "15px" }}
          >
            <BasePortableText
              blocks={node._rawPromoBar}
              projectId="1w3k1nck"
              dataset="production"
              serializers={serializers}
            />
          </Box>
        )}
      </Container>
    </Box>
  )
}
