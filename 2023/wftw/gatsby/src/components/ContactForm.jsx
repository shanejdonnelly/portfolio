import * as React from "react"
import { Formik, Form, Field } from "formik"
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react"
import Row from "./Row"
import * as styles from "./contactForm.module.css"

export default function ContactForm({ data }) {
  const toast = useToast()

  const textColor = data?.textColor?.hex ? data.textColor.hex : "white"
  const buttonVariant = data?.buttonVariant ? data.buttonVariant : "white"

  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  return (
    <Row data={data}>
      <Center>
        <Formik
          initialValues={{
            name: "",
            email: "",
            message: "",
          }}
          onSubmit={(values, actions) => {
            fetch("/", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: encode({ "form-name": "contact", ...values }),
            })
              .then(() => {
                toast({
                  title: "Thank you!",
                  description:
                    "Thanks for contacting us! We will get in touch with you shortly.",
                  status: "success",
                  duration: 50000000,
                  isClosable: true,
                })
                actions.resetForm()
              })
              .catch(() => {
                toast({
                  title: "Dang!",
                  description: "Something went wrong, please try again.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
              })
              .finally(() => actions.setSubmitting(false))
          }}
          validate={values => {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            const errors = {}
            if (!values.name) {
              errors.name = "Name required"
            }
            if (!values.email || !emailRegex.test(values.email)) {
              errors.email = "Valid email required"
            }
            if (!values.message) {
              errors.message = "Message required"
            }
            return errors
          }}
        >
          {formik => (
            <Form
              name="contact"
              data-netlify={true}
              netlify-honeypot="full-name"
              style={{ maxWidth: "600px", width: "100%" }}
            >
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    mb={4}
                    isRequired
                    isInvalid={form.errors.name && form.touched.name}
                    className={styles.inputGroup}
                  >
                    <input
                      {...field}
                      className={styles.materialInput}
                      style={{ borderColor: "gray", color: textColor }}
                      required
                    />
                    <label
                      className={styles.materialLabel}
                      htmlFor="name"
                      style={{ color: textColor, fontWeight: "700" }}
                    >
                      Name
                    </label>

                    <FormErrorMessage style={{ wordSpacing: "2px" }}>
                      {form.errors.name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="full-name">
                {({ field, form }) => (
                  <FormControl
                    mb={4}
                    display="none"
                    className={styles.inputGroup}
                  >
                    <input
                      {...field}
                      className={styles.materialInput}
                      style={{ borderColor: "gray", color: textColor }}
                    />
                    <label
                      style={{ color: textColor, fontWeight: "700" }}
                      htmlFor="full-name"
                      className={styles.materialLabel}
                    >
                      Full Name
                    </label>

                    <FormErrorMessage style={{ wordSpacing: "2px" }}>
                      {form.errors.name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    className={styles.inputGroup}
                    mb={4}
                    isRequired
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <input
                      {...field}
                      className={styles.materialInput}
                      style={{ borderColor: "gray", color: textColor }}
                      required
                    />
                    <label
                      style={{ color: textColor, fontWeight: "700" }}
                      className={styles.materialLabel}
                      htmlFor="email"
                    >
                      Email
                    </label>

                    <FormErrorMessage style={{ wordSpacing: "2px" }}>
                      {form.errors.email}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="message">
                {({ field, form }) => (
                  <FormControl
                    className={styles.inputGroup}
                    mb={4}
                    isInvalid={form.errors.message && form.touched.message}
                    isRequired
                  >
                    <input
                      {...field}
                      style={{ borderColor: "gray", color: textColor }}
                      className={styles.materialInput}
                      required
                    />
                    <label
                      style={{ color: textColor, fontWeight: "700" }}
                      htmlFor="message"
                      className={styles.materialLabel}
                    >
                      Message
                    </label>

                    <FormErrorMessage style={{ wordSpacing: "2px" }}>
                      {form.errors.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Center>
                <Button
                  variant={buttonVariant}
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  Zip Zip
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Center>
    </Row>
  )
}
