import * as React from "react"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Text,
} from "@chakra-ui/react"

export default function ProductInfo({
  descriptionHtml,
  activePanel = 0,
  handleAccordionChange,
  reviewsRef,
  brand,
  sku,
  upc,
}) {
  return (
    <Center mb={8}>
      <Accordion index={activePanel} w={{ base: "100%", md: "85%" }}>
        <AccordionItem>
          <AccordionButton
            py={3}
            onClick={() => {
              handleAccordionChange(0)
            }}
          >
            <Box flex="1" textAlign="left">
              Description
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <div
              className="shopify-productDescriptionHTML"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
            <Box mt={4}>
              {brand && !!brand.length && <Text mb={1}>Brand: {brand}</Text>}
              {sku && !!sku.length && <Text mb={1}>SKU: {sku}</Text>}
              {upc && !!upc.length && <Text mb={1}>UPC: {upc}</Text>}
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem ref={reviewsRef}>
          <AccordionButton
            py={3}
            onClick={() => {
              handleAccordionChange(1)
            }}
          >
            <Box flex="1" textAlign="left">
              Reviews
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>
            <span
              className="junip-product-review"
              data-product-id="7215355822275"
            ></span>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Center>
  )
}
