import * as React from "react"
import { Box } from "@chakra-ui/react"

export default function Overlay({ onClick, bg }) {
  return (
    <Box
      background={bg}
      height="100vh"
      left="0"
      position="fixed"
      onClick={onClick}
      top="0"
      width="100vw"
    />
  )
}
