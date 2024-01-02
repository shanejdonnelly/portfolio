import * as React from "react"
import { navigate } from "gatsby"
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react"

const Hero = ({
  backgroundImageOverlayColor = "#fbf9f7",
  backgroundImageUrl = "",
  textAboveHeading = "",
  heading = "",
  textBelowHeading = "",
  buttonLink = "",
  buttonText = "Shop Now",
  desktopHeight = "70vh",
  mobileHeight = "50vh",
  textColor = "#444",
  minHeight = "200px",
}) => {
  return (
    <Box
      bg="#F1EDE9"
      border={{
        base: "0",
        md: "24px solid #F1EDE9",
        lg: "36px solid #F1EDE9",
        xl: "64px solid #F1EDE9",
      }}
    >
      <Container maxW={"container.xl"} px={0}>
        <Flex bg="#F1EDE9" flexDir={{ base: "column-reverse", md: "row" }}>
          <Flex
            flex={{ base: "0 0 100%", md: "1 1 50%", lg: "1 1 43%" }}
            bg="white"
            alignItems="center"
          >
            <Flex
              flexDir="column"
              w={{ base: "100%" }}
              px={{ base: 8, md: 8 }}
              alignItems="flex-start"
              mx={{ base: "auto", md: 0 }}
            >
              <Text
                color={textColor}
                fontSize="12px"
                fontWeight={700}
                mb={{ base: 1, xl: 3 }}
                mt={{ base: 8, sm: 10, md: 0 }}
                textAlign={{ base: "center", md: "left" }}
                textTransform={"uppercase"}
                w="100%"
              >
                {textAboveHeading}
              </Text>
              <Heading
                color={textColor}
                as="h1"
                fontWeight={400}
                fontSize={{
                  base: "32px",
                  sm: "36px",
                  md: "32px",
                  lg: "36px",
                  xl: "48px",
                }}
                lineHeight={{ base: "48px", sm: "48px", md: "60px" }}
                mb={{ base: 2, md: 1, xl: 3 }}
                textAlign={{ base: "center", md: "left" }}
                w="100%"
              >
                {heading}
              </Heading>
              <Text
                color={textColor}
                mb={{ base: 3, md: 1, xl: 3 }}
                fontSize={{ base: "14px", xl: "16px" }}
                textAlign={{ base: "center", md: "left" }}
                w="100%"
              >
                {textBelowHeading}
              </Text>
              {buttonLink && !!buttonLink.length && (
                <Button
                  mt={{ base: 2, md: 3, xl: 4 }}
                  onClick={() => navigate(buttonLink)}
                  variant="heroOutline"
                  px={8}
                  fontWeight="700"
                  mb={{ base: 8, sm: 10, md: 0 }}
                  mx={{ base: "auto", md: "0" }}
                >
                  {buttonText}
                </Button>
              )}
            </Flex>
          </Flex>
          <Box flex={{ base: "0 0 100%", md: "1 1 50%", lg: "1 1 57%" }}>
            <Box
              h={{ base: "350px", md: "472px" }}
              backgroundImage={`url(${backgroundImageUrl})`}
              backgroundSize={"cover"}
              backgroundPosition={"center center"}
            ></Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Hero
