import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import Logo from "../../icons/logo"
import NewsletterInput from "../Inputs/NewsletterInput"
import { FaPinterestP, FaFacebookF, FaInstagram } from "react-icons/fa"
import {
  Box,
  Container,
  Heading,
  Flex,
  Icon,
  Link,
  Grid,
  GridItem,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"

export default function Footer() {
  return (
    <Box bg={"darkblue"} color={"white"}>
      <Container maxW={"container.xl"} py={10}>
        <Flex
          justifyContent={{ base: "center", md: "space-between" }}
          flexWrap="wrap"
        >
          <VStack flex="0 0 320px">
            <Box w="170px" alignSelf={{ base: "center", md: "flex-start" }}>
              <Logo />
            </Box>
            <VStack maxW={"100%"} spacing={3}>
              <Heading
                color="white"
                variant={"xsUpper"}
                width={"100%"}
                textAlign="left"
                mt={{ base: 4, md: 0 }}
              >
                Sign Up For Our Newsletter
              </Heading>
              <Text fontSize={"xs"} width={"100%"} color="white">
                Stay up-to-date on all of our news, sales and design tips.
              </Text>
              <NewsletterInput />
            </VStack>
          </VStack>

          <Flex
            justifyContent={"space-around"}
            flex={{ base: "0 0 100%", md: "0 0 40%" }}
            mt={{ base: 12, md: 0 }}
          >
            <Stack align={"flex-start"}>
              <Heading mb={2} variant={"xsUpper"} color={"white"}>
                Company
              </Heading>
              <Link to="/about-us" as={GatsbyLink}>
                About Us
              </Link>
              <Link to="/stores" as={GatsbyLink}>
                Stores
              </Link>
              <Link to={"/resources"} as={GatsbyLink}>
                Resources
              </Link>
              <Link href={"/news"}>News</Link>
            </Stack>

            <Stack align={"flex-start"}>
              <Heading mb={2} variant={"xsUpper"} color={"white"}>
                Customer Service
              </Heading>
              <Link href={"tel:18332665773"}>1-833-266-5773</Link>
              <Link to="/contact-us" as={GatsbyLink}>
                Contact Us
              </Link>
              <Link to={"/faq"} as={GatsbyLink}>
                FAQ
              </Link>
              <Link href={"https://shop.morgandonnelly.com/account"}>
                My Account
              </Link>
              <Link as={GatsbyLink} to={"/shipping-returns"}>
                Shipping & Returns
              </Link>
              <Link to="/ordering-information" as={GatsbyLink}>
                Ordering Information
              </Link>
            </Stack>
          </Flex>
        </Flex>
      </Container>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        borderTop="1px solid white"
        px={10}
        py={4}
      >
        <Box>
          <Text fontSize={"11px"} color="white">
            © {new Date().getFullYear()} Port & Bay. All Rights Reserved.
            <Link
              to="/privacy-policy"
              as={GatsbyLink}
              ml={{ base: 0, sm: 4 }}
              mt={{ base: 2, sm: 0 }}
              display={{ base: "block", sm: "inline" }}
            >
              Privacy Policy
            </Link>
          </Text>
        </Box>
        <Box>
          <Icon as={FaFacebookF} w={5} h={5} color="white" />
          <Icon as={FaPinterestP} w={5} h={5} ml={4} color="white" />
          <Icon as={FaInstagram} w={5} h={5} ml={4} color="white" />
        </Box>
      </Flex>
    </Box>
  )
}
