import * as React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import { Box, Container, Grid, Heading, Link, Text } from "@chakra-ui/react"
import Layout from "../components/Layout/Layout"
import ContactForm from "../components/ContactForm"
import Seo from "../components/Layout/Seo"

export const query = graphql`
  query {
    allSanityResource {
      nodes {
        title
        slug {
          current
        }
        mainImage {
          asset {
            url
          }
        }
        thumbnailImage {
          asset {
            url
          }
        }
      }
    }
  }
`
export default function ContactUsPage({ data }) {
  return (
    <Layout>
      <Container maxW={"container.xl"}>
        <Heading variant={"pageTitle"} my={8}>
          Contact Us
        </Heading>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={28}
        >
          <Box>
            <Text mb={8}>
              In response to COVID-19 our customer service is temporarily
              limited to email. If you'd like speak to someone on the phone,
              please include the best phone number to reach you at, and we'll
              contact you as soon as we are able. Thank you for your cooperation
              and understanding.
            </Text>
            <ContactForm />
          </Box>
          <Box>
            <Box mb={8}>
              <Heading size="lg" mb={2}>
                Phone
              </Heading>
              <Link href="tel:18332665773">1-833-266-5773</Link>
            </Box>
            <Box mb={8}>
              <Heading size="lg" mb={2}>
                Hours
              </Heading>
              <Text>Monday – Friday: 8:30 am — 5:00 pm EST</Text>
            </Box>
            <Box mb={8}>
              <Heading size="lg" mb={2}>
                Mail
              </Heading>
              <Text>
                Port & Bay
                <br />
                175 Western Avenue
                <br />
                South Portland, ME 04106
              </Text>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}
export const Head = ({ location, params, data, pageContext }) => (
  <Seo
    title="Contact Us"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
