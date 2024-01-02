import * as React from "react"
import { graphql } from "gatsby"
import { Box, Container, Grid, Heading, Link, Text } from "@chakra-ui/react"
import Layout from "../components/Layout/Layout"
import ContactForm from "../components/ContactForm"
import Seo from "../components/Layout/Seo"

export default function ContactUsPage() {
  return (
    <Layout>
      <Container maxW={"container.xl"} className="page">
        <Heading variant={"pageTitle"} my={8}>
          Contact Us
        </Heading>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={28}
        >
          <Box>
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
    metaDescription="Phone 1-833-266-5773 Hours MONDAY – FRIDAY: 8:30 am — 5:00 pm EST Email customerservice@portandbay.com » Mail Port & Bay 175 Western Avenue South Portland, ME 04106"
  />
)
