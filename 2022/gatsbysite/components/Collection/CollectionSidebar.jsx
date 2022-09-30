import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
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
}) => {
  const collectionFilterOptions = getFilterInfo(products)
  const colors = collectionFilterOptions.colors
  const sizes = collectionFilterOptions.sizes
  const lengths = collectionFilterOptions.lengths
  const widths = collectionFilterOptions.widths

  return (
    <Box pr={{ base: 0, lg: 6 }} mb={8}>
      <VStack alignItems={"flex-start"}>
        {searchTerm && (
          <VStack alignItems={"flex-start"} mt={8} mb={2}>
            <Text>Showing results for:</Text>
            <Text fontSize="2xl" fontWeight={"bold"}>
              {searchTerm}
            </Text>
          </VStack>
        )}
        <ActiveFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          getFilterTagName={getFilterTagName}
          handleClearAllFilters={handleClearAllFilters}
        />
      </VStack>
      <Accordion
        defaultIndex={[0]}
        mt={8}
        allowMultiple
        w={{ base: "full", lg: 60 }}
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
                      as={GatsbyLink}
                      key={`sidebarNavItem_${child.handle}`}
                      to={`/shop/${parentHandle}/${child.handle}`}
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
                <FormLabel>Blackout</FormLabel>
                <VStack spacing={1} alignItems="flex-start">
                  <Checkbox
                    onChange={() =>
                      handleFilterChange("blackout", !filters.blackout)
                    }
                    isChecked={filters.blackout === true}
                  >
                    Yes
                  </Checkbox>
                  <Checkbox
                    onChange={() =>
                      handleFilterChange("blackout", !filters.blackout)
                    }
                    isChecked={filters.blackout === false}
                  >
                    No
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
                  Yes
                </Checkbox>
                <Checkbox
                  onChange={() => handleFilterChange("lined", !filters.lined)}
                  isChecked={filters.lined === false}
                >
                  No
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
                  Yes
                </Checkbox>
                <Checkbox
                  onChange={() =>
                    handleFilterChange("usaMade", !filters.usaMade)
                  }
                  isChecked={filters.usaMade === false}
                >
                  No
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
            <VStack spacing={2}>
              <InputGroup>
                <InputLeftAddon children="$" />
                <NumberInput
                  value={filters.minPrice}
                  min={0}
                  max={filters.maxPrice}
                  onChange={(valueAsNumber) => {
                    handleFilterChange("minPrice", valueAsNumber)
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
              <Text textAlign={"center"}>To</Text>
              <InputGroup>
                <InputLeftAddon children="$" />
                <NumberInput
                  value={filters.maxPrice}
                  min={filters.minPrice}
                  max={9999}
                  onChange={(valueAsNumber) => {
                    handleFilterChange("maxPrice", valueAsNumber)
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
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default CollectionSidebar
