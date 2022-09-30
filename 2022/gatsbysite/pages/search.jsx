import * as React from "react"
import { useFlexSearch } from "react-use-flexsearch"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import SearchPage from "../components/Search/SearchPage"
import { Center, Container, Spinner } from "@chakra-ui/react"

export default function Search({ location }) {
  const [loading, setLoading] = React.useState(true)
  const searchParams = new URLSearchParams(location.search)
  const searchTerm = searchParams.get("q")

  const queryData = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `)

  const results = useFlexSearch(
    searchTerm,
    queryData.localSearchPages?.index,
    queryData.localSearchPages?.store
  )

  React.useEffect(() => {
    if (results && !!results.length) {
      setLoading(false)
    }
  }, [results])

  const collectionResults = results.filter((r) => r.type === "collection")
  const productResults = results.filter((r) => r.type === "product")
  const collectionSuggestions = productResults.map((r) => r.collections)

  return (
    <Layout>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Center mt={12}>
            <Spinner size="lg" />
          </Center>
        ) : (
          <SearchPage products={productResults} searchTerm={searchTerm} />
        )}
      </Container>
    </Layout>
  )
}
export const Head = ({ location, params, data, pageContext }) => (
  <Seo
    title="Search Results"
    location={location}
    params={params}
    pageContext={pageContext}
    data={data}
  />
)
