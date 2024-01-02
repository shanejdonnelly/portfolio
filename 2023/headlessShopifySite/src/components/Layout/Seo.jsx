import * as React from "react"

export default function Seo({
  location,
  params,
  data,
  pageContext,
  title,
  children = null,
  metaDescription,
  ogType = "website",
  ogImage = "https://cdn.sanity.io/images/1w3k1nck/production/2bfcc58718d7168948b787b3c06c2f735a2b1726-1200x627.jpg",
}) {
  const defaultTitle = "Port & Bay"

  let description = metaDescription
    ? metaDescription
    : "Port & Bay specializes in ready-made window treatments like curtains, draperies, blinds, and shades, bed & bath, fabrics, and home furnishings and decor."
  if (pageContext && pageContext.metaDescription) {
    description = pageContext.metaDescription
  } else if (data && data.sanityPage && data.sanityPage.metaDescription) {
    description = data.sanityPage.metaDescription
  }

  return (
    <>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title ? `${title} · ${defaultTitle}` : defaultTitle}</title>
      <link
        rel="canonical"
        href={`https://www.portandbay.com${
          location && location.pathname ? location.pathname : ""
        }`}
      />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={ogType} />
      <meta
        property="og:title"
        content={title ? `${title} · ${defaultTitle}` : defaultTitle}
      />
      <meta property="og:description" content={description} />
      <meta
        property="og:url"
        content={`https://www.portandbay.com${
          location && location.pathname ? location.pathname : ""
        }`}
      />
      <meta property="og:site_name" content="Port &amp; Bay" />
      <meta
        name="twitter:url"
        content={`https://www.portandbay.com${
          location && location.pathname ? location.pathname : ""
        }`}
      />
      <meta property="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:title"
        content={title ? `${title} · ${defaultTitle}` : defaultTitle}
      />
      <meta
        name="google-site-verification"
        content="dd7nMJlGV9pxoJKYrW8AdSTzPFeS0eDufz_7W5KhLgc"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      {children}
    </>
  )
}
