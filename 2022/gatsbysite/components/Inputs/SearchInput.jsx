import * as React from "react"
import { Link, navigate } from "gatsby"
import {
  Input,
  InputGroup,
  InputRightAddon,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Portal,
} from "@chakra-ui/react"
import { CloseIcon, SearchIcon } from "@chakra-ui/icons"
import SearchResults from "../Search/SearchResults"
import Overlay from "../Overlay"

export default function SearchInput({ defaultTerm, placeholder }) {
  const [term, setTerm] = React.useState(defaultTerm)

  const clearTerm = function (e) {
    setTerm("")
  }
  const handleChange = function (e) {
    console.log(e.target.value)
    setTerm(e.target.value)
  }

  return (
    <Popover autoFocus={false} isOpen={term && term.length > 2}>
      <PopoverAnchor>
        <InputGroup w={{ md: "400px", lg: "600px" }} zIndex={11}>
          <Input
            autoFocus
            type="text"
            backgroundColor={"white"}
            borderLeftRadius="3xl"
            borderColor="inherit"
            _focus={{ borderColor: "inherit" }}
            value={term}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                clearTerm()
              } else if (e.key === "Enter") {
                navigate(`/search?q=${term}`)
                clearTerm()
              }
            }}
            onChange={handleChange}
            placeholder={placeholder}
            zIndex={1}
          />
          <InputRightAddon borderRightRadius="3xl">
            {term ? (
              <CloseIcon
                onClick={() => {
                  clearTerm()
                }}
              />
            ) : (
              <Link to="/search">
                <SearchIcon />
              </Link>
            )}
          </InputRightAddon>
        </InputGroup>
      </PopoverAnchor>
      <PopoverContent
        overflow={{ base: "scroll", lg: "auto" }}
        pb={{ base: "88px", lg: "0" }}
        height={{ base: "100vh", lg: "auto" }}
        w={{ base: "100vw", lg: "1000px" }}
        borderColor={{ base: "transparent", lg: "gray.300" }}
        borderRadius="40px"
        boxShadow={{ base: "none", lg: "0 0 4px 1px rgba(0,0,0,0.2)" }}
        _focus={{
          boxShadow: {
            base: "none",
            lg: "0 0 4px 1px rgba(0,0,0,0.2) !important",
          },
        }}
      >
        <Portal>
          {term && term.length > 2 && (
            <Overlay
              onClick={() => clearTerm()}
              bg={term && term.length > 2 ? "rgba(0,0,0,0.3)" : "transparent"}
            />
          )}
        </Portal>
        {term && term.length > 2 && (
          <SearchResults searchTerm={term} clearTerm={clearTerm} />
        )}
      </PopoverContent>
    </Popover>
  )
}
