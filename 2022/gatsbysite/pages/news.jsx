import * as React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import Breadcrumbs from "../components/Breadcrumbs"
import { BsChevronDoubleRight } from "react-icons/bs"
import {
  Container,
  Grid,
  Heading,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"

export const query = graphql`
  query {
    allSanityPost {
      nodes {
        id
        mainImage {
          asset {
            url
          }
        }
        mainImageAltText
        intro
        title
        slug {
          current
        }

        publishedAt(formatString: "MMM D, YYYY")
      }
    }
  }
`
export default function NewsPage({ data }) {
  return (
    <Layout>
      <Container maxW={"container.xl"}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={8}
        >
          {!!data?.allSanityPost.nodes.length &&
            data.allSanityPost.nodes.map((node, index) => (
              <LinkBox key={`linkbox_${index}`}>
                <Image
                  alt={node.mainImageAltText}
                  src={node.mainImage.asset.url}
                  objectFit="cover"
                />
                <Text
                  fontSize="14px"
                  textTransform={"uppercase"}
                  color="gray.600"
                  mt={8}
                  textAlign={"center"}
                >
                  {node.publishedAt}
                </Text>
                <Heading
                  variant="pageTitle"
                  fontSize={"24px"}
                  pb={4}
                  textTransform="uppercase"
                  textAlign={"center"}
                >
                  {node.title}
                </Heading>

                <Text>{node.intro}</Text>
                <LinkOverlay
                  display={"flex"}
                  alignItems="center"
                  as={GatsbyLink}
                  to={`/news/${node.slug.current}`}
                  mt={2}
                >
                  <Text
                    textTransform={"uppercase"}
                    color="black"
                    fontSize={"12px"}
                    fontWeight="700"
                  >
                    Read More
                  </Text>
                  <Icon as={BsChevronDoubleRight} ml={2} fontSize="10px" />
                </LinkOverlay>
              </LinkBox>
            ))}
        </Grid>
      </Container>
    </Layout>
  )
}
export const Head = ({ location, params, data, pageContext }) => (
  <Seo
    title="News"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
