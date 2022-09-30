// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blogAuthor from './blogAuthor'
import blogCategory from './blogCategory'
import blogPost from './blogPost'
import faq from './faq'
import homepage from './homepage'
import megaNavContent from './megaNavContent'
import menu from './menu'
import page from './page'
import promoBar from './promoBar'
import resource from './resource'
import shipping from './shipping'

//non-document types 
import blockContent from './blockContent'
import button from './objects/button'
import buttonRow from './objects/buttonRow'
import categoryCard from './objects/categoryCard'
import hero from './objects/hero'
import imageLink from './objects/imageLink'
import learnMoreCard from './objects/learnMoreCard'
import link from './objects/link'
import pageBlock from './objects/pageBlock'
import productCard from './objects/productCard'
import homepageFeaturedCategory from './objects/homepageFeaturedCategory'
import homepageFeaturedProducts from './objects/homepageFeaturedProducts'
import homepagePopularCategories from './objects/homepagePopularCategories'
import homepageLearnMore from './objects/homepageLearnMore'
import menuItem from './objects/menuItem'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    blogPost,
    faq,
    homepage,
    megaNavContent,
    menu,
    page,
    promoBar,
    resource,
    shipping,
    //objects below not visible in Sanity Studio
    blockContent,
    blogAuthor,
    blogCategory,
    button,
    buttonRow,
    categoryCard,
    hero,
    homepageFeaturedCategory,
    homepageFeaturedProducts,
    homepageLearnMore,
    homepagePopularCategories,
    imageLink,
    learnMoreCard,
    link,
    menuItem,
    pageBlock,
    productCard,
  ]),
})
