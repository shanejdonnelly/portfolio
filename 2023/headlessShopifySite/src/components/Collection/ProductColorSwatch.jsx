import * as React from "react"
import { Box, Image, Tooltip, useBreakpointValue } from "@chakra-ui/react"

const ProductColorSwatch = ({
  isActiveColor,
  color,
  handleColorChange,
  colorSwatchImage,
}) => {
  const colorCodes = {
    black: "#333",
    blue: "#3588ff",
    brown: "#83584a",
    gray: "#acacac",
    green: "#549848",
    natural: "#faf3dc",
    orange: "#ed8d2d",
    pink: "#f8c4c4",
    purple: "#9668a2",
    red: "#ec4646",
    white: "#fdfdfd",
    yellow: "#efd36a",
  }

  //tooltip creates double click issue on mobile, see issue #37
  const screen = useBreakpointValue({
    base: "mobile",
    lg: "desktop",
  })

  return screen === "mobile" ? (
    <Box
      m="3px"
      title={`Change color to ${color}`}
      position="relative"
      border={isActiveColor ? "1px solid #777" : "1px solid #ccc"}
      cursor="pointer"
      h="24px"
      w="24px"
      borderRadius="50%"
      onClick={() => {
        if (isActiveColor) {
          //do nothing
        } else {
          handleColorChange(color)
        }
      }}
    >
      <Image
        alt={`Change color to ${color}`}
        src={colorSwatchImage}
        objectFit={"cover"}
        position="absolute"
        borderRadius="50%"
        h="22px"
        w="22px"
        top="0"
        left="0"
        border="0"
      />
      {isActiveColor && (
        <Box
          position="absolute"
          borderRadius="50%"
          h="30px"
          w="30px"
          top="-4px"
          left="-4px"
          border="2px solid #888"
        ></Box>
      )}
    </Box>
  ) : (
    <Tooltip label={color} placement="top" bgColor="darkblue" color="white">
      <Box
        m="3px"
        title={`Change color to ${color}`}
        position="relative"
        border={isActiveColor ? "1px solid #777" : "1px solid #ccc"}
        cursor="pointer"
        h="24px"
        w="24px"
        borderRadius="50%"
        onClick={() => {
          if (isActiveColor) {
            //do nothing
          } else {
            handleColorChange(color)
          }
        }}
      >
        <Image
          alt={`Change color to ${color}`}
          src={colorSwatchImage}
          objectFit={"cover"}
          position="absolute"
          borderRadius="50%"
          h="22px"
          w="22px"
          top="0"
          left="0"
          border="0"
        />
        {isActiveColor && (
          <Box
            position="absolute"
            borderRadius="50%"
            h="30px"
            w="30px"
            top="-4px"
            left="-4px"
            border="2px solid #888"
          ></Box>
        )}
      </Box>
    </Tooltip>
  )
}
export default ProductColorSwatch
