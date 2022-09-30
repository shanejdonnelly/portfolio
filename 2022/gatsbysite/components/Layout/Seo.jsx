import * as React from "react"

export default function Seo({
  location,
  params,
  data,
  pageContext,
  title,
  children = null,
}) {
  const defaultTitle = "Port & Bay"
  return (
    <>
      <meta
        name="description"
        content="Port &amp; Bay specializes in ready-made window treatments like curtains, draperies, blinds, and shades, bed &amp; bath, fabrics, and home furnishings and decor."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title ? `${title} · ${defaultTitle}` : defaultTitle}</title>
      <link rel="canonical" href="https://www.portandbay.com/" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Curtains, Drapes, Blinds, Shades, Bed, Bath, Home Decor &middot; Port &amp; Bay"
      />
      <meta
        property="og:description"
        content="Port &amp; Bay specializes in ready-made window treatments like curtains, draperies, blinds, and shades, bed &amp; bath, fabrics, and home furnishings and decor."
      />
      <meta property="og:url" content="https://www.portandbay.com/" />
      <meta property="og:site_name" content="Port &amp; Bay" />
      <meta name="twitter:url" content="https://www.portandbay.com" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content="Port &amp; Bay specializes in ready-made window treatments like curtains, draperies, blinds, and shades, bed &amp; bath, fabrics, and home furnishings and decor."
      />
      <meta
        name="twitter:title"
        content="Curtains, Drapes, Blinds, Shades, Bed, Bath, Home Decor &middot; Port &amp; Bay"
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
