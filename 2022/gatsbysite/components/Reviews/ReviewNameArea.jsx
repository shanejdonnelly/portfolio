import * as React from "react"
import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react"
import {
  BsCheckCircleFill as CircleCheck,
  BsCheck as Check,
} from "react-icons/bs"

export default function ReviewNameArea({ review }) {
  const { recommend, reviewerName, verified } = review
  const nameArray = reviewerName.split(" ")
  const formattedName = `${nameArray[0]} ${nameArray[
    nameArray.length - 1
  ].slice(0, 1)}`

  return (
    <>
      <Flex alignItems="center">
        <Avatar name={reviewerName} />
        <Box>
          <Text my={0} px={2}>
            {formattedName}
          </Text>
          <Flex alignItems="center" px={2}>
            <Icon as={CircleCheck} fontSize="13px" mr={1} />
            {verified && (
              <Text my={0} fontSize="13px">
                VERIFIED BUYER
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>
      {recommend && (
        <Flex alignItems="center" mt={4}>
          <Icon as={Check} fontSize="24px" />
          <Text my={0} fontSize="13px">
            I recommend this product
          </Text>
        </Flex>
      )}
    </>
  )
}
