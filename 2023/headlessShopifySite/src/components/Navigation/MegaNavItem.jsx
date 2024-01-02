import * as React from "react"
import { Link as GatsbyLink, navigate } from "gatsby"
import { StoreContext } from "../../context/store-context"
import {
  Container,
  Flex,
  Image,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import serializers from "../../utils/sanitySerializers"
import BasePortableText from "@sanity/block-content-to-react"

const MegaNavItem = ({
  gatsbyLocation,
  items,
  title,
  handle,
  mainImage,
  _rawDescription,
  shopLink,
}) => {
  const { activeCollection } = React.useContext(StoreContext)

  let isActive = false
  if (gatsbyLocation?.pathname.includes("collections")) {
    isActive = gatsbyLocation?.pathname.includes(handle) || false
  } else {
    isActive = activeCollection === handle
  }

  return (
    <Popover
      rowSize={0}
      trigger={"hover"}
      placement={"bottom"}
      variant={"meganav"}
      offset={[0, 0]}
    >
      <PopoverTrigger>
        <Text
          variant={isActive ? "activeMainNavLink" : "mainNavLink"}
          textAlign="center"
          onClick={() => {
            navigate(`/collections/${handle}`)
          }}
        >
          {title}
        </Text>
      </PopoverTrigger>

      {items && (
        <Portal>
          <PopoverContent
            border={0}
            boxShadow={"lg"}
            p={4}
            w={"calc(100vw - 16px)"}
          >
            <Container py={10} maxW={"container.md"}>
              <SimpleGrid columns={2} spacing={4}>
                <Flex direction={"column"}>
                  <Text
                    variant="mainNavLink"
                    color={"gray.500"}
                    mb={4}
                    cursor={"default"}
                  >
                    {title}
                  </Text>
                  {items.map((child, index) => (
                    <Link
                      color={"gray.700"}
                      mb={2}
                      key={`navItemLink_${index}`}
                      as={GatsbyLink}
                      to={`/collections/${handle}/${child.handle}`}
                    >
                      {child.title}
                    </Link>
                  ))}
                  <Link
                    color={"gray.800"}
                    fontWeight={700}
                    mt={5}
                    as={GatsbyLink}
                    to={`/collections/${handle}`}
                  >
                    All {title} <ArrowForwardIcon mx={1} />
                  </Link>
                </Flex>

                <VStack alignItems={"flex-start"}>
                  {mainImage?.asset?.url && <Image src={mainImage.asset.url} />}
                  {_rawDescription && (
                    <BasePortableText
                      blocks={_rawDescription}
                      serializers={serializers}
                    />
                  )}
                  <Link
                    color={"gray.800"}
                    fontWeight={700}
                    as={GatsbyLink}
                    to={shopLink ? shopLink : `/collections/${handle}`}
                  >
                    Shop Now <ArrowForwardIcon mx={1} />
                  </Link>
                </VStack>
              </SimpleGrid>
            </Container>
          </PopoverContent>
        </Portal>
      )}
    </Popover>
  )
}

export default MegaNavItem
