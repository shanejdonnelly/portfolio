import * as React from "react"
import BasePortableText from "@sanity/block-content-to-react"
import { graphql } from "gatsby"
import { Container, Flex, Heading } from "@chakra-ui/react"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import serializers from "../utils/sanitySerializers"

export const query = graphql`
  query {
    sanityPage(title: { eq: "Privacy Policy" }) {
      id
      title
      _rawBody
    }
  }
`
export default function PrivacyPage({ data }) {
  const _rawBody = data.sanityPage._rawBody
  return (
    <Layout>
      <Container maxW={"container.xl"} mb={12}>
        <Flex flexDir="column">
          <Heading variant={"pageTitle"} my={8}>
            Privacy Policy
          </Heading>

          {_rawBody && (
            <BasePortableText
              className="sanityContent"
              blocks={_rawBody}
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
    title="Frequently Asked Questions"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
