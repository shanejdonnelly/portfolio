import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Center,
  Flex,
  Link,
  Text,
  Drawer,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Stack,
  Icon,
  useDisclosure,
} from "@chakra-ui/react"
import LogoBlue from "../../icons/logo-blue"
import {
  ArrowForwardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons"

const MobileNavItem = ({
  title,
  items,
  handle,
  isLast = false,
  closeMobileNav,
}) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={items && onToggle}>
      <Flex
        borderBottom={isLast ? "1px solid gray" : "0"}
        borderTop="1px solid gray"
        py={4}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text variant="mainNavLink" textTransform={"uppercase"}>
          {items && !!items.length ? (
            <span onClick={onToggle}>{title}</span>
          ) : (
            <Link as={GatsbyLink} to={handle ? `/collections/${handle}` : "#"}>
              {title}
            </Link>
          )}
        </Text>
        {items && !!items.length && <Icon as={ChevronRightIcon} w={6} h={6} />}
      </Flex>

      {items && !!items.length && (
        <Drawer size="full" isOpen={isOpen} onClose={onToggle} placement="left">
          <DrawerContent>
            <DrawerCloseButton
              boxSize={12}
              size={10}
              onClick={() => closeMobileNav()}
            />
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
              <Stack pl={4} align={"start"} pb={4}>
                <Flex alignItems={"center"} mb={4} ml="-24px">
                  <Icon as={ChevronLeftIcon} w={6} h={6} />
                  <Text
                    variant="mainNavLink"
                    textTransform={"uppercase"}
                    onClick={onToggle}
                  >
                    All Products
                  </Text>
                </Flex>

                <Flex alignItems={"center"} mb={4} ml="-24px">
                  <Link
                    as={GatsbyLink}
                    py={2}
                    to={`/collections/${handle}`}
                    fontWeight="700"
                    color="gray.600"
                  >
                    All {title}
                  </Link>
                  <Icon
                    as={ArrowForwardIcon}
                    w={4}
                    h={4}
                    ml={1}
                    color="gray.600"
                  />
                </Flex>

                {items &&
                  items.map((child, index) =>
                    child ? (
                      <Link
                        as={GatsbyLink}
                        color="gray.600"
                        key={`mobileNavItem_${index}`}
                        py={2}
                        to={`/collections/${handle}/${child.handle}`}
                      >
                        {child.title}
                      </Link>
                    ) : null
                  )}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Stack>
  )
}

export default MobileNavItem
