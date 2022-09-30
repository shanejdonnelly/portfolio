import * as React from "react"
import {
  Box,
  Container,
  Flex,
  Link,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"
import LearnMoreCard from "../Cards/LearnMoreCard"
import Hero from "./Hero"

const LearnMore = ({ data }) => {
  return (
    <Box backgroundColor={data.cardRowBackgroundColor}>
      <Hero
        backgroundImageOverlayColor={data.heroBackgroundImageOverlayColor}
        backgroundImageUrl={
          data.heroImage?.asset?.url ? data.heroImage.asset.url : ""
        }
        heading={data.heroHeading}
        textBelowHeading={data.heroTextBelowHeading}
        desktopHeight={data.heroHeight}
        mobileHeight={data.heroHeight}
        textColor={data.heroTextColor}
        minHeight="375px"
      />

      <Container maxW="container.xl">
        <Flex my={14} flexWrap={{ base: "wrap", md: "nowrap" }}>
          {data?.learnItems &&
            !!data.learnItems.length &&
            data.learnItems.map((item, index) => (
              <LearnMoreCard
                key={`learn_${index}`}
                imageSrc={
                  item.imageSrc?.asset?.url ? item.imageSrc.asset.url : ""
                }
                link={item.link}
                title={item.title}
                description={item.description}
              />
            ))}
        </Flex>
      </Container>
    </Box>
  )
}

export default LearnMore
