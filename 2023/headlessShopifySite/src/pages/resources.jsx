import * as React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import { BsChevronDoubleRight } from "react-icons/bs"
import {
  Container,
  Grid,
  Heading,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"
import Layout from "../components/Layout/Layout"
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
export default function ResourcesPage({ data }) {
  return (
    <Layout>
      <Container maxW={"container.xl"} mb={8}>
        <Heading variant={"pageTitle"} my={8}>
          Resources
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3,1fr)",
            xl: "repeat(4,1fr)",
          }}
          gap={6}
        >
          {!!data?.allSanityResource.nodes.length &&
            data.allSanityResource.nodes.map((node, index) => (
              <LinkBox key={`node_${index}`}>
                <Image
                  alt={node.title}
                  src={node.thumbnailImage.asset.url}
                  boxSize="300px"
                  objectFit="cover"
                />

                <Heading
                  as="h3"
                  fontWeight="700"
                  size={"sm"}
                  py={4}
                  fontFamily="notosans"
                >
                  <LinkOverlay
                    display={"flex"}
                    alignItems="center"
                    as={GatsbyLink}
                    to={`/resources/${node.slug.current}`}
                  >
                    {node.title}{" "}
                    <Icon as={BsChevronDoubleRight} ml={2} fontSize="13px" />
                  </LinkOverlay>
                </Heading>
              </LinkBox>
            ))}
        </Grid>
      </Container>
    </Layout>
  )
}
export const Head = ({ location, params, data, pageContext }) => (
  <Seo
    title="Resources"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
