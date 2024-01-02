import * as React from "react"
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { BsPerson as PersonIcon } from "react-icons/bs"

const AccountLink = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLogin = () => {
    //need proxy to fix cors error from shopify
    const proxy = "https://www.portandbay.com/.netlify/functions/cors"
    const root = "https://shop.portandbay.com"
    const url = `${proxy}/${root}/api/2022-10/graphql.json`

    const input = {
      email: "shane@50fish.com",
      password: "test1234",
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query:
          'mutation{ customerAccessTokenCreate(input:{email:"shane@50fish.com", password:"test1234"}){ customerAccessToken{ accessToken expiresAt }}}',
        variables: {},
      }),
    })
      .then((res) => {
        if (res) {
          console.log(res)
          res.json()
        } else {
          console.log("wtf")
        }
      })
      .then((result) => {
        if (result) {
          console.log(result)
        }
      })
  }

  return (
    <Box
      href="https://shop.portandbay.com.com/account"
      mr={3}
      display={{ base: "none", sm: "inline-block" }}
      onClick={handleLogin}
    >
      <Icon as={PersonIcon} w={6} h={6} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>Blah, blah, blah</Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default AccountLink
