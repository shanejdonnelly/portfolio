import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Container } from "@chakra-ui/react"
import serializers from "../../utils/sanitySerializers"
import BasePortableText from "@sanity/block-content-to-react"

export default function PromoBar({ name, height = "normal" }) {
  const data = useStaticQuery(graphql`
    query {
      allSanityPromoBar {
        nodes {
          id
          _rawPromoBar
          bgColor
          color
          name
          hidden
        }
      }
    }
  `)

  const node = data.allSanityPromoBar.nodes.find((n) => n.name === name)

  return (
    node &&
    !node.hidden && (
      <Box
        w="100%"
        py={height === "normal" ? 3 : 1}
        bgColor={node.bgColor}
        fontSize="md"
      >
        <Container className="promoBar" centerContent maxW="container.xl">
          {node._rawPromoBar && (
            <Box
              className="template-post-bodyWrap"
              color={node.color}
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
  )
}
