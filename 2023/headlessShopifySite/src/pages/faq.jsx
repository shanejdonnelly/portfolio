import * as React from "react"
import { graphql } from "gatsby"
import BasePortableText from "@sanity/block-content-to-react"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Container,
  Heading,
} from "@chakra-ui/react"
import serializers from "../utils/sanitySerializers"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"

export const query = graphql`
  query {
    allSanityFaq {
      nodes {
        question
        _rawAnswer
      }
    }
  }
`
export default function FaqPage({ data }) {
  return (
    <Layout>
      <Container maxW={"container.md"} className="page">
        <Heading variant={"pageTitle"} my={8}>
          Frequently Asked Questions
        </Heading>
        <Accordion defaultIndex={[0]} allowMultiple mb={8}>
          {data.allSanityFaq.nodes.map((node, index) => (
            <AccordionItem key={`item_${index}`}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {node.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {node._rawAnswer && (
                  <BasePortableText
                    blocks={node._rawAnswer}
                    serializers={serializers}
                  />
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
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
