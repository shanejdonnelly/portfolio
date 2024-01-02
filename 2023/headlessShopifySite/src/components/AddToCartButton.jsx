import * as React from "react"
import { StoreContext } from "../context/store-context"
import { Button } from "@chakra-ui/react"

export default function AddToCartButton({
  openCartDrawer,
  variantId,
  quantity,
  available,
  product,
  variant,
  ...props
}) {
  const { addVariantToCart, loading } = React.useContext(StoreContext)

  function addToCart(e) {
    e.preventDefault()
    openCartDrawer()
    addVariantToCart(variantId, quantity, product, variant)
  }

  let buttonText = "Add to Cart"
  if (!variant) {
    buttonText = "Not Available"
  }
  if (!available) {
    buttonText = "Out of Stock"
  }

  return (
    <Button
      w="350px"
      variant={"blue"}
      py={6}
      type="submit"
      onClick={addToCart}
      disabled={!variant || !available || loading}
      {...props}
    >
      {buttonText}
    </Button>
  )
}
