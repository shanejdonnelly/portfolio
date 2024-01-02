import * as React from "react"
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"

import Row from "./Row"
import * as styles from "./contactForm.module.css"

export default function Auth({ password, setAuthorized }) {
  const toast = useToast()
  return (
    <Row data={{ paddingBottom: "large", paddingTop: "large" }}>
      <Box
        w={{ base: "95%", md: "400px" }}
        border="1px solid white"
        borderRadius="30px"
        p={8}
        m="0 auto"
      >
        <Center mb={4}>
          <Heading fontWeight={700} size="xl" color="white">
            Welcome!
          </Heading>
        </Center>
        <Center mb={4}>
          <Text color="white" fontSize="16px">
            Enter the password below to access this page.
          </Text>
        </Center>

        <Center>
          <Formik
            initialValues={{
              pass: "",
            }}
            onSubmit={(values, actions) => {
              try {
                if (values.pass === password) {
                  setAuthorized(true)
                } else {
                  toast({
                    title: "Dang!",
                    description: "That's not the correct password.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  })
                }
              } catch (e) {
                toast({
                  title: "Dang!",
                  description: "Something went wrong, please try again.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
              } finally {
                actions.setSubmitting(false)
              }
            }}
          >
            {formik => (
              <Form
                name="authForm"
                style={{ maxWidth: "400px", width: "100%" }}
              >
                <Field name="pass">
                  {({ field, form }) => (
                    <FormControl
                      mb={4}
                      isRequired
                      className={styles.inputGroup}
                    >
                      <input
                        {...field}
                        className={styles.materialInput}
                        style={{ borderColor: "gray", color: "white" }}
                        required
                      />
                      <label
                        className={styles.materialLabel}
                        htmlFor="password"
                        style={{ color: "white" }}
                      >
                        Password
                      </label>
                    </FormControl>
                  )}
                </Field>
                <Center>
                  <Button
                    mt={4}
                    variant={"white"}
                    disabled={formik.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Center>
              </Form>
            )}
          </Formik>
        </Center>
      </Box>
    </Row>
  )
}
