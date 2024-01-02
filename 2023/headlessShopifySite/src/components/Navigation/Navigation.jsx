import * as React from "react"
import { Link as GatsbyLink, graphql, useStaticQuery } from "gatsby"
import LogoBlue from "../../icons/logo-blue"
import SearchInput from "../Inputs/SearchInput"
import MobileSearch from "../Search/MobileSearch"
import CartLink from "./CartLink"
import { BsPerson as PersonIcon } from "react-icons/bs"
import {
  Box,
  Center,
  Container,
  Flex,
  Icon,
  Link,
  IconButton,
  VStack,
  Drawer,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"
import AccountLink from "./AccountLink"

export default function Navigation({ gatsbyLocation }) {
  const [searchValue, setSearchValue] = React.useState(null)
  const data = useStaticQuery(graphql`
    query {
      allSanityMenu {
        nodes {
          title
          handle
          items {
            handle
            title
          }
          mainImage {
            asset {
              altText
              url
            }
          }
          _rawDescription(resolveReferences: { maxDepth: 5 })
          shopLink
          sortOrder
          visible
        }
      }
    }
  `)

  const { isOpen, onToggle } = useDisclosure()

  const sanityMenu = data.allSanityMenu.nodes.filter((node) => node.visible)

  return (
    <>
      <Box w="100%" borderBottom={1} borderColor="gray.200" borderStyle="solid">
        <Container maxW={"container.xl"}>
          <VStack>
            <Flex
              justifyContent="space-between"
              py={2}
              w="100%"
              alignItems={"center"}
            >
              <IconButton
                onClick={onToggle}
                display={{ base: "block", lg: "none" }}
                icon={<HamburgerIcon w={6} h={6} />}
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />

              <Link as={GatsbyLink} to="/">
                <Box w={{ base: "150px", md: "200px" }}>
                  <LogoBlue />
                </Box>
              </Link>

              <Box display={{ base: "none", lg: "block" }}>
                <SearchInput
                  placeholder={"Search the entire site..."}
                  value={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Box>

              <Flex alignItems={"center"}>
                <Link
                  href="https://shop.portandbay.com/account"
                  mr={3}
                  display={{ base: "none", sm: "inline-block" }}
                >
                  <Icon as={PersonIcon} w={6} h={6} />
                </Link>

                <Box display={{ base: "inline-block", lg: "none" }}>
                  <MobileSearch
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                </Box>

                <Link as={GatsbyLink} to="/cart">
                  <CartLink />
                </Link>
              </Flex>
            </Flex>

            <Box display={{ base: "none", lg: "block" }} w="100%">
              <DesktopNav
                menuData={sanityMenu}
                gatsbyLocation={gatsbyLocation}
              />
            </Box>
          </VStack>
        </Container>
      </Box>

      <Drawer size="full" isOpen={isOpen} onClose={onToggle} placement="left">
        <DrawerContent>
          <DrawerCloseButton boxSize={12} size={10} />
          <DrawerHeader>
            <Center>
              <Link as={GatsbyLink} to="/">
                <Box w={{ base: "150px", md: "200px" }}>
                  <LogoBlue />
                </Box>
              </Link>
            </Center>
          </DrawerHeader>
          <DrawerBody>
            <MobileNav
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              menuData={sanityMenu}
              closeMobileNav={onToggle}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
