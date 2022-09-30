import * as React from "react"
import { navigate } from "gatsby"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"

export default function NotFoundPage() {
  return (
    <Layout>
      <Container maxW={"container.md"}>
        <VStack spacing={4} mt={8}>
          <Heading textAlign="center" variant={"pageTitle"}>
            Page Not Found
          </Heading>
          <Text textAlign="center">
            Sorry, we can't seem to find that right now!
          </Text>
          <Center>
            <Button
              bg={"darkblue"}
              color={"white"}
              fontSize="13px"
              onClick={() => navigate("/")}
              position="relative"
              px={8}
              textTransform="uppercase"
              top="24px"
            >
              Shop Now
            </Button>
          </Center>
        </VStack>
      </Container>
    </Layout>
  )
}
export const Head = ({ location, params, data, pageContext }) => (
  <Seo
    title="Not Found"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
