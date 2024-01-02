import * as React from "react"
import { navigate } from "gatsby"
import { Box, Button, Container, Flex } from "@chakra-ui/react"

const ButtonRow = ({ data }) => {
  return (
    <Box backgroundColor={data.backgroundColor}>
      <Container maxW={"container.xl"}>
        <Flex py={3} justifyContent="center" flexWrap="wrap">
          {data.buttons.map((button, index) => (
            <Button
              color={data.textColor}
              fontSize="15px"
              borderColor={data.buttonColor}
              backgroundColor={
                data.buttonVariant === "outline" ||
                data.buttonVariant === "roundOutline"
                  ? "transparent"
                  : data.buttonColor
              }
              mx={4}
              my={3}
              onClick={() => navigate(button.link)}
              key={`button_${index}`}
              variant={data.buttonVariant}
              textTransform="none"
            >
              {button.text}
            </Button>
          ))}
        </Flex>
      </Container>
    </Box>
  )
}

export default ButtonRow
