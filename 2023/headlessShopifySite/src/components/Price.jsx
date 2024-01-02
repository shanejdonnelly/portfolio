import * as React from "react"
import { Flex, Text } from "@chakra-ui/react"

export default function Price({ pr }) {
  let saleText = ""
  let regularText = ""

  if (pr.onSale) {
    //ON SALE
    //sale price
    //if the low and high sale prices are the same, don't show range
    if (pr.salePriceRange[0] === pr.salePriceRange[1]) {
      saleText = `$${pr.salePriceRange[0]}`
    } else {
      //show price range
      saleText = `$${pr.salePriceRange[0]} - $${pr.salePriceRange[1]}`
    }
    //regular price
    //if the low and high regular prices are the same, don't show range
    if (pr.regularPriceRange[0] === pr.regularPriceRange[1]) {
      regularText = `$${pr.regularPriceRange[0]}`
    } else {
      //show price range
      regularText = `$${pr.regularPriceRange[0]} - $${pr.regularPriceRange[1]}`
    }
  } else {
    //NOT ON SALE
    //if the low and high prices are the same, don't show range
    if (pr.regularPriceRange[0] === pr.regularPriceRange[1]) {
      regularText = `$${pr.regularPriceRange[0]}`
    } else {
      //show price range
      regularText = `$${pr.regularPriceRange[0]} - $${pr.regularPriceRange[1]}`
    }
  }

  return pr.onSale ? (
    <Flex>
      <Text>{saleText}</Text>
      <Text color="gray.400" textDecor="line-through" pl={2}>
        {regularText}
      </Text>
    </Flex>
  ) : (
    <Text>{regularText}</Text>
  )
}
