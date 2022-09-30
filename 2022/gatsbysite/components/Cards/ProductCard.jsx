import * as React from "react"
import { navigate } from "gatsby"
import { Button, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { formatPrice } from "../../utils/format-price"

export default function ProductCard({
  imageSrc = "",
  title = "",
  titleAlign = "center",
  titleSize = "lg",
  description = "",
  link = "",
  showButton = true,
  maxPrice = null,
  minPrice = null,
  buttonColor = "gray",
  buttonTextColor = "white",
  buttonText = "Shop Now",
  buttonVariant = "outline",
  roundImage = false,
  width = "300px",
}) {
  return (
    <VStack spacing={4} flex={`0 0 ${width}`} mb={16} mx={4}>
      <Image
        borderRadius={roundImage ? "full" : "none"}
        boxSize={width}
        objectFit="cover"
        src={imageSrc}
        alt={title}
      />
      <Heading as="h3" fontSize="26px" px={6} textAlign={titleAlign}>
        {title}
      </Heading>
      {!!description.length && (
        <Text px={6} textAlign="center">
          {description}
        </Text>
      )}
      {showButton && (
        <Button
          color={buttonTextColor}
          borderColor={buttonColor}
          backgroundColor={
            buttonVariant === "outline" || buttonVariant === "roundOutline"
              ? "transparent"
              : buttonColor
          }
          px={8}
          onClick={() => navigate(link)}
          fontSize="13px"
          textTransform="uppercase"
          variant={buttonVariant}
        >
          {buttonText}
        </Button>
      )}
      {minPrice && (
        <Text>
          {formatPrice("USD", minPrice)}
          {maxPrice && <span> - {formatPrice("USD", maxPrice)}</span>}
        </Text>
      )}
    </VStack>
  )
}
