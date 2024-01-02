import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { PortableText } from "@portabletext/react"
import {
  Box,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import Row from "./Row"

import * as styles from "./bodyText.module.css"

//https://github.com/portabletext/react-portabletext

const componentsWithColor = function (textColor) {
  return {
    list: {
      bullet: ({ children }) => <UnorderedList>{children}</UnorderedList>,
    },
    listItem: {
      bullet: ({ children }) => (
        <Text color={textColor} as={ListItem}>
          {children}
        </Text>
      ),
    },

    types: {
      image: ({ value }) => <img src={value.imageUrl} />,
    },
    block: {
      // Ex. 1: customizing common block types
      normal: ({ children }) => <Text color={textColor}>{children}</Text>,
      h1: ({ children }) => (
        <Heading
          color={textColor}
          as="h1"
          fontSize={{ base: "36px", md: "60px" }}
          lineHeight="1"
        >
          {children}
        </Heading>
      ),
      h2: ({ children }) => (
        <Heading
          color={textColor}
          as="h2"
          fontSize={{ base: "32px", md: "48px" }}
          lineHeight="1"
        >
          {children}
        </Heading>
      ),
      h3: ({ children }) => (
        <Heading
          color={textColor}
          as="h3"
          fontSize={{ base: "24px", md: "36px" }}
          lineHeight="1"
        >
          {children}
        </Heading>
      ),
      h4: ({ children }) => (
        <Heading
          color={textColor}
          as="h4"
          fontSize={{ base: "20px", md: "26px" }}
          lineHeight="1.2"
        >
          {children}
        </Heading>
      ),
      largeText: ({ children }) => (
        <Heading
          fontSize={{ base: "36px", sm: "50px", md: "75px", lg: "95px" }}
          as="h1"
          color={textColor}
          variant="bigCaslon"
          lineHeight="1"
        >
          {children}
        </Heading>
      ),
    },
    marks: {
      em: ({ children }) => <i> {children} </i>,
      strong: ({ children }) => <b> {children} </b>,
      underline: ({ children }) => <u> {children} </u>,
      "strike-through": ({ children }) => <s> {children} </s>,
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

export default function BodyText({ data }) {
  const textColor = data?.textColor?.hex ? data.textColor.hex : "white"
  return (
    <Row data={data}>
      <Box
        className={styles.portableTextWrap}
        textAlign={data.textAlignment}
        width={data.sectionWidth}
        margin="0 auto"
        maxW="100%"
      >
        <PortableText
          value={data._rawContent}
          components={componentsWithColor(textColor)}
        />
      </Box>
    </Row>
  )
}
