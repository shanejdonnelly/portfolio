import * as React from "react"
import { useFlexSearch } from "react-use-flexsearch"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import SearchPage from "../components/Search/SearchPage"
import { Center, Container, Spinner } from "@chakra-ui/react"
import EmptyState from "../components/EmptyState"

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
    } else {
      setLoading(false)
    }
  }, [results])

  const productResults = results.filter((r) => r.type === "product")
  /*
  below could be added to the search page too, but not currently used
  */
  //const collectionResults = results.filter((r) => r.type === "collection")
  //const collectionSuggestions = productResults.map((r) => r.collections)

  return loading ? (
    <Layout>
      <Container maxW={"container.xl"}>
        <Center mt={12}>
          <Spinner size="lg" />
        </Center>
      </Container>
    </Layout>
  ) : (
    <Layout>
      <Container maxW={"container.xl"}>
        {results && !!results.length ? (
          <SearchPage products={productResults} searchTerm={searchTerm} />
        ) : (
          <Center mt={12}>
            <EmptyState
              text={`Dang! No results for "${searchTerm}"`}
              subText="Please try another search term or shop curtains and drapes."
              link="/collections/curtains-drapes"
              linkText="Shop Now"
            />
          </Center>
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
