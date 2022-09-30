import * as React from "react"
import BasePortableText from "@sanity/block-content-to-react"
import { graphql } from "gatsby"
import { Container, Flex, Heading, Table, Tr, Th, Td } from "@chakra-ui/react"
import serializers from "../utils/sanitySerializers"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"

export const query = graphql`
  query {
    sanityPage(title: { eq: "Ordering Information" }) {
      id
      title
      _rawBody
    }
  }
`
export default function OrderingInformationPage({ data }) {
  const _rawBody = data.sanityPage._rawBody
  return (
    <Layout>
      <Container maxW={"container.xl"} mb={12}>
        <Flex flexDir="column">
          <Heading variant={"pageTitle"} my={8}>
            Ordering Information
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
    title="Ordering Information"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
