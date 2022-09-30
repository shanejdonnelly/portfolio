import * as React from "react"
import { graphql } from "gatsby"
import { Box } from "@chakra-ui/react"
import Layout from "../components/Layout/Layout"
import ButtonRow from "../components/ButtonRow"
import FeaturedCategory from "../components/Homepage/FeaturedCategory"
import LearnMore from "../components/Homepage/LearnMore"
import Hero from "../components/Homepage/Hero"
import PopularCategories from "../components/Homepage/PopularCategories"
import FeaturedProducts from "../components/Homepage/FeaturedProducts"
import Seo from "../components/Layout/Seo"

export const query = graphql`
  query {
    allSanityHomepage {
      nodes {
        sections {
          ... on SanityHomepageLearnMore {
            _type
            cardRowBackgroundColor
            heroBackgroundImageOverlayColor
            heroHeading
            heroHeight
            heroTextColor
            heroTextBelowHeading
            heroImage {
              asset {
                url
              }
            }
            learnItems {
              description
              link
              title
              imageSrc {
                asset {
                  url
                }
              }
            }
          }
          ... on SanityHomepagePopularCategories {
            _type
            headline
            backgroundColor
            categoryCards {
              categoryLink
              categoryTitle
              imageSrc {
                asset {
                  url
                }
              }
              links {
                linkText
                linkUrl
              }
            }
          }
          ... on SanityHero {
            _type
            buttonLink
            buttonText
            heading
            textAboveHeading
            textBelowHeading
            backgroundImageOverlayColor
            backgroundImageUrl {
              asset {
                url
              }
            }
          }
          ... on SanityHomepageFeaturedProducts {
            _type
            featuredProducts {
              buttonColor
              buttonText
              buttonTextColor
              buttonVariant
              description
              link
              roundImage
              title
              imageSrc {
                asset {
                  url
                }
              }
            }
            backgroundColor
          }
          ... on SanityHomepageFeaturedCategory {
            _type
            backgroundColor
            headline
            categoryLinks {
              linkText
              linkUrl
              roundImage
              imageUrl {
                asset {
                  url
                }
              }
            }
          }
          ... on SanityButtonRow {
            backgroundColor
            buttonVariant
            buttonColor
            name
            textColor
            _type
            buttons {
              link
              text
            }
          }
        }
      }
    }
  }
`
export default function IndexPage({ data }) {
  const sections =
    !!data?.allSanityHomepage?.nodes &&
    !!data.allSanityHomepage.nodes[0]?.sections?.length
      ? data.allSanityHomepage.nodes[0].sections
      : []

  return (
    <Layout>
      {!!sections.length &&
        sections.map((section, index) => {
          if (section._type === "buttonRow") {
            return <ButtonRow data={section} key={`buttonrow_${index}`} />
          } else if (section._type === "homepageFeaturedProducts") {
            return (
              <FeaturedProducts
                data={section}
                key={`featuredproducts_${index}`}
              />
            )
          } else if (section._type === "homepagePopularCategories") {
            return (
              <PopularCategories key={`popularcats_${index}`} data={section} />
            )
          } else if (section._type === "homepageLearnMore") {
            return <LearnMore key={`learnmore_${index}`} data={section} />
          } else if (section._type === "homepageFeaturedCategory") {
            return (
              <Box my={12}>
                <FeaturedCategory data={section} key={`featuredcat_${index}`} />
              </Box>
            )
          } else if (section._type === "hero") {
            return (
              <Hero
                backgroundImageOverlayColor={
                  section.backgroundImageOverlayColor
                }
                backgroundImageUrl={
                  section.backgroundImageUrl?.asset?.url || ""
                }
                textAboveHeading={section.textAboveHeading}
                heading={section.heading}
                textBelowHeading={section.textBelowHeading}
                buttonText={section.buttonText}
                key={`hero_${index}`}
                buttonLink={section.buttonLink}
              />
            )
          }
        })}
    </Layout>
  )
}

export const Head = ({ location, params, data, pageContext }) => (
  <Seo
    title="Curtains, Drapes, Blinds, Shades, Bed, Bath, Home Decor"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
