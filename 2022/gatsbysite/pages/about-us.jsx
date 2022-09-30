import * as React from "react"
import BasePortableText from "@sanity/block-content-to-react"
import { graphql } from "gatsby"
import { Box, Container, Flex, Heading, Image } from "@chakra-ui/react"
import serializers from "../utils/sanitySerializers"
import Seo from "../components/Layout/Seo"
import Layout from "../components/Layout/Layout"

export const query = graphql`
  query {
    sanityPage(title: { eq: "About Us" }) {
      id
      title
      _rawBody
      mainImage {
        asset {
          url
        }
      }
      pageBlocks {
        _rawDescription
        heading
        image {
          asset {
            url
          }
        }
        imageAlignment
      }
    }
  }
`
export default function AboutUsPage({ data }) {
  const _rawBody = data.sanityPage._rawBody
  return (
    <Layout>
      <Container maxW={"container.xl"}>
        <Flex flexDir="column">
          <Heading variant={"pageTitle"} my={8}>
            {data.sanityPage.title}
          </Heading>
          {data?.sanityPage?.mainImage?.asset?.url && (
            <Image
              src={data.sanityPage.mainImage.asset.url}
              alt={data.sanityPage.title}
              pb={8}
            />
          )}
          {_rawBody && (
            <BasePortableText
              blocks={_rawBody}
              projectId="1w3k1nck"
              dataset="production"
              serializers={serializers}
            />
          )}
          {data.sanityPage.pageBlocks &&
            !!data.sanityPage.pageBlocks.length &&
            data.sanityPage.pageBlocks.map((block, index) => (
              <Flex
                key={`block_${index}`}
                alignItems={"center"}
                my={8}
                flexDir={
                  block.imageAlignment === "left" ? "row-reverse" : "row"
                }
              >
                <Box flex="0 0 50%" px={6}>
                  <Heading variant="pageTitle" pb={4}>
                    {block.heading}
                  </Heading>
                  {_rawBody && (
                    <BasePortableText
                      blocks={block._rawDescription}
                      projectId="1w3k1nck"
                      dataset="production"
                      serializers={serializers}
                    />
                  )}
                </Box>
                {block?.image?.asset?.url && (
                  <Box flex="0 0 50%" px={6}>
                    <Image
                      objectFit={"cover"}
                      src={block.image.asset.url}
                      alt={block.heading}
                    />
                  </Box>
                )}
              </Flex>
            ))}
        </Flex>
      </Container>
    </Layout>
  )
}

export const Head = ({ location, params, data, pageContext }) => (
  <Seo
    title="About Us"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
