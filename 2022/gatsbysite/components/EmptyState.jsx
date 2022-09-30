import * as React from "react"
import { navigate } from "gatsby"
import { Button, Heading, Icon, Text, VStack } from "@chakra-ui/react"
import { GoTelescope } from "react-icons/go"

export default function EmptyState({
  text,
  icon = GoTelescope,
  subText = null,
  link = null,
  linkText = null,
  mt = 0,
}) {
  return (
    <VStack spacing={3} mt={mt}>
      {icon && <Icon as={icon} boxSize={12} color="gray.600" />}
      <Heading size="lg">{text}</Heading>
      {subText && <Text>{subText}</Text>}
      {link && linkText && (
        <Button
          variant="blue"
          onClick={() => {
            navigate(link)
          }}
        >
          {linkText}
        </Button>
      )}
    </VStack>
  )
}
