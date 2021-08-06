import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import fetch from 'node-fetch'

const bigcommerce_httpLink = createHttpLink({
	uri: 'https://store-be9dgfuyma.mybigcommerce.com/graphql',
	fetch,
});

const bigcommerce_authLink = setContext((_, { headers }) => {
  const token = TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const bigcommerceLink = bigcommerce_authLink.concat(bigcommerce_httpLink);



const graphcms_httpLink = createHttpLink({
  uri: 'https://api-us-east-1.graphcms.com/v2/',
	fetch,
});

const graphcms_authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
    }
  }
});

const graphcmsLink = graphcms_authLink.concat(graphcms_httpLink);

const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === 'bigcommerce',
    bigcommerceLink,
    graphcmsLink
  ),
  cache: new InMemoryCache()
});

export default client;
