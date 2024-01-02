import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Header from "./Header"
import Footer from "./Footer"
import Fonts from "../Fonts"

import theme from "../../theme"

export default function Layout({
  bgColor,
  children,
  gatsbyLocation,
  gradientBg,
  navTextColor,
  siteSettings,
}) {
  return (
    <div
      style={{
        background: gradientBg,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 2000px",
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <ChakraProvider theme={theme}>
        <Fonts />
        <Header gatsbyLocation={gatsbyLocation} navTextColor={navTextColor} />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer
          images={siteSettings?.images ? siteSettings.images : []}
          footerLinks={
            siteSettings?.footerLinks ? siteSettings.footerLinks : []
          }
          footerText={
            siteSettings?.footerText
              ? siteSettings.footerText
              : "Words From The Woods is a full-service advertising agency headquartered in Portland, Maine."
          }
        />
      </ChakraProvider>
    </div>
  )
}
