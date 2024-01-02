import * as React from "react"
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"

export default function ImageBlock({ data }) {
  const mainText = data.mainText ? data.mainText : null
  const subText = data.subText ? data.subText : null
  const textAlignment = data.textAlignment ? data.textAlignment : "left"
  const textColor = data?.textColor?.hex ? data.textColor.hex : "#FFFFFF"

  const aspectRatio = data.aspectRatio ? data.aspectRatio : "1"
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

  const gImage = data.imageUrl?.asset?.gatsbyImageData
    ? data.imageUrl.asset.gatsbyImageData
    : null

  const marginTop = data?.marginTop ? `${data.marginTop}%` : 0

  return gImage ? (
    <Flex flexDir="column">
      <Image
        as={GatsbyImage}
        borderTopLeftRadius={borderTopLeftRadius}
        borderBottomLeftRadius={borderBottomLeftRadius}
        borderTopRightRadius={borderTopRightRadius}
        borderBottomRightRadius={borderBottomRightRadius}
        aspectRatio={aspectRatio}
        image={gImage}
        alt={"alt text"}
        mt={{ base: 0, md: marginTop }}
      />
      {mainText && (
        <Heading
          textAlign={textAlignment}
          mt="16px"
          color={textColor}
          fontSize="26px"
          fontWeight={700}
          textTransform="uppercase"
        >
          {mainText}
        </Heading>
      )}
      {subText && (
        <Text textAlign={textAlignment} color={textColor} fontSize="26px">
          {subText}
        </Text>
      )}
    </Flex>
  ) : null
}
