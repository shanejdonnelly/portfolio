import * as React from "react"
import { Link as GatsbyLink, navigate } from "gatsby"
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react"

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
    <Box position={"relative"}>
      <Flex
        backgroundColor={backgroundImageOverlayColor}
        opacity={"0.5"}
        position="absolute"
        w={"full"}
        h={{ base: mobileHeight, md: desktopHeight }}
        zIndex="2"
        minH={minHeight}
      ></Flex>
      <Flex
        w={"full"}
        minH={minHeight}
        h={{ base: mobileHeight, md: desktopHeight }}
        backgroundImage={`url(${backgroundImageUrl})`}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        position="absolute"
        zIndex={"1"}
      ></Flex>
      <Flex
        w={"full"}
        minH={minHeight}
        h={{ base: mobileHeight, md: desktopHeight }}
        position="relative"
        zIndex={"3"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={`linear(to-r, ${backgroundImageOverlayColor}, transparent)`}
        >
          <Text
            color={textColor}
            textTransform={"uppercase"}
            textAlign={"center"}
            fontSize="12px"
            fontWeight={700}
            pb={1}
          >
            {textAboveHeading}
          </Text>
          <Heading
            color={textColor}
            as="h1"
            fontWeight={400}
            fontSize={{base: '36px', sm: '48px', md: '60px'}}
            lineHeight={{base: '36px', sm: '48px', md: '60px'}}
            pb={4}
          >
            {heading}
          </Heading>

          <Text color={textColor} fontSize="16px" textAlign={"center"}>
            {textBelowHeading}
          </Text>
          {buttonLink && !!buttonLink.length && (
            <Button
              bg={"darkblue"}
              color={"white"}
              fontSize="13px"
              onClick={() => navigate(buttonLink)}
              position="relative"
              px={8}
              textTransform="uppercase"
              top="24px"
            >
              {buttonText}
            </Button>
          )}
        </VStack>
      </Flex>
    </Box>
  )
}

export default Hero
