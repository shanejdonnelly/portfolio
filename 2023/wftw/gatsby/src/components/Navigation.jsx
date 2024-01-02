import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { throttle } from "../helpers"
import NavLogo from "./Icons/NavLogo"
import Hamburger from "./Icons/Hamburger"
import WftwTextLogoLarge from "./Icons/WftwTextLogoLarge"
import WftwTextLogoSmall from "./Icons/WftwTextLogoSmall"
import {
  Box,
  Center,
  Container,
  Drawer,
  DrawerContent,
  DrawerBody,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  VStack,
  useDisclosure,
  textDecoration,
} from "@chakra-ui/react"

export default function Navigation({ gatsbyLocation, navTextColor }) {
  const { isOpen, onToggle } = useDisclosure()

  function isActive(path) {
    return gatsbyLocation?.pathname.includes(path) ? true : false
  }

  const ActiveLink = {
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  }

  //watch for window resize and close Drawer
  React.useEffect(() => {
    const handleResize = throttle(() => {
      if (isOpen) {
        onToggle()
      }
    }, 300)

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen])

  return (
    <>
      <Box
        w="100%"
        bg={isOpen ? "white" : "transparent"}
        zIndex={9999}
        h={{ base: "auto", md: "94px" }}
        display="flex"
        alignItems="center"
      >
        <Container maxW={"container.xl"} pos="relative">
          <Center
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            h="100%"
          >
            <Link
              display={{ base: "none", lg: "block" }}
              as={GatsbyLink}
              to="/"
              _hover={{ textDecoration: "none" }}
            >
              <WftwTextLogoLarge color={isOpen ? "black" : navTextColor} />
            </Link>

            <Link
              display={{ base: "block", lg: "none" }}
              as={GatsbyLink}
              to="/"
              _hover={{ textDecoration: "none" }}
            >
              <WftwTextLogoSmall color={isOpen ? "black" : navTextColor} />
            </Link>
          </Center>

          <Flex
            justifyContent="space-between"
            py={4}
            w="100%"
            alignItems={"center"}
          >
            <Link as={GatsbyLink} to="/">
              <Box>
                <NavLogo navTextColor={isOpen ? "black" : navTextColor} />
              </Box>
            </Link>

            {/** MOBILE HAMBURGER */}
            <IconButton
              bg="transparent"
              _hover={{
                bg: "transparent",
              }}
              onClick={onToggle}
              display={{ base: "block", lg: "none" }}
              icon={
                <Hamburger
                  strokeColor={isOpen ? "black" : navTextColor}
                  w={6}
                  h={6}
                  isOpen={isOpen}
                />
              }
              aria-label={"Toggle Navigation"}
            />
            {/** END MOBILE HAMBURGER */}

            {/** DESKTOP */}
            <Flex alignItems={"center"} display={{ base: "none", lg: "block" }}>
              <Link
                to="/work"
                as={GatsbyLink}
                color={navTextColor}
                variant="desktopNav"
                style={isActive("work") ? ActiveLink : {}}
              >
                Work
              </Link>

              <Link
                to="/about"
                color={navTextColor}
                as={GatsbyLink}
                variant="desktopNav"
                style={isActive("about") ? ActiveLink : {}}
              >
                About
              </Link>

              <Link
                to="/contact"
                color={navTextColor}
                as={GatsbyLink}
                variant="desktopNav"
                style={isActive("contact") ? ActiveLink : {}}
              >
                Contact
              </Link>
            </Flex>
            {/** END DESKTOP */}
          </Flex>
        </Container>
      </Box>

      <Drawer size="full" isOpen={isOpen} onClose={onToggle} placement="top">
        <DrawerContent>
          <DrawerBody pt={"150px"}>
            <VStack spacing={12}>
              <VStack spacing={6}>
                <Link
                  to="/work"
                  as={GatsbyLink}
                  variant="mobileNav"
                  className={isActive("work")}
                >
                  Work
                </Link>

                <Link
                  to="/about"
                  as={GatsbyLink}
                  variant="mobileNav"
                  className={isActive("about")}
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  as={GatsbyLink}
                  variant="mobileNav"
                  className={isActive("contact")}
                >
                  Contact
                </Link>
              </VStack>

              <Flex alignItems={"center"}>
                <Link
                  href="https://www.instagram.com/wordsftwoods"
                  title="Words from the Woods - Instagram"
                  fontSize="24px"
                  mr="18px"
                  target="_blank"
                >
                  Instagram
                </Link>

                <Link
                  href="https://www.linkedin.com/company/words-from-the-woods-llc"
                  title="Words from the Woods - LinkedIn"
                  fontSize="24px"
                  ml="18px"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </Flex>

              <Flex
                alignItems={"center"}
                justifyContent="space-around"
                w="100%"
              >
                <Box>
                  <Text>New Business</Text>
                  <Link
                    href="mailto:meranne@wftw.me"
                    title="New Business Email"
                    target="_blank"
                  >
                    meranne@wftw.me
                  </Link>
                </Box>

                <Box>
                  <Text>General Inquiries</Text>
                  <Link
                    href="mailto:hello@wftw.me"
                    title="General Inquiries Email"
                    target="_blank"
                  >
                    hello@wftw.me
                  </Link>
                </Box>
              </Flex>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
