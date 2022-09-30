import * as React from "react"
import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from "@chakra-ui/react"

export default function NewsletterInput() {
  const toast = useToast()
  const [value, setValue] = React.useState("")

  const handleChange = function (e) {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    const data = {
      token: "Wn6APa",
      properties: {
        $email: value,
      },
    }
    const options = {
      method: "POST",
      headers: {
        Accept: "text/html",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ data: JSON.stringify(data) }),
    }

    fetch("https://a.klaviyo.com/api/identify", options)
      .then((response) => response.json())
      .then((response) => {
        toast({
          title: "Welcome!",
          description: "Thanks for signing up for our newsletter!",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((err) => {
        toast({
          title: "Uh oh!",
          description: "Something went wrong. Please try that again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      })
  }

  return (
    <InputGroup>
      <Input
        name="email"
        bg="white"
        type="email"
        color="gray.700"
        fontSize={"12px"}
        borderLeftRadius="3xl"
        value={value}
        onChange={handleChange}
        placeholder={"Enter your email address..."}
      />
      <InputRightAddon
        borderLeftWidth={"2px"}
        borderLeftStyle="solid"
        borderLeftColor={"gray.500"}
        borderRightRadius="3xl"
      >
        <Button
          variant={"link"}
          fontSize={"xs"}
          textTransform={"uppercase"}
          color="gray.700"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </InputRightAddon>
    </InputGroup>
  )
}
