import * as React from "react"
import { StoreContext } from "../context/store-context"
import { Button } from "@chakra-ui/react"

export default function AddToCartButton({
  openCartDrawer,
  variantId,
  quantity,
  available,
  ...props
}) {
  const { addVariantToCart, loading } = React.useContext(StoreContext)

  function addToCart(e) {
    e.preventDefault()
    openCartDrawer()
    addVariantToCart(variantId, quantity)
  }

  return (
    <Button
      w="150px"
      variant={"blue"}
      mt={8}
      py={7}
      type="submit"
      onClick={addToCart}
      disabled={!available || loading}
      {...props}
    >
      {available ? "Add to Cart" : "Out of Stock"}
    </Button>
  )
}
