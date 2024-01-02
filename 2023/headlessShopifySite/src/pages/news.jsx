import * as React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import { BsChevronDoubleRight } from "react-icons/bs"
import {
  AspectRatio,
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
    allSanityPost(sort: { fields: publishedAt, order: DESC }) {
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
        intro
        publishedAt(formatString: "MMM D, YYYY")
        publishedAtDiff: publishedAt(difference: "months")
      }
    }
  }
`
export default function NewsPage({ data }) {
  let filteredPosts = []
  if (!!data?.allSanityPost.nodes.length) {
    filteredPosts = data.allSanityPost.nodes.filter(
      (node) => node.publishedAtDiff >= 0
    )
  }
  return (
    <Layout>
      <Container maxW={"container.xl"}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={8}
          mt={8}
        >
          {filteredPosts.length &&
            filteredPosts.map((node, index) => (
              <LinkBox key={`linkbox_${index}`}>
                <AspectRatio ratio={3 / 2}>
                  <Image
                    alt={node.mainImageAltText}
                    src={node.mainImage.asset.url}
                    objectFit="cover"
                  />
                </AspectRatio>
                <Text
                  fontSize="14px"
                  textTransform={"uppercase"}
                  color="gray.600"
                  mt={4}
                  textAlign={"center"}
                >
                  {node.publishedAt}
                </Text>
                <Heading
                  variant="pageTitle"
                  fontSize={"24px"}
                  mt={2}
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
                  justifyContent="center"
                  to={`/news/${node.slug.current}`}
                  mt={3}
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
