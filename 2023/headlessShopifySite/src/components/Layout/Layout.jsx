import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Header from "./Header"
import Footer from "./Footer"
import Fonts from "../Fonts"
import PromoBar from "./PromoBar"
import theme from "../../theme"

export default function Layout({ children, gatsbyLocation }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <ChakraProvider theme={theme}>
        <Fonts />
        <Header gatsbyLocation={gatsbyLocation} />
        <PromoBar name="secondary" height="short" />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </ChakraProvider>
    </div>
  )
}
