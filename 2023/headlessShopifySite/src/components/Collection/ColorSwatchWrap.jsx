import * as React from "react"
import ProductColorSwatch from "./ProductColorSwatch"
import { Flex, Icon, useBreakpointValue } from "@chakra-ui/react"
import { FaChevronDown } from "react-icons/fa"

export default function ColorSwatchWrap({
  activeColor,
  colorSwatchImages,
  handleColorChange,
  vendorColorNames,
}) {
  const isMobile = useBreakpointValue({ base: true, sm: false })

  const [isExpanded, setIsExpanded] = React.useState(false)
  const initialColorNames = isMobile
    ? vendorColorNames.slice(0, 4)
    : vendorColorNames.slice(0, 6)
  const hasMore = initialColorNames.length < vendorColorNames.length

  const colorNames = isExpanded ? [...vendorColorNames] : [...initialColorNames]

  return (
    <Flex
      alignItems="center"
      flexWrap={isExpanded ? "wrap" : "nowrap"}
      maxH={isExpanded ? "auto" : "30px"}
    >
      {colorNames.map((color, index) => (
        <ProductColorSwatch
          isActiveColor={color === activeColor}
          color={color}
          handleColorChange={handleColorChange}
          key={`colorSwatch_${index}`}
          colorSwatchImage={colorSwatchImages[index]}
        />
      ))}
      {hasMore && !isExpanded && (
        <Icon
          as={FaChevronDown}
          color="black"
          cursor="pointer"
          h="30px"
          px={2}
          onClick={() => setIsExpanded(true)}
          w="30px"
          _hover={{
            color: "gray.500",
          }}
        />
      )}
    </Flex>
  )
}
