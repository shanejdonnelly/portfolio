import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Header from "./Header"
import Footer from "./Footer"
import Seo from "./Seo"
import Fonts from "../Fonts"
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
        <Seo />
        <Header gatsbyLocation={gatsbyLocation} />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </ChakraProvider>
    </div>
  )
}
