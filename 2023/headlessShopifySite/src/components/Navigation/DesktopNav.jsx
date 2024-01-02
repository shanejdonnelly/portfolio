import * as React from "react"
import { navigate } from "gatsby"
import { Flex, Stack, Text } from "@chakra-ui/react"
import MegaNavItem from "./MegaNavItem"

const DesktopNav = ({ menuData, gatsbyLocation }) => {
  const data = menuData.sort((a, b) => a.sortOrder - b.sortOrder)
  return (
    <Flex
      fontSize="sm"
      id="desktopNav"
      justifyContent="space-between"
      m="4px auto 12px"
      w="932px"
    >
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
              navigate(`/collections/${collection.handle}`)
            }}
          >
            {collection.title}
          </Text>
        )
      )}
    </Flex>
  )
}

export default DesktopNav
