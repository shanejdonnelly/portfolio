import React from "react"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import Product from "../components/Product/Product"
const ProductTemplate = ({ pageContext, location }) => {
  const { product } = pageContext
  return (
    <Layout>
      <span
        className="junip-store-key"
        data-store-key="SPXrmk1pKGfecehWR97ghDdE"
      ></span>
      <Product product={product} location={location} />
    </Layout>
  )
}
export default ProductTemplate

export const Head = ({ location, params, data, pageContext }) => {
  return (
    <Seo
      title={pageContext?.product?.title || null}
      location={location}
      params={params}
      pageContext={pageContext}
      data={data}
    />
  )

}
