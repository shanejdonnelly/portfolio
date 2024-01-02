import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Container, Flex, Link, Stack, Text } from "@chakra-ui/react"
import FooterLogo from "../Icons/FooterLogo"

export default function Footer({ images, footerLinks, footerText }) {
  return (
    <Box bg={"black"} color={"white"}>
      <Container maxW={"container.xl"} py={10}>
        <Flex
          alignItems="center"
          justifyContent={{ base: "center", md: "space-between" }}
          flexWrap="wrap"
        >
          {/** Left */}
          <Flex
            flex={{ base: "0 0 100%", md: "0 0 33.33%" }}
            justifyContent={{ base: "center", md: "flex-start" }}
            mb={{ base: "36px", md: "0" }}
          >
            <Box flex="0 0 100%" maxW="218px">
              <Text
                color="white"
                fontSize="18px"
                fontWeight="700"
                lineHeight="22px"
                textAlign={{ base: "left" }}
              >
                {footerText}
              </Text>
            </Box>
          </Flex>

          {/** Middle */}
          <Flex
            flex={{ base: "0 0 100%", md: "0 0 33.33%" }}
            justifyContent="center"
            mb={{ base: "36px", md: "0" }}
          >
            <Link as={GatsbyLink} to="/">
              <FooterLogo images={images} />
            </Link>
          </Flex>

          {/** Right */}
          <Flex flex={{ base: "0 0 100%", md: "0 0 33.33%" }}>
            <Stack align={{ base: "center", md: "flex-end" }} flex="1">
              {footerLinks &&
                !!footerLinks.length &&
                footerLinks.map((f, index) =>
                  !f.link.startsWith("/") && !f.link.includes("wftw") ? (
                    <Link
                      fontWeight={f.fontWeight}
                      href={f.link}
                      isExternal
                      key={`footerLink-${index}`}
                    >
                      {f.text}
                    </Link>
                  ) : (
                    <Link
                      fontWeight={f.fontWeight}
                      as={GatsbyLink}
                      to={f.link}
                      key={`footerLink-${index}`}
                    >
                      {f.text}
                    </Link>
                  )
                )}
            </Stack>
          </Flex>
        </Flex>
      </Container>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </Box>
  )
}
