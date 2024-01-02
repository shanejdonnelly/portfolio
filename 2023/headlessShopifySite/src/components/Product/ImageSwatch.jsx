import * as React from "react"
import { Box, Image, Tooltip, useBreakpointValue } from "@chakra-ui/react"

export default function ImageSwatch({
  option,
  srcSet,
  opacity,
  optionIsActive,
  handleOptionChange,
  optionIsAvailable,
}) {
  //tooltip creates double click issue on mobile, see issue #37
  const screen = useBreakpointValue({
    base: "mobile",
    lg: "desktop",
  })

  return (
    <Box
      pos="relative"
      mx={3}
      my={3}
      _hover={
        optionIsAvailable
          ? {
              _before: {
                border: "2px solid",
                borderColor: "black",
                position: "absolute",
                height: "50px",
                width: "50px",
                top: "-6px",
                left: "-6px",
                borderRadius: "50%",
                content: "''",
                zIndex: "1",
              },
            }
          : null
      }
    >
      {screen === "mobile" ? (
        <Image
          title={option}
          alt={option}
          borderRadius="full"
          position="relative"
          zIndex="2"
          srcSet={srcSet}
          boxSize="38px"
          opacity={opacity}
          onClick={() => {
            handleOptionChange("Vendor Color Name", option)
          }}
        />
      ) : (
        <Tooltip
          label={option}
          placement="top"
          bgColor="darkblue"
          color="white"
        >
          <Image
            alt={option}
            borderRadius="full"
            position="relative"
            zIndex="2"
            srcSet={srcSet}
            boxSize="38px"
            opacity={opacity}
            onClick={() => {
              handleOptionChange("Vendor Color Name", option)
            }}
          />
        </Tooltip>
      )}
      {!optionIsAvailable ? (
        <Box
          width="44px"
          borderBottom="1px solid"
          borderColor="gray-700"
          transform="rotate(135deg)"
          transformOrigin="center"
          position="absolute"
          top="18px"
          height="9px"
          opacity="0.35"
        ></Box>
      ) : null}

      {optionIsActive("Vendor Color Name", option) ? (
        <Box
          border="2px solid"
          borderColor="black"
          borderRadius="full"
          position="absolute"
          top="-6px"
          left="-6px"
          boxSize="50px"
        ></Box>
      ) : null}
    </Box>
  )
}
