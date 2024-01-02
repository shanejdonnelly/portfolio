import * as React from "react"
import { Box, Container } from "@chakra-ui/react"
import SplitBg from "./SplitBg"
import { formatColor } from "../helpers"

export default function Row({ children, data }) {
  //Row data
  const pb = data.paddingBottom ? data.paddingBottom : "none"
  const pt = data.paddingTop ? data.paddingTop : "none"
  const bgColorTop = data?.bgColorTop?.rgb
    ? data.bgColorTop.rgb
    : { r: 255, g: 255, b: 255, a: 0 }
  const bgColorBottom = data?.bgColorBottom?.rgb
    ? data.bgColorBottom.rgb
    : { r: 255, g: 255, b: 255, a: 0 }
  const fullBleed = data.fullBleed ? data.fullBleed : false
  //END Row data

  const getSpacing = function (val) {
    // val === 'none'
    let base = 0,
      sm = 0,
      md = 0,
      lg = 0
    if (val === "small") {
      base = "20px"
      sm = "40px"
      md = "60px"
      lg = "80px"
    } else if (val === "medium") {
      base = "30px"
      sm = "60px"
      md = "90px"
      lg = "120px"
    } else if (val === "large") {
      base = "50px"
      sm = "100px"
      md = "150px"
      lg = "200px"
    } else if (val === "negative") {
      //needs to be same as borderRadius in TitleText and VideoBlock components
      //can't stack TitleText on mobile, and actually needs spacing for responsive text placement
      base = "24px"
      sm = "24px"
      md = "48px"
      lg = "-60px"
    }
    return { base, sm, md, lg }
  }

  return (
    <Box
      pt={getSpacing(pt)}
      pb={getSpacing(pb)}
      pos="relative"
      className={`Row ${data?._type ? data._type : ""}`}
      zIndex={1}
    >
      <SplitBg
        bgColorBottom={formatColor(bgColorBottom)}
        bgColorTop={formatColor(bgColorTop)}
        splitGradientBg={data.splitGradientBg}
      />
      {fullBleed ? (
        children
      ) : (
        <Container maxW={"container.xl"} className="container">
          {children}
        </Container>
      )}
    </Box>
  )
}
