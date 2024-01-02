import React from "react"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import Product from "../components/Product/Product"
const ProductTemplate = ({ pageContext, location }) => {
  const { product } = pageContext
  const { completeTheLookData } = pageContext

  return (
    <Layout>
      <span
        className="junip-store-key"
        data-store-key="SPXrmk1pKGfecehWR97ghDdE"
      ></span>
      <Product completeTheLookData={completeTheLookData} product={product} location={location} pageContext={pageContext} />
    </Layout>
  )
}
export default ProductTemplate

export const Head = ({ location, params, data, pageContext }) => {
  let ogImage = null
  if (pageContext.product && pageContext.product.images && !!pageContext.product.images.length) {
    ogImage = pageContext.product.images[0].src
  }
  return (
    <Seo
      title={pageContext?.product?.title || null}
      location={location}
      params={params}
      pageContext={pageContext}
      data={data}
      metaDescription={pageContext?.product?.description || null}
      ogImage={ogImage}
    />
  )

}
