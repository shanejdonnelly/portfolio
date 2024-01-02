import * as React from "react"
import { Box, Flex } from "@chakra-ui/react"

export default function SplitBg({
  bgColorBottom,
  bgColorTop,
  splitGradientBg = null,
}) {
  return splitGradientBg ? (
    <Flex
      pos="absolute"
      left="0"
      top="0"
      width="100%"
      height="100%"
      flexDir="column"
      zIndex={-1}
      className="SplitBg"
    >
      <Box flex="0 0 100%" bg={splitGradientBg} />
    </Flex>
  ) : (
    <Flex
      pos="absolute"
      left="0"
      top="0"
      width="100%"
      height="100%"
      flexDir="column"
      zIndex={-1}
      className="SplitBg"
    >
      <Box flex={{ base: "0 0 60%", sm: "0 0 50%" }} bgColor={bgColorTop} />
      <Box flex={{ base: "0 0 40%", sm: "0 0 50%" }} bgColor={bgColorBottom} />
    </Flex>
  )
}
