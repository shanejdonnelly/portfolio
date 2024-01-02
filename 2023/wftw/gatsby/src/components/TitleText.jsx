import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Container, Flex, Heading, useMediaQuery } from "@chakra-ui/react"
import Row from "./Row"
import { formatColor } from "../helpers"
import * as styles from "./titleText.module.css"

export default function TitleText({ data, pageBgColor }) {
  const mainText = data.mainText ? data.mainText : ""
  const subText = data.subText ? data.subText : ""
  const textAlignment = data.textAlignment ? data.textAlignment : "left"
  const textColor = data?.textColor?.rgb
    ? data.textColor.rgb
    : { r: 0, g: 0, b: 0, a: 1 }
  const bgImageUrl = data.imageUrl?.asset?.url ? data.imageUrl.asset.url : ""
  const overlayColor = data?.overlayColor?.rgb
    ? data.overlayColor.rgb
    : { r: 0, g: 0, b: 0, a: 0 }

  const borderTopLeftRadius = data.borderTopLeftRadius
    ? { base: "30px", md: "60px" }
    : 0
  const borderTopRightRadius = data.borderTopRightRadius
    ? { base: "30px", md: "60px" }
    : 0
  const borderBottomRightRadius = data.borderBottomRightRadius
    ? { base: "30px", md: "60px" }
    : 0
  const borderBottomLeftRadius = data.borderBottomLeftRadius
    ? { base: "30px", md: "60px" }
    : 0
  const mt = data.marginTop ? data.marginTop : false

  const [isHoverDevice] = useMediaQuery("(hover: hover)")

  const component = (
    <GatsbyLink to={data.link}>
      <Box
        as={Box}
        aspectRatio="16/9"
        bgColor={pageBgColor}
        className={styles.wrap}
        w="100%"
        pos="relative"
        borderTopLeftRadius={
          isHoverDevice ? { base: "30px", md: "60px" } : { base: 0, md: "60px" }
        }
        borderBottomLeftRadius={
          isHoverDevice ? { base: "30px", md: "60px" } : { base: 0, md: "60px" }
        }
        borderTopRightRadius={
          isHoverDevice ? { base: "30px", md: "60px" } : { base: 0, md: "60px" }
        }
        borderBottomRightRadius={
          isHoverDevice ? { base: "30px", md: "60px" } : { base: 0, md: "60px" }
        }
        borderTop={
          isHoverDevice
            ? { base: "0" }
            : {
                base: `36px solid ${pageBgColor}`,
                md: `72px solid ${pageBgColor}`,
              }
        }
        mt={isHoverDevice ? { base: "-30px", md: "-60px" } : { base: "0" }}
      >
        {/* Background Image */}
        <Box
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundImage={bgImageUrl}
          borderTopLeftRadius={borderTopLeftRadius}
          borderBottomLeftRadius={borderBottomLeftRadius}
          borderTopRightRadius={borderTopRightRadius}
          borderBottomRightRadius={borderBottomRightRadius}
          w="100%"
          h="100%"
          pos="absolute"
          top={0}
          left={0}
        />

        <Box
          className={styles.touchDevice}
          background="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)"
          w="100%"
          h="25%"
          pos="absolute"
          bottom={"-2px"}
          left={0}
        />

        <Container maxW={"container.xl"} className="container">
          <Heading
            variant="titleTextMain"
            textAlign={textAlignment}
            color={formatColor(textColor)}
            className={styles.touchDevice}
            pos="absolute"
            bottom={0}
            fontSize={{ base: "28px", sm: "50px", md: "72px", lg: "116px" }}
          >
            {mainText}
          </Heading>
        </Container>

        <Box className={styles.hoverDevice} h="100%">
          <Flex
            borderTopLeftRadius={borderTopLeftRadius}
            borderBottomLeftRadius={borderBottomLeftRadius}
            borderTopRightRadius={borderTopRightRadius}
            borderBottomRightRadius={borderBottomRightRadius}
            height="100%"
            bg={formatColor(overlayColor)}
            className={styles.titleWrap}
            flexDir={"column"}
            justifyContent="center"
            p="5%"
            pos="relative"
            zIndex={2}
          >
            <Container maxW={"container.xl"}>
              <Heading
                variant="titleTextMain"
                textAlign={textAlignment}
                color={formatColor(textColor)}
                fontSize={{ base: "28px", sm: "50px", md: "72px", lg: "116px" }}
              >
                {mainText}
              </Heading>
              <Heading
                variant="titleTextSub"
                textAlign={textAlignment}
                color={formatColor(textColor)}
                fontSize={{ base: "28px", sm: "50px", md: "72px", lg: "116px" }}
              >
                {subText}
              </Heading>
            </Container>
          </Flex>
        </Box>
      </Box>
      <Box width="100%" className={styles.touchDevice} bg="black">
        <Container maxW={"container.xl"}>
          <Heading
            bg="black"
            className={styles.touchDevice}
            variant="titleTextSub"
            textAlign={textAlignment}
            color={formatColor(textColor)}
            fontSize={{ base: "28px", sm: "50px", md: "72px", lg: "116px" }}
          >
            {subText}
          </Heading>
        </Container>
      </Box>
    </GatsbyLink>
  )

  return <Row data={data}>{component}</Row>
}
