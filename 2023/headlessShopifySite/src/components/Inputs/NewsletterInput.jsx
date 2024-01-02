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
        //need proxy to fix cors error from klaviyo
        const proxy = "https://www.portandbay.com/.netlify/functions/cors"
        const root =
          "https://a.klaviyo.com/api/v2/list/Tdrew6/subscribe?api_key=pk_6902ba4a5f20e8baaa2ae584755edec9cf"
        const url = `${proxy}/${root}`

        const newsletter_options = {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            profiles: [{ email: value }],
          }),
        }

        fetch(url, newsletter_options)
          .then((response) => response.json())
          .then((response) => {
            console.log(response)
            toast({
              title: "Welcome!",
              description: "Thanks for signing up for our newsletter!",
              status: "success",
              duration: 9000,
              isClosable: true,
            })
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

  /*
   */

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
