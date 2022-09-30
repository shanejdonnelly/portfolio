import * as React from "react"
import { Box, Icon, Text, VStack } from "@chakra-ui/react"
import { BsCheck } from "react-icons/bs"

const SidebarColorSwatch = ({ color, colorArray, handleFilterChange }) => {
  const colorSelected = colorArray.includes(color)
  const colorFamilies = {
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
    <VStack spacing="2px" flex="0 0 25%" mb="12px">
      <Box
        border="1px solid #ccc"
        cursor="pointer"
        h={9}
        w={9}
        borderRadius="50%"
        backgroundColor={colorFamilies[color.toLowerCase()]}
        onClick={() => {
          if (colorSelected) {
            const _colorArray = colorArray.filter((c) => c !== color)
            handleFilterChange("color", _colorArray)
          } else {
            handleFilterChange("color", [...colorArray, color])
          }
        }}
      >
        {colorSelected && <Icon as={BsCheck} w={9} h={9} color="gray.500" />}
      </Box>
      <Text fontSize={"11px"}>{color}</Text>
    </VStack>
  )
}
export default SidebarColorSwatch
