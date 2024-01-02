import * as React from "react"
import fetch from "isomorphic-fetch"
import Client from "shopify-buy"

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
  },
  fetch
)

const defaultValues = {
  cart: [],
  isOpen: false,
  loading: false,
  onOpen: () => {},
  onClose: () => {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  client,
  checkout: {
    lineItems: [],
  },
  activeCollection: null,
  updateActiveCollection: () => {},
}

export const StoreContext = React.createContext(defaultValues)

const isBrowser = typeof window !== `undefined`
const localStorageKey = `shopify_checkout_id`

export const StoreProvider = ({ children }) => {
  const [activeCollection, setActiveCollection] = React.useState(
    defaultValues.activeCollection
  )
  const [checkout, setCheckout] = React.useState(defaultValues.checkout)
  const [loading, setLoading] = React.useState(false)
  const [didJustAddToCart, setDidJustAddToCart] = React.useState(false)

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
  }

  React.useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout)
            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }

      const newCheckout = await client.checkout.create()
      setCheckoutItem(newCheckout)
    }

    initializeCheckout()
  }, [])

  const klaviyoTrackAddToCart = (cart, product, variant, quantity) => {
    try {
      window._learnq.push([
        "track",
        "Added to Cart",
        {
          $value: cart.lineItemsSubtotalPrice.amount,
          AddedItemProductName: product.title,
          AddedItemProductID: variant.storefrontId,
          AddedItemSKU: variant.sku,
          AddedItemCategories: product.collections.map((c) => c.handle),
          AddedItemImageURL: variant.image.originalSrc,
          AddedItemURL: `https://www.portandbay.com/products/${product.handle}`,
          AddedItemPrice: variant.price,
          AddedItemQuantity: quantity,
          ItemNames: cart.lineItems.map((item) => item.title),
          CheckoutURL: cart.webUrl,
          Items: cart.lineItems.map((item) => {
            return {
              ProductID: item.id,
              SKU: item.variant.sku,
              ProductName: item.title,
              Quantity: item.quantity,
              ItemPrice: item.variant.price,
              RowTotal: item.quantity * item.variant.price,
              ProductURL: `https://www.portandbay.com/products/${item.variant.product.handle}`,
              ImageURL: item.variant.image.src,
              ProductCategories: [],
            }
          }),
        },
      ])
    } catch (err) {
      console.log(err)
    }
  }

  const updateShippingSurcharge = (res) => {
    let oversizeItemQty = 0

    res.lineItems.forEach((item) => {
      //check if oversize
      if (item.variant.weight && item.variant.weight > 0) {
        oversizeItemQty = oversizeItemQty + item.quantity
      }
    })

    /*
    first, find if there is already a surcharge item
    */
    const surchargeLineItem = res.lineItems.find(
      (item) =>
        item.variant.id ===
        "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjMxOTUzOTUzNjA2Nw=="
    )

    if (surchargeLineItem) {
      //already a surcharge item, so update or remove
      if (oversizeItemQty) {
        return client.checkout
          .updateLineItems(checkout.id, [
            { id: surchargeLineItem.id, quantity: oversizeItemQty },
          ])
          .then((response) => {
            setCheckout(response)
            setLoading(false)
          })
      } else {
        return client.checkout
          .removeLineItems(checkout.id, [surchargeLineItem.id])
          .then((response) => {
            setCheckout(response)
            setLoading(false)
          })
      }
    } else if (oversizeItemQty) {
      //not already a surcharge item in cart, so add one
      return client.checkout
        .addLineItems(checkout.id, [
          {
            variantId:
              "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MjMxOTUzOTUzNjA2Nw==",
            quantity: oversizeItemQty,
          },
        ])
        .then((response) => {
          setCheckout(response)
          setLoading(false)
        })
    }
  }

  const addVariantToCart = (variantId, quantity, product, variant) => {
    setLoading(true)

    const checkoutID = checkout.id

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ]

    return client.checkout
      .addLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        klaviyoTrackAddToCart(res, product, variant, quantity)
        setCheckout(res)
        setLoading(false)
        setDidJustAddToCart(true)
        updateShippingSurcharge(res)
        setTimeout(() => setDidJustAddToCart(false), 3000)
      })
  }

  const updateActiveCollection = (handle) => {
    setActiveCollection(handle)
  }

  const removeLineItem = (checkoutID, lineItemID) => {
    setLoading(true)

    return client.checkout
      .removeLineItems(checkoutID, [lineItemID])
      .then((res) => {
        updateShippingSurcharge(res)
        setCheckout(res)
        setLoading(false)
      })
  }

  const updateLineItem = (checkoutID, lineItemID, quantity) => {
    setLoading(true)

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        updateShippingSurcharge(res)
        setCheckout(res)
        setLoading(false)
      })
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        didJustAddToCart,
        updateActiveCollection,
        activeCollection,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
