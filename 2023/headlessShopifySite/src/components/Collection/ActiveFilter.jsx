import * as React from "react"
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"

const ActiveFilter = ({ onClick, label }) => {
  return (
    <Tag
      size="md"
      borderRadius="full"
      variant="outline"
      onClick={onClick}
      m={1}
    >
      <TagLabel fontSize="13px" fontWeight="400">
        {label}
      </TagLabel>
      <TagCloseButton />
    </Tag>
  )
}

export default ActiveFilter
