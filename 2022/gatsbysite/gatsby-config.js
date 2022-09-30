require("dotenv").config()

module.exports = {
  siteMetadata: {
    siteTitle: "gatsby-starter-shopify",
    siteTitleDefault: "Curtains, Drapes, Blinds, Shades, Bed, Bath, Home Decor · Port & Bay",
    siteUrl: "https://portandbay.com",
    hrefLang: "en",
    siteDescription: "Port & Bay is an independent, family business specializing in ready-made window treatments, bed & bath products, textiles, fabrics, and home furnishings. We carry a large assortment of curtains, draperies, panels, shades, blinds, bedding, bath, and home decor.",
    siteImage: "/default-og-image.jpg",
    twitter: "@gatsbyjs",
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        query: `
          query {
            allShopifyCollection {
              nodes {
                title
                handle
                id
              }
            }
            allShopifyProduct {
              nodes {
                handle
                title
                tags
                id
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
                variants{
                  metafields{
                    value
                    key
                  }
                }
                images {
                  gatsbyImageData(layout: CONSTRAINED, width: 240, aspectRatio: 1)
                }
                collections {
                  handle
                  title
                }
              }
            }
          }
        
        `,
        ref: 'id',
        index: ['title'],
        store: ['handle', 'title', 'id', 'images', 'collections', 'options', 'priceRangeV2', 'variants', 'type'],
        normalizer: ({ data }) => {
          const collections = data.allShopifyCollection.nodes.map(node => ({
            handle: node.handle,
            title: node.title,
            id: node.title,
            images: null,
            collections: null,
            options: null,
            priceRangeV2: null,
            variants: null,
            type: 'collection'
          }));
          const products = data.allShopifyProduct.nodes.map(node => ({
            handle: node.handle,
            title: node.title,
            id: node.id,
            images: !!node.images.length && node.images[0]?.gatsbyImageData?.images?.fallback?.src ? node.images[0].gatsbyImageData.images.fallback.src : null,
            collections: node.collections,
            options: node.options,
            priceRangeV2: node.priceRangeV2,
            variants: node.variants,
            type: 'product'
          }))
          return [...collections, ...products]
        },
      }
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ["collections"],
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `1w3k1nck`,
        dataset: `production`,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: 'default',
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "275226039863262"
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-gatsby-cloud",
    // Add your Google Analytics ID to the .env file to enable
    // Otherwise, this plugin can be removed
    process.env.GOOGLE_ANALYTICS_ID && {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
  ].filter(Boolean),
}
