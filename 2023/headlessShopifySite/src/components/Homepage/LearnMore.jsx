import * as React from "react"
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react"
import LearnMoreCard from "../Cards/LearnMoreCard"
import Hero from "./Hero"

const LearnMore = ({ data }) => {
  return (
    <Box backgroundColor={data.cardRowBackgroundColor} pt={12} pb={8}>
      <Container maxW="container.xl">
        {data?.heroHeading && (
          <Heading
            as="h3"
            color="black"
            fontSize="32px"
            fontWeight="400"
            textAlign={"center"}
            pt={12}
          >
            {data.heroHeading}
          </Heading>
        )}
        {data?.heroTextBelowHeading && (
          <Text mt={4} mb={8} fontSize="16px" textAlign="center">
            {data.heroTextBelowHeading}
          </Text>
        )}

        <Flex my={14} flexWrap={{ base: "wrap", md: "nowrap" }}>
          {data?.learnItems &&
            !!data.learnItems.length &&
            data.learnItems.map((item, index) => (
              <LearnMoreCard
                key={`learn_${index}`}
                image={item.imageSrc}
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
