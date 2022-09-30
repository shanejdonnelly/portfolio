import * as React from "react"
import { Box, Tooltip } from "@chakra-ui/react"

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

  return (
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
        backgroundImage={colorSwatchImage}
        backgroundSize="cover"
        backgroundColor={colorCodes[color.toLowerCase()]}
        onClick={() => {
          if (isActiveColor) {
            //do nothing
          } else {
            handleColorChange(color)
          }
        }}
      >
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
