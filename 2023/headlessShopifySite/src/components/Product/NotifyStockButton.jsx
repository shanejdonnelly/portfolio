import * as React from "react"
import {
  Button,
  Center,
  Heading,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"

export default function AddToCartButton({
  variantId,
  productId,
  productTitle,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const toast = useToast()

  const handleSubscribe = () => {
    setLoading(true)

    const data = {
      token: "Wn6APa",
      properties: {
        $email: email,
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
        fetch(
          "https://a.klaviyo.com/onsite/components/back-in-stock/subscribe",
          {
            headers: {
              accept: "application/json, text/plain, */*",
              "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
              a: data.token,
              email: email,
              platform: "shopify",
              variant: variantId,
              product: productId,
            }),
            method: "POST",
          }
        )
          .then((response) => {
            setLoading(false)
            setEmail("")
            onClose()

            toast({
              title: "All set!",
              description: "We'll let you know when it's back in stock!",
              status: "success",
              duration: 4000,
              isClosable: true,
            })

            console.log(response)
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((err) => {
        toast({
          title: "Uh oh!",
          description: "Something went wrong. Please try that again.",
          status: "error",
          duration: 3500,
          isClosable: true,
        })
      })
  }

  return (
    <>
      <Button variant={"blue"} py={6} w="350px" maxW="100%" onClick={onOpen}>
        Notify Me When Available
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Heading fontSize="34px" maxW="350px" mb={4}>
                Get Notified
              </Heading>
            </Center>
            <Center>
              <Text mb="24px" maxW="350px">
                Enter your email and be the first to know when this is back in
                stock. By signing up, you agree to receive marketing emails from
                Port & Bay. Unsubscribe at any time.
              </Text>
            </Center>
            <Center>
              <Input
                maxW="350px"
                placeholder="Email address"
                value={email}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubscribe()
                  }
                }}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </Center>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="blue" onClick={handleSubscribe} disabled={loading}>
              Notify Me
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
