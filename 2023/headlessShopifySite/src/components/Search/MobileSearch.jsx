import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Center,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  Icon,
  Link,
  useDisclosure,
} from "@chakra-ui/react"
import LogoBlue from "../../icons/logo-blue"
import SearchInput from "../Inputs/SearchInput"
import { BsSearch as SearchIcon } from "react-icons/bs"

const MobileSearch = ({ searchValue, setSearchValue }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Icon as={SearchIcon} w={5} h={5} mr={4} onClick={onToggle} />
      <Drawer size="full" isOpen={isOpen} onClose={onToggle} placement="left">
        <DrawerContent>
          <DrawerCloseButton left={2} boxSize={12} size={10} />
          <DrawerHeader>
            <Center>
              <Link as={GatsbyLink} to="/">
                <Box w={{ base: "150px", md: "200px" }}>
                  <LogoBlue />
                </Box>
              </Link>
            </Center>
          </DrawerHeader>
          <DrawerBody>
            <SearchInput
              placeholder={"Search the entire site..."}
              value={searchValue}
              setSearchValue={setSearchValue}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileSearch
