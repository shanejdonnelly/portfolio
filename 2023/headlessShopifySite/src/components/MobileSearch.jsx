import * as React from "react"
import { Link as GatsbyLink, navigate } from "gatsby"

import {
  Button,
  CloseButton,
  Slide,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  useDisclosure,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  PopoverCloseButton,
} from "@chakra-ui/react"
import { BsSearch as SearchIcon } from "react-icons/bs"

const MobileSearch = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)
  return (
    <>
      <IconButton
        onClick={open}
        icon={<Icon as={SearchIcon} w={5} h={5} />}
        variant="ghost"
        zIndex={10}
      />
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverContent pos="relative" top="98px">
          <Box p={4} bg="white" shadow="md" w="100vw">
            <InputGroup>
              <Input placeholder="Search our store..." />
              <InputRightElement>
                <CloseButton onClick={close} />
              </InputRightElement>
            </InputGroup>
          </Box>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default MobileSearch
