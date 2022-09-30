import * as React from "react"
import { navigate } from "gatsby"
import { Stack, Text } from "@chakra-ui/react"
import MegaNavItem from "./MegaNavItem"

const DesktopNav = ({ menuData, gatsbyLocation }) => {
  const data = menuData.sort((a, b) => a.sortOrder - b.sortOrder)
  return (
    <Stack direction={"row"} spacing={8} fontSize={"sm"}>
      {data.map((collection, index) =>
        collection.items && !!collection.items.length ? (
          <MegaNavItem
            gatsbyLocation={gatsbyLocation}
            key={`navItem_${index}`}
            {...collection}
          />
        ) : (
          <Text
            variant="mainNavLink"
            key={`navItem_${index}`}
            textAlign="center"
            onClick={() => {
              navigate(`/shop/${collection.handle}`)
            }}
          >
            {collection.title}
          </Text>
        )
      )}
    </Stack>
  )
}

export default DesktopNav
