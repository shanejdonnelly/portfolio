import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Flex, Heading, Link } from "@chakra-ui/react"
import Row from "./Row"

export default function Breadcrumbs({ data }) {
  const crumbs = data?.crumbs && !!data.crumbs.length ? data.crumbs : []

  const color = data?.textColor?.hex ? data.textColor.hex : "white"

  const renderCrumb = (c, index) => {
    const heading = (
      <Heading
        key={`crumb_${index}`}
        color={color}
        fontSize="14px"
        fontWeight={c.isBold ? "700" : "400"}
        pr={2}
        textTransform={c.isUppercase ? "uppercase" : "none"}
      >
        {c.title}
      </Heading>
    )
    if (c.url) {
      return (
        <Link as={GatsbyLink} to="/" variant="breadcrumb">
          {heading}
        </Link>
      )
    } else {
      return heading
    }
  }

  const renderDot = () => (
    <Heading color={color} fontSize="14px" pr={2}>
      •
    </Heading>
  )
  return (
    <Row data={data}>
      <Flex w="100%" flexWrap="nowrap" alignItems="center">
        <Flex flex="0 0 auto" alignItems="center">
          {crumbs.map((c, index) => {
            const crumb = renderCrumb(c, index)
            const dot = c.hasDotAfter ? renderDot() : null
            if (dot) {
              return (
                <React.Fragment key={`crumbFragment_${index}`}>
                  {crumb}
                  {dot}
                </React.Fragment>
              )
            } else {
              return crumb
            }
          })}
        </Flex>
        <Box borderTop={`1px solid ${color}`} flex="1 0 auto"></Box>
      </Flex>
    </Row>
  )
}
