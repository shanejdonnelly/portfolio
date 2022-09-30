import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { getNumActiveFilters } from "../../utils/filterProducts"
import ActiveFilter from "./ActiveFilter"

const ActiveFilters = ({
  filters,
  handleFilterChange,
  handleClearAllFilters,
}) => {
  const numActiveFilters = getNumActiveFilters(filters)
  return (
    <Box>
      <Flex
        mt={numActiveFilters > 0 ? 8 : 0}
        alignItems="flex-start"
        flexWrap={"wrap"}
        maxW="240px"
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
              handleFilterChange("minPrice", 0)
              handleFilterChange("maxPrice", 1000)
            }}
            label={`$${filters.minPrice} to $${filters.maxPrice}`}
          />
        )}
      </Flex>
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
    </Box>
  )
}

export default ActiveFilters
