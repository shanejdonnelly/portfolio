import * as React from "react"
import BasePortableText from "@sanity/block-content-to-react"
import { graphql } from "gatsby"
import { Container, Flex, Heading } from "@chakra-ui/react"
import serializers from "../utils/sanitySerializers"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"

export const query = graphql`
  query {
    sanityPage(title: { eq: "Shipping & Returns" }) {
      id
      title
      metaDescription
      _rawBody
    }
  }
`
export default function ShippingPage({ data }) {
  const _rawBody = data.sanityPage._rawBody

  console.log(_rawBody)
  return (
    <Layout>
      <Container maxW={"container.xl"} mb={8} className="page">
        <Flex flexDir="column">
          <Heading variant={"pageTitle"} my={8}>
            {data.sanityPage.title}
          </Heading>

          {_rawBody && (
            <BasePortableText
              className="sanityContent"
              blocks={_rawBody}
              projectId="1w3k1nck"
              dataset="production"
              serializers={serializers}
            />
          )}
        </Flex>
      </Container>
    </Layout>
  )
}
export const Head = ({ location, params, data, pageContext }) => (
  <Seo
    title="Shipping and Returns"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
