import * as React from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import PlayBtn from "./Icons/PlayBtn"
import Row from "./Row"

export default function VideoBlock({ data }) {
  const [hasClickedPlay, setHasClickedPlay] = React.useState(false)

  const mainText = data.mainText ? data.mainText : null
  const subText = data.subText ? data.subText : null
  const textAlignment = data.textAlignment ? data.textAlignment : "left"
  const textColor = data?.textColor?.hex ? data.textColor.hex : "#FFFFFF"

  const videoBgColor = data?.videoBgColor?.hex
    ? data.videoBgColor.hex
    : "#000000"

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

  const imageUrl = data.imageUrl?.asset?.url ? data.imageUrl.asset.url : ""
  const vimeoBackgroundVideoId = data.vimeoBackgroundVideoId
    ? data.vimeoBackgroundVideoId
    : false
  const vimeoVideoId = data.vimeoVideoId ? data.vimeoVideoId : false

  let shouldLoadIframe = false
  if (vimeoBackgroundVideoId) {
    shouldLoadIframe = true
  } else if (vimeoVideoId && hasClickedPlay) {
    shouldLoadIframe = true
  }

  const component = (
    <Flex flexDir="column">
      <Box
        borderTopLeftRadius={hasClickedPlay ? 0 : borderTopLeftRadius}
        borderBottomLeftRadius={hasClickedPlay ? 0 : borderBottomLeftRadius}
        borderTopRightRadius={hasClickedPlay ? 0 : borderTopRightRadius}
        borderBottomRightRadius={hasClickedPlay ? 0 : borderBottomRightRadius}
        overflow="hidden"
        aspectRatio="16/9"
        bgColor={videoBgColor}
        w="100%"
        position="relative"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundImage={hasClickedPlay ? "none" : imageUrl}
        className="VideoBlock"
      >
        {!hasClickedPlay && vimeoVideoId && (
          <Box
            position="absolute"
            top="calc(50% - 26.5px)"
            left="calc(50% - 26.5px)"
            cursor="pointer"
            opacity="0.75"
            _hover={{
              opacity: "1",
            }}
            zIndex={1}
            onClick={() => {
              setHasClickedPlay(true)
            }}
          >
            <PlayBtn />
          </Box>
        )}

        {shouldLoadIframe && (
          <Box padding="56.25% 0 0 0" position="relative">
            <iframe
              title={`Video - ${vimeoVideoId}`}
              src={`https://player.vimeo.com/video/${
                hasClickedPlay ? vimeoVideoId : vimeoBackgroundVideoId
              }?h=3ad8f7a274&autoplay=1&loop=${
                hasClickedPlay ? 0 : 1
              }&title=0&byline=0&portrait=0&background=${
                hasClickedPlay ? 0 : 1
              }`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              loading={hasClickedPlay ? "eager" : "lazy"}
            ></iframe>
          </Box>
        )}
      </Box>
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
  )

  return <Row data={data}>{component}</Row>
}
