import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Flex, Link, VStack, useColorModeValue } from "@chakra-ui/react"
import SearchInput from "../Inputs/SearchInput"
import MobileNavItem from "./MobileNavItem"

const MobileNav = ({ menuData, closeMobileNav }) => {
  const data = menuData.sort((a, b) => a.sortOrder - b.sortOrder)
  return (
    <Flex
      bg={useColorModeValue("white", "gray.800")}
      display={{ lg: "none" }}
      flexDir="column"
      pt={2}
    >
      {data.map((collection, index) => (
        <MobileNavItem
          isLast={index + 1 === data.length}
          key={`mobileNav_${index}`}
          closeMobileNav={closeMobileNav}
          {...collection}
        />
      ))}
      <Flex>
        <VStack spacing={4} mt={8} flex="0 0 50%">
          <Link to="/about-us" as={GatsbyLink} variant="mobileNavSmallLink">
            About Us
          </Link>
          <Link to={"/resources"} as={GatsbyLink} variant="mobileNavSmallLink">
            Resources
          </Link>
          <Link to="/contact-us" as={GatsbyLink} variant="mobileNavSmallLink">
            Contact Us
          </Link>
          <Link href={"#"} variant="mobileNavSmallLink">
            My Account
          </Link>
          <Link to={"/faq"} as={GatsbyLink} variant="mobileNavSmallLink">
            FAQ
          </Link>
        </VStack>

        <VStack spacing={4} mt={8} flex="0 0 50%">
          <Link to="/stores" as={GatsbyLink} variant="mobileNavSmallLink">
            Stores
          </Link>
          <Link href={"/news"} variant="mobileNavSmallLink">
            News
          </Link>
          <Link
            to="/ordering-information"
            as={GatsbyLink}
            variant="mobileNavSmallLink"
          >
            Ordering Information
          </Link>

          <Link
            as={GatsbyLink}
            to={"/shipping-returns"}
            variant="mobileNavSmallLink"
          >
            Shipping & Returns
          </Link>
        </VStack>
      </Flex>
    </Flex>
  )
}

export default MobileNav
