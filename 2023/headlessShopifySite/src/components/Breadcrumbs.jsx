import * as React from "react"
import { Link } from "gatsby"
import { StoreContext } from "../context/store-context"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
} from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"

//pathBits shape is ['curtains-drapes', 'cafe-tier-curtains']
const Breadcrumbs = ({ menuData, pathBits = [] }) => {
  const { updateActiveCollection } = React.useContext(StoreContext)

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
        link = `/collections/${parentItem.handle}`
      }
    })
    //not there, so loop through children
    if (!link) {
      menuData.nodes.forEach((parentItem) => {
        parentItem.items.forEach((item) => {
          if (item.handle === handle) {
            link = `/collections/${parentItem.handle}/${item.handle}`
          }
        })
      })
    }
    return link
  }

  //
  updateActiveCollection(pathBits[0])

  return (
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
  )
}

export default Breadcrumbs
