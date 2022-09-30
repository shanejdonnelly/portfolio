import * as React from "react"
import { Link } from "gatsby"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
} from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"

const Breadcrumbs = ({ menuData, gatsbyLocation }) => {
  //break location into array and get rid of first and section section, which are '' and 'shop'
  const pathBits = gatsbyLocation.pathname.split("/")
  pathBits.shift()
  pathBits.shift()

  const getTitle = function (handle) {
    let title = null
    //check top level first
    menuData.nodes.forEach((parentItem) => {
      if (parentItem.handle === handle) {
        title = parentItem.title
      }
    })
    //not there, so loop through children
    if (!title) {
      menuData.nodes.forEach((parentItem) => {
        parentItem.items.forEach((item) => {
          if (item.handle === handle) {
            title = item.title
          }
        })
      })
    }
    return title
  }

  const getLink = function (handle) {
    let link = null
    //check top level first
    menuData.nodes.forEach((parentItem) => {
      if (parentItem.handle === handle) {
        link = `/shop/${parentItem.handle}`
      }
    })
    //not there, so loop through children
    if (!link) {
      menuData.nodes.forEach((parentItem) => {
        parentItem.items.forEach((item) => {
          if (item.handle === handle) {
            link = `/shop/${parentItem.handle}/${item.handle}`
          }
        })
      })
    }
    return link
  }

  return (
    <Container maxW={"container.xl"}>
      <Breadcrumb
        spacing="4px"
        separator={<ChevronRightIcon color="gray.500" />}
        mt={4}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathBits.map((bit, index) => (
          <BreadcrumbItem key={`crumb_${index}`}>
            <BreadcrumbLink as={Link} to={getLink(bit)}>
              {getTitle(bit)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Container>
  )
}

export default Breadcrumbs
