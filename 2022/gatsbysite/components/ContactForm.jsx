import * as React from "react"
import { Formik, Form, Field } from "formik"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react"

export default function ContactForm({}) {
  const toast = useToast()

  function encode(data) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&")
  }

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        message: "",
        query: "",
        ordernumber: "",
        phone: "",
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
              description: "We'll get back to you as soon as possible.",
              status: "success",
              duration: 5000,
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
      validate={(values) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        const errors = {}
        if (!values.name) {
          errors.name = "Name Required"
        }
        if (!values.email || !emailRegex.test(values.email)) {
          errors.email = "Valid Email Required"
        }
        if (!values.message) {
          errors.message = "Message Required"
        }
        return errors
      }}
    >
      {(formik) => (
        <Form name="contact" data-netlify={true} netlify-honeypot="full-name">
          <Field name="name">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired
                isInvalid={form.errors.name && form.touched.name}
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} placeholder="Name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="full-name">
            {({ field, form }) => (
              <FormControl mb={4} display="none">
                <FormLabel htmlFor="full-name">Full Name</FormLabel>
                <Input {...field} placeholder="Full Name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} placeholder="Email" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="phone">
            {({ field, form }) => (
              <FormControl mb={4}>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input {...field} placeholder="Phone" />
              </FormControl>
            )}
          </Field>
          <Field name="query">
            {({ field, form }) => (
              <FormControl mb={4}>
                <FormLabel htmlFor="query">
                  What can we help you with?
                </FormLabel>
                <Select placeholder="Please select" variant="normal">
                  <option value="My order">My order</option>
                  <option value="Placing an order">Placing an order</option>
                  <option value="Product question">Product question</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
            )}
          </Field>
          <Field name="ordernumber">
            {({ field, form }) => (
              <FormControl mb={4}>
                <FormLabel htmlFor="ordernumber">Order Number</FormLabel>
                <FormHelperText>
                  If your inquiry pertains to an order, please enter your order
                  number here.
                </FormHelperText>
                <Input {...field} placeholder="Order Number" />
              </FormControl>
            )}
          </Field>
          <Field name="message">
            {({ field, form }) => (
              <FormControl
                mb={8}
                isInvalid={form.errors.message && form.touched.message}
                isRequired
              >
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea {...field} placeholder="Your message" />
                <FormErrorMessage>{form.errors.message}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="blue"
            mb={12}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}
