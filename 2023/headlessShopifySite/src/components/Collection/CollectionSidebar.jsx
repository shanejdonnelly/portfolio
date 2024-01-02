import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  CheckboxGroup,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  InputGroup,
  InputLeftAddon,
  Link,
  List,
  ListItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  VStack,
} from "@chakra-ui/react"
import ActiveFilters from "./ActiveFilters"
import SidebarColorSwatch from "./SidebarColorSwatch"
import { getFilterInfo, getFilterTagName } from "../../utils/filterProducts"

const CollectionSidebar = ({
  children,
  products,
  filters,
  handleFilterChange,
  handleClearAllFilters,
  parentHandle = "",
  searchTerm = null,
  numActiveFilters,
}) => {
  const [minPrice, setMinPrice] = React.useState(filters.minPrice || 0)
  const [maxPrice, setMaxPrice] = React.useState(filters.maxPrice || 1000)
  const collectionFilterOptions = getFilterInfo(products)
  const colors = collectionFilterOptions.colors
  const sizes = collectionFilterOptions.sizes
  const lengths = collectionFilterOptions.lengths
  const widths = collectionFilterOptions.widths
  const numProducts = collectionFilterOptions.quantities

  React.useEffect(() => {
    setMinPrice(filters.minPrice)
    setMaxPrice(filters.maxPrice)
  }, [filters])

  return (
    <Box mb={8}>
      <VStack alignItems={"flex-start"}>
        <Box display={{ base: "block", lg: "none" }}>
          <ActiveFilters
            numActiveFilters={numActiveFilters}
            filters={filters}
            handleFilterChange={handleFilterChange}
            getFilterTagName={getFilterTagName}
            handleClearAllFilters={handleClearAllFilters}
          />
        </Box>
      </VStack>
      <Accordion
        defaultIndex={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        mt={8}
        allowMultiple
        w={{ base: "full", lg: "auto" }}
      >
        {children && !!children.length && (
          <AccordionItem>
            <Heading as="h3">
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Category
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4}>
              <List spacing={1}>
                {children.map((child, index) => (
                  <ListItem key={`childListItem_${index}`}>
                    <Link
                      color="black"
                      as={GatsbyLink}
                      key={`sidebarNavItem_${child.handle}`}
                      to={`/collections/${parentHandle}/${child.handle}`}
                      fontSize="13px"
                    >
                      {child.title}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        )}

        {colors && !!colors.length && (
          <AccordionItem>
            <Heading as="h3">
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Color
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4}>
              <Flex flexWrap={"wrap"} justifyContent="flex-start">
                {colors.map((color, index) => (
                  <SidebarColorSwatch
                    colorArray={filters.color}
                    color={color}
                    handleFilterChange={handleFilterChange}
                    key={`colorSwatch_${index}`}
                  />
                ))}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        )}

        {collectionFilterOptions.hasBlackout && (
          <AccordionItem>
            <Heading as="h3">
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Blackout
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4}>
              <FormControl>
                <VStack spacing={1} alignItems="flex-start">
                  <Checkbox
                    onChange={() =>
                      handleFilterChange("blackout", !filters.blackout)
                    }
                    isChecked={filters.blackout === true}
                  >
                    Show Only Blackout
                    {numProducts["blackout"] && (
                      <span style={{ fontSize: "11px", paddingLeft: "6px" }}>
                        ({numProducts["blackout"]})
                      </span>
                    )}
                  </Checkbox>
                </VStack>
              </FormControl>
            </AccordionPanel>
          </AccordionItem>
        )}

        {collectionFilterOptions.hasLined && (
          <AccordionItem>
            <Heading as="h3">
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Lined
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4}>
              <VStack spacing={1} alignItems="flex-start">
                <Checkbox
                  onChange={() => handleFilterChange("lined", !filters.lined)}
                  isChecked={filters.lined === true}
                >
                  Show Only Lined
                  {numProducts["lined"] && (
                    <span style={{ fontSize: "11px", paddingLeft: "6px" }}>
                      ({numProducts["lined"]})
                    </span>
                  )}
                </Checkbox>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        )}

        {collectionFilterOptions.hasUsaMade && (
          <AccordionItem>
            <Heading as="h3">
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Made in the USA
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4}>
              <VStack spacing={1} alignItems="flex-start">
                <Checkbox
                  onChange={() =>
                    handleFilterChange("usaMade", !filters.usaMade)
                  }
                  isChecked={filters.usaMade === true}
                >
                  Show Only USA Made
                  {numProducts["usaMade"] && (
                    <span style={{ fontSize: "11px", paddingLeft: "6px" }}>
                      ({numProducts["usaMade"]})
                    </span>
                  )}
                </Checkbox>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        )}
        {sizes && !!sizes.length && (
          <AccordionItem>
            <Heading as="h3">
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Sizes
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4} maxH="250px" overflowY={"scroll"}>
              <CheckboxGroup
                value={filters.size}
                onChange={(value) => handleFilterChange("size", value)}
              >
                <VStack spacing={1} alignItems="flex-start">
                  {sizes.map((size, index) => (
                    <Checkbox value={size} key={`sizeCheckbox_${index}`}>
                      {size}
                      {numProducts[size] && (
                        <span style={{ fontSize: "11px", paddingLeft: "6px" }}>
                          ({numProducts[size]})
                        </span>
                      )}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        )}

        {widths && !!widths.length && (
          <AccordionItem>
            <Heading as="h3">
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Widths
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4} maxH="250px" overflowY={"scroll"}>
              <CheckboxGroup
                value={filters.width}
                onChange={(value) => handleFilterChange("width", value)}
              >
                <VStack spacing={1} alignItems="flex-start">
                  {widths.map((size, index) => (
                    <Checkbox value={size} key={`sizeCheckbox_${index}`}>
                      {size}
                      {numProducts[size] && (
                        <span style={{ fontSize: "11px", paddingLeft: "6px" }}>
                          ({numProducts[size]})
                        </span>
                      )}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        )}

        {lengths && !!lengths.length && (
          <AccordionItem>
            <Heading as="h3">
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Lengths
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4} maxH="250px" overflowY={"scroll"}>
              <CheckboxGroup
                value={filters["length"]}
                onChange={(value) => handleFilterChange("length", value)}
              >
                <VStack spacing={1} alignItems="flex-start">
                  {lengths.map((size, index) => (
                    <Checkbox value={size} key={`sizeCheckbox_${index}`}>
                      {size}
                      {numProducts[size] && (
                        <span style={{ fontSize: "11px", paddingLeft: "6px" }}>
                          ({numProducts[size]})
                        </span>
                      )}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        )}

        <AccordionItem>
          <Heading as="h3">
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Price
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <Flex flexDir="column">
              <InputGroup>
                <InputLeftAddon children="$" />
                <NumberInput
                  value={minPrice}
                  min={0}
                  max={maxPrice}
                  inputMode="numeric"
                  onChange={(valueAsNumber) => {
                    setMinPrice(valueAsNumber)
                  }}
                >
                  <NumberInputField
                    borderBottomLeftRadius={0}
                    borderTopLeftRadius={0}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
              <Text textAlign={"center"} mt={2}>
                To
              </Text>
              <InputGroup mt={2}>
                <InputLeftAddon children="$" />
                <NumberInput
                  inputMode="numeric"
                  value={maxPrice}
                  min={minPrice}
                  max={9999}
                  onChange={(valueAsNumber) => {
                    setMaxPrice(valueAsNumber)
                  }}
                >
                  <NumberInputField
                    borderBottomLeftRadius={0}
                    borderTopLeftRadius={0}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
              <Button
                mt={4}
                variant="productOption"
                onClick={() => {
                  handleFilterChange("minPrice", minPrice)
                  handleFilterChange("maxPrice", maxPrice)
                }}
              >
                Filter
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default CollectionSidebar
