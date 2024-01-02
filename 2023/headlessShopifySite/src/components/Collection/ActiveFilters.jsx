import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import ActiveFilter from "./ActiveFilter"

const ActiveFilters = ({
  filters,
  handleFilterChange,
  handleClearAllFilters,
  numActiveFilters,
}) => {
  return (
    <Box flex={{ base: "auto", lg: "1" }}>
      <Flex
        mt={numActiveFilters > 0 ? 8 : 0}
        alignItems="flex-start"
        flexWrap={"wrap"}
        maxW={{ base: "240px", lg: "600px" }}
      >
        {filters.blackout && (
          <ActiveFilter
            label="Blackout"
            onClick={() => handleFilterChange("blackout", !filters.blackout)}
          />
        )}
        {filters.lined && (
          <ActiveFilter
            label="Lined"
            onClick={() => handleFilterChange("lined", !filters.lined)}
          />
        )}
        {filters.usaMade && (
          <ActiveFilter
            label="USA Made"
            onClick={() => handleFilterChange("usaMade", !filters.usaMade)}
          />
        )}
        {filters.color &&
          !!filters.color.length &&
          filters.color.map((c, index) => (
            <ActiveFilter
              key={`colorFilter_${index}`}
              label={c}
              onClick={() => {
                const newColorList = filters.color.filter((co) => co !== c)
                handleFilterChange("color", newColorList)
              }}
            />
          ))}
        {filters.size &&
          !!filters.size.length &&
          filters.size.map((c, index) => (
            <ActiveFilter
              key={`sizeFilter_${index}`}
              label={c}
              onClick={() => {
                const newSizeList = filters.size.filter((co) => co !== c)
                handleFilterChange("size", newSizeList)
              }}
            />
          ))}
        {filters["length"] &&
          !!filters["length"].length &&
          filters["length"].map((c, index) => (
            <ActiveFilter
              key={`lengthFilter_${index}`}
              label={c}
              onClick={() => {
                const newSizeList = filters["length"].filter((co) => co !== c)
                handleFilterChange("length", newSizeList)
              }}
            />
          ))}
        {filters.width &&
          !!filters.width.length &&
          filters.width.map((c, index) => (
            <ActiveFilter
              key={`widthFilter_${index}`}
              label={c}
              onClick={() => {
                const newSizeList = filters.width.filter((co) => co !== c)
                handleFilterChange("width", newSizeList)
              }}
            />
          ))}

        {(filters.minPrice !== 0 || filters.maxPrice !== 1000) && (
          <ActiveFilter
            onClick={() => {
              handleFilterChange("minPrice", null)
              handleFilterChange("maxPrice", null)
            }}
            label={`$${filters.minPrice} to $${filters.maxPrice}`}
          />
        )}
        {numActiveFilters > 1 && (
          <Text
            onClick={handleClearAllFilters}
            cursor="pointer"
            ml={2}
            mt={2}
            fontSize="13px"
            textDecor={"underline"}
          >
            Clear All
          </Text>
        )}
      </Flex>
    </Box>
  )
}

export default ActiveFilters
