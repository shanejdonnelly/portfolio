import * as React from "react"
import { Icon, HStack } from "@chakra-ui/react"
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"

export default function Stars({
  numStars,
  color = "#eec200",
  starBase = 5,
  size = "sm",
}) {
  const starSize = {
    sm: "15px",
    md: "18px",
    lg: "24px",
    xl: "32px",
  }
  const starBaseArray = Array.from(Array(starBase).keys())
  return (
    <HStack spacing={1}>
      {starBaseArray.map((s, index) => (
        <Icon
          key={`star_${index}`}
          as={numStars >= index + 1 ? BsStarFill : BsStar}
          color={color}
          fontSize={starSize[size]}
        />
      ))}
    </HStack>
  )
}
