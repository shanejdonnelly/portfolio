import * as React from "react"
import Navigation from "../Navigation/Navigation"
import PromoBar from "./PromoBar"
import { VStack } from "@chakra-ui/react"

export default function Header({ gatsbyLocation }) {
  return (
    <VStack>
      <PromoBar />
      <Navigation gatsbyLocation={gatsbyLocation} />
    </VStack>
  )
}
