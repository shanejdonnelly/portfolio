import * as React from "react"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Container,
  Divider,
  Text,
} from "@chakra-ui/react"

export default function ProductInfo({
  descriptionHtml,
  reviewsRef,
  brand,
  shopifyId,
  sku,
  upc,
}) {
  //shopifyId is a string like gid://shopify/Product/7436810420419
  //split into array and get last element
  const productId = shopifyId.split("/").pop()
  return (
    <Box
      background="#FBF9F7"
      mt={{ base: 4, md: 12, lg: 16, xl: 24 }}
      mb={{ base: 4, md: 12 }}
    >
      <Container maxW={"7xl"} py={{ base: 2, md: 8 }}>
        <Center mb={8}>
          <Accordion
            allowToggle
            defaultIndex={0}
            w={{ base: "100%", md: "85%" }}
          >
            <AccordionItem border="0">
              <AccordionButton
                fontFamily="sourceserifpro"
                fontSize="32px"
                py={3}
              >
                <Box flex="1" textAlign="left">
                  Details
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <div
                  className="shopify-productDescriptionHTML"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
                <Box mt={4}>
                  {brand && !!brand.length && (
                    <Text mb={1}>Brand: {brand}</Text>
                  )}
                  {sku && !!sku.length && <Text mb={1}>SKU: {sku}</Text>}
                  {upc && !!upc.length && <Text mb={1}>UPC: {upc}</Text>}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Center>
      </Container>
      <Divider color="#D8D8D8" />
      <Container maxW={"7xl"} py={{ base: 2, md: 8 }}>
        <Center mb={8}>
          <Accordion
            allowToggle
            defaultIndex={0}
            w={{ base: "100%", md: "85%" }}
          >
            <AccordionItem border="0" ref={reviewsRef}>
              <AccordionButton
                fontFamily="sourceserifpro"
                fontSize="32px"
                py={3}
              >
                <Box flex="1" textAlign="left">
                  Reviews
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel>
                <span
                  className="junip-product-review"
                  data-product-id={productId}
                ></span>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Center>
      </Container>
    </Box>
  )
}
