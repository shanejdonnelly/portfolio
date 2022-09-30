const path = require(`path`)
const PRODUCTS_PER_PAGE = 20

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  //
  // BEGIN PRODUCT PAGES
  //

  // Query for all products in Shopify
  const result = await graphql(`
    query {
      allShopifyProduct(sort: { fields: [title] }) {
        edges {
          node {
            shopifyId
            handle
            title
            descriptionHtml
            productType
            storefrontId
            tags
            vendor
            priceRangeV2 {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images {
              altText
              id
              gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
              src
            }
            variants {
              availableForSale
              barcode
              image{
                gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
                originalSrc
              }
              storefrontId
              title
              price
              selectedOptions {
                name
                value
              }
              sku
            }
            options {
              name
              values
              id
            }

          }
        }
      }
    }
  `)
  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  result.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/shop/${node.handle}`,
      component: path.resolve(`./src/templates/product.js`),
      context: {
        product: node,
      },
    })
  })
  // END PRODUCT PAGES



  //
  // BEGIN COLLECTION PAGES
  //
  const collections = await graphql(`
  query {
    allShopifyCollection (sort: { fields: [title] }) {
      edges {
        node {
          id
          title
          handle
          description
          products {
            handle
            id
            images {
              altText
              gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
            }
            options{
              name
              values
            }
            priceRangeV2 {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
            productType
            tags
            title
            variants{
              image{
                gatsbyImageData(layout: CONSTRAINED, width: 100, aspectRatio: 1)
              }
              metafields{
                value
                key
              }
            }
            vendor
          }
        }
      }
    }
    allSanityMenu {
      nodes {
        title
        handle
        items {
          handle
          title
        }
      }
    }
  }
`)

  const parentCollections = ['curtains-drapes', 'blinds-shades', 'rods-hardware', 'bedding', 'bath', 'home-decor', 'fabrics', 'sale'];

  const findChildCollections = function (handle) {
    const thing = collections.data.allSanityMenu.nodes.find(node => node.handle === handle)
    return thing ? thing.items : []
  }
  const findParentCollectionPath = function (handle) {
    let parentPath = 'curtains-drapes';
    collections.data.allSanityMenu.nodes.forEach(node => {
      if (node.items.find(item => item.handle === handle)) {
        parentPath = node.handle
      }
    })
    return parentPath;
  }

  function chunkArray(array, size) {
    let result = []
    for (let i = 0; i < array.length; i += size) {
      let chunk = array.slice(i, i + size)
      result.push(chunk)
    }
    return result
  }

  collections.data.allShopifyCollection.edges.forEach(({ node }) => {
    const isParentCollection = parentCollections.includes(node.handle)
    const children = isParentCollection ? findChildCollections(node.handle) : []

    //break collection products into chunks 
    const chunkedProducts = chunkArray(node.products, PRODUCTS_PER_PAGE)

    const pathBits = isParentCollection ? node.handle : `${findParentCollectionPath(node.handle)}/${node.handle}`

    //use product chunks to create paginated collection pages
    chunkedProducts.forEach((products, index) => {
      createPage({
        path: index === 0 ? `/shop/${pathBits}` : `/shop/${pathBits}/${index + 1}`,
        component: path.resolve(`./src/templates/collection.js`),
        context: {
          sanityMenuData: collections.data.allSanityMenu,
          limit: PRODUCTS_PER_PAGE,
          skip: index * PRODUCTS_PER_PAGE,
          numPages: chunkedProducts.length,
          currentPage: index + 1,
          isParentCollection,
          children,
          collection: {
            title: node.title,
            description: node.description,
            handle: node.handle
          },
          products,
          allProducts: node.products
        }
      })
    })
  })
  // END COLLECTION PAGES


  //
  // BEGIN RESOURCE PAGES
  //
  const resources = await graphql(`
    {
      allSanityResource(
        filter: { slug: { current: { ne: null } } }
      ) {
          nodes {
            id
            mainImage {
              asset{
                altText,
                url
              }
            }
            title
            slug {
              current
            }
            _rawBody(resolveReferences: { maxDepth: 5 })
          }
        }
      }

  `);

  resources.data.allSanityResource.nodes.forEach(node => {
    createPage({
      path: `/resources/${node.slug.current}`,
      component: path.resolve(`./src/templates/resource.js`),
      context: {
        ...node
      },
    })
  })
  //END RESOURCE PAGES


  //
  // BEGIN BLOG PAGES
  //
  const blog = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } } }
      ) {
          nodes {
            id
            mainImage {
              asset{
                url
              }
            }
            mainImageAltText
            intro
            title
            slug {
              current
            }
            _rawBody(resolveReferences: { maxDepth: 5 })
            categories{
              slug{
                current
              }
              title
            }
            publishedAt(formatString: "MMM D, YYYY")
          }
        }
      }

  `);

  blog.data.allSanityPost.nodes.forEach(node => {
    createPage({
      path: `/news/${node.slug.current}`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        ...node
      },
    })
  })
  //END BLOG PAGES

}