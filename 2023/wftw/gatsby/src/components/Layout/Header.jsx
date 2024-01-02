import * as React from "react"
import Navigation from "../Navigation"

export default function Header({ gatsbyLocation, navTextColor }) {
  return (
    <Navigation gatsbyLocation={gatsbyLocation} navTextColor={navTextColor} />
  )
}
