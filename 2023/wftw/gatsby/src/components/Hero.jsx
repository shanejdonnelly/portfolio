import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react"
import { PortableText } from "@portabletext/react"
import Row from "./Row"

import * as styles from "./bodyText.module.css"

//https://github.com/portabletext/react-portabletext
const componentsWithColor = function (textColor) {
  return {
    block: {
      // Ex. 1: customizing common block types
      normal: ({ children }) => <Text color={textColor}>{children}</Text>,
      h1: ({ children }) => (
        <Heading
          color={textColor}
          as="h1"
          fontSize={{ base: "52px", md: "90px", xl: "128px" }}
          fontWeight="700"
        >
          {children}
        </Heading>
      ),
      h2: ({ children }) => (
        <Heading color={textColor} as="h2" size="2xl">
          {children}
        </Heading>
      ),
      h3: ({ children }) => (
        <Heading color={textColor} as="h3" size="xl">
          {children}
        </Heading>
      ),
    },
    marks: {
      em: ({ children }) => (
        <Text color={textColor} as="i">
          {children}
        </Text>
      ),
      strong: ({ children }) => (
        <Text color={textColor} as="b">
          {children}
        </Text>
      ),
      underline: ({ children }) => (
        <Text color={textColor} as="u">
          {children}
        </Text>
      ),
      "strike-through": ({ children }) => (
        <Text color={textColor} as="s">
          {children}
        </Text>
      ),
      link: ({ children, value }) => {
        return !value.href.startsWith("/") && !value.href.includes("wftw") ? (
          <Link color={textColor} href={value.href} isExternal>
            {children}
          </Link>
        ) : (
          <Link color={textColor} as={GatsbyLink} to={value.href}>
            {children}
          </Link>
        )
      },
    },
  }
}
export default function Hero({ data }) {
  const alignment = data.alignment ? data.alignment : "left"
  const textColor = data?.textColor?.hex ? data.textColor.hex : "#FFFFFF"

  const gImage = data.imageUrl?.asset?.gatsbyImageData
    ? data.imageUrl.asset.gatsbyImageData
    : null

  const heroText = data.heroText ? data.heroText : ""

  let component = null
  if (gImage) {
    component = (
      <Flex w="100%" alignItems="center" justifyContent={alignment}>
        <Image as={GatsbyImage} image={gImage} alt={"alt text"} />
      </Flex>
    )
  } else {
    //text hero
    component = (
      <Box w="100%" textAlign={alignment}>
        <PortableText
          value={data._rawHeroText}
          components={componentsWithColor(textColor)}
        />
      </Box>
    )
  }

  return <Row data={data}>{component}</Row>
}
